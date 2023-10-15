import { Schema, models, model, Document } from "mongoose";

/* Модель interaction записывает совершенные 
пользователем действия (action) в БД
для системы рекомендаций
*/
interface IInteraction extends Document {
  action: string;
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  answer: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  createdOn: Date;
}

const InteractionSchema = new Schema<IInteraction>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    answer: { type: Schema.Types.ObjectId, ref: "Answer" },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    createdOn: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);

const Interaction =
  models.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
