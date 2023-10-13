import { Schema, models, model, Document } from "mongoose";

export interface IComment extends Document {
  text: string;
  author: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    text: {
      type: String,
      required: true,
    },
    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    downvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
