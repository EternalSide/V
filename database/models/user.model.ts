import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  role?: string;
  picture: string;
  joinedAt: Date;
  location?: string;
  bio?: string;
  portfolioWebsite?: string;
  reputation?: number;
  posts: Schema.Types.ObjectId[];
  savedPosts: Schema.Types.ObjectId[];
  followingTags: Schema.Types.ObjectId[];
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
  },
  {
    versionKey: false,
  },
);

const User = models.User || model("User", UserSchema);

export default User;
