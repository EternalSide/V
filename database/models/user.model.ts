import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
  password?: string;
  role?: string;
  location?: string;
  bio?: string;
  portfolioWebsite?: string;
  reputation?: number;
  notifications: {
    event: string;
    text: string;
    postId: string;
    user: Schema.Types.ObjectId;
    createdAt: Date;
  };
  posts: Schema.Types.ObjectId[];
  savedPosts: Schema.Types.ObjectId[];
  followingTags: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    bio: { type: String },
    picture: { type: String, required: true },
    location: { type: String },
    portfolioWebsite: { type: String },
    reputation: { type: Number, default: 0 },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    savedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    followingTags: [{ type: Schema.Types.ObjectId, ref: "Tag", default: [] }],
    joinedAt: { type: Date, default: Date.now },
    role: { type: String, default: "user" },
    notifications: [
      {
        event: {
          type: String,
          required: true,
        },
        text: {
          type: String,
        },
        seen: {
          type: String,
          required: true,
          default: "not_seen",
        },
        postId: {
          type: Schema.Types.ObjectId,
          ref: "Post",
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    versionKey: false,
  },
);

const User = models.User || model("User", UserSchema);

export default User;
