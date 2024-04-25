import {Schema, models, model, Document} from "mongoose";

export interface IUser extends Document {
	clerkId: string;
	name: string;
	username: string;
	email: string;
	picture: string;
	password?: string;
	location?: string;
	about?: string;
	bio?: string;
	portfolioWebsite?: string;
	posts: Schema.Types.ObjectId[];
	savedPosts: Schema.Types.ObjectId[];
	joinedAt: Date;
}

const UserSchema = new Schema<IUser>(
	{
		clerkId: {type: String, required: true},
		name: {type: String, required: true},
		username: {type: String, required: true, unique: true},
		email: {type: String, required: true, unique: true},
		password: {type: String},
		bio: {type: String},
		about: {type: String},
		picture: {type: String, required: true},
		location: {type: String},
		portfolioWebsite: {type: String},
		posts: [{type: Schema.Types.ObjectId, ref: "Post"}],
		savedPosts: [{type: Schema.Types.ObjectId, ref: "Post"}],
		joinedAt: {type: Date, default: Date.now},
	},
	{
		versionKey: false,
	}
);

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
