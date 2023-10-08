import { Schema, models, model, Document, InferSchemaType } from "mongoose";

interface documentId {
  _id: Schema.Types.ObjectId;
}

export interface ITag extends Document {
  name: string;
  posts: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const TagSchema = new Schema<ITag>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;

export type Tagtest = InferSchemaType<typeof TagSchema>;
