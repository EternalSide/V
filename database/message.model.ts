import { Schema, models, model, Document } from "mongoose";

export interface IMessage extends Document {
  text: string;
  author: Schema.Types.ObjectId;
  tag: Schema.Types.ObjectId;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tag: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
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

const Message = models.Message || model<IMessage>("Message", MessageSchema);

export default Message;
