import {Schema, models, model, Document} from "mongoose";

export interface IPost extends Document {
	title: string;
	text: string;
	banner: string;
	views: number;
	createdAt: Date;
	tags: Schema.Types.ObjectId[];
	upvotes: Schema.Types.ObjectId[];
	downvotes: Schema.Types.ObjectId[];
	author: Schema.Types.ObjectId;
	comments: Schema.Types.ObjectId[];
}

const PostSchema = new Schema<IPost>(
	{
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		banner: {
			type: String,
		},
		tags: [
			{
				type: Schema.Types.ObjectId,
				ref: "Tag",
			},
		],
		views: {
			type: Number,
			default: 0,
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
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		versionKey: false,
	}
);

const Post = models?.Post || model<IPost>("Post", PostSchema);

export default Post;
