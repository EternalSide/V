"use server";

import User from "@/database/models/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreatePostParams,
  DeletePostParams,
  EditPostParams,
  GetAllPostsParams,
  GetPostByIdParams,
  setLikeParams,
} from "./shared";
import Post from "@/database/models/post.model";
import { revalidatePath } from "next/cache";
import Tag from "@/database/models/tag.model";
import Comment from "@/database/models/comment.model";
import Interaction from "@/database/models/interaction.model";
import { FilterQuery } from "mongoose";

export const createPost = async (params: CreatePostParams) => {
  try {
    connectToDatabase();

    const { author, path, tags, text, title, banner } = params;

    const newPost = await Post.create({
      title,
      text,
      author,
      banner,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInsert: { name: tag, author },
          $push: { posts: newPost._id },
        },
        { upsert: true, new: true },
      );

      tagDocuments.push(existingTag._id);
    }

    const id = newPost._id.toString();

    await Post.findByIdAndUpdate(id, {
      $push: { tags: { $each: tagDocuments } },
    });

    await User.findByIdAndUpdate(author, { $push: { posts: id } });

    revalidatePath(path);
    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPostById = async (params: GetPostByIdParams) => {
  try {
    connectToDatabase();

    const { id } = params;

    const post = await Post.findById(id)
      .populate({ path: "author", model: User })
      .populate({ path: "tags", model: Tag, select: "_id name" });

    return post;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getAllPosts = async (params: GetAllPostsParams) => {
  try {
    connectToDatabase();
    const { searchValue } = params;

    let sortOptions = {};

    switch (searchValue) {
      case "new":
        sortOptions = { createdAt: -1 };
        break;

      case "popular":
        sortOptions = { upvotes: -1, views: -1 };
        break;

      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const posts = await Post.find({})
      .populate("author")
      .populate({ path: "tags", model: Tag, select: "name _id" })
      .sort(sortOptions)
      .limit(25);

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPopularPosts = async () => {
  try {
    connectToDatabase();

    // Минимальные критерии для попадания в топ
    // let minimalCriterias = [
    //   { views: { $gte: 1000 } }, // Минимум 1000 просмотров
    //   { upvotes: { $gte: 100 } }, // Минимум 100 голосов "вверх"
    // ];

    const posts = await Post.aggregate([
      {
        $match: {
          createdAt: {
            // @ts-ignore
            $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000), // Выбираем документы, созданные в последние две недели
          },
          // $or: minimalCriterias,
        },
      },
      {
        $project: {
          title: true,
          numberOfComments: {
            $size: "$comments",
          },
          views: "$views",
          upvotes: "$upvotes",
        },
      },
      {
        $sort: {
          numberOfComments: -1,
          views: -1,
          upvotes: -1,
        },
      },
      { $limit: 4 },
    ]);

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function deletePost(params: DeletePostParams) {
  try {
    connectToDatabase();
    const { postId, path, authorId } = params;

    await Post.findByIdAndDelete(postId);
    await Tag.updateMany({ posts: postId }, { $pull: { posts: postId } });
    await User.findByIdAndUpdate(
      authorId,
      { $pull: { posts: postId } },
      { new: true },
    );
    await Comment.deleteMany({ post: postId });

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function editPost(params: EditPostParams) {
  try {
    connectToDatabase();

    const { postId, title, text, path, banner } = params;

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Пост не найден.");
    }

    post.title = title;
    post.text = text;
    post.banner = banner;

    await post.save();

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function setLike(params: setLikeParams) {
  try {
    connectToDatabase();
    const { postId, userId, path, hasUpVoted } = params;

    let updateQuery = {};

    if (hasUpVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const post = await Post.findByIdAndUpdate(postId, updateQuery, {
      new: true,
    });

    if (!post) {
      throw new Error("Пост не найден.");
    }

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getRecommendedPosts(params: { userId?: string }) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    let recommendedPosts;

    if (!user) {
      recommendedPosts = await Post.find({})
        .populate("author")
        .populate({ path: "tags", model: Tag, select: "name _id" })
        .sort({ createdAt: -1, upvotes: -1, views: -1 });

      return recommendedPosts;
    } else {
      const userInteractions = await Interaction.find({ user: user._id })
        .populate("tags")
        .exec();

      const userTags = userInteractions.reduce((tags, interaction) => {
        if (interaction.tags) {
          tags = tags.concat(interaction.tags);
        }
        return tags;
      }, []);

      // Теги, к которым пользователь заходил.
      const distinctUserTagIds = [
        // @ts-ignore
        ...new Set(userTags.map((item) => item._id)),
      ];

      const query: FilterQuery<typeof Post> = {
        $and: [{ tags: { $in: distinctUserTagIds } }],
      };

      recommendedPosts = await Post.find(query)
        .populate("author")
        .populate({ path: "tags", model: Tag, select: "name _id" });

      return recommendedPosts;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}
