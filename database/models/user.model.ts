import {Schema, models, model, Document} from "mongoose";

export interface IUser extends Document {
	clerkId: string;
	name: string;
	username: string;
	email: string;
	picture: string;
	password?: string;
	role?: string;
	location?: string;
	about?: string;
	bio?: string;
	portfolioWebsite?: string;
	userPinned?: Schema.Types.ObjectId;
	reputation?: number;
	notifications: {
		event: string;
		text: string;
		postId: string;
		user: Schema.Types.ObjectId;
		createdAt: Date;
	};
	settings: {
		notification_like: boolean;
		notification_comment: boolean;
	};
	theme_color: string;
	posts: Schema.Types.ObjectId[];
	savedPosts: Schema.Types.ObjectId[];
	followingTags: Schema.Types.ObjectId[];
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
		reputation: {type: Number, default: 0},
		posts: [{type: Schema.Types.ObjectId, ref: "Post"}],
		savedPosts: [{type: Schema.Types.ObjectId, ref: "Post"}],
		userPinned: {type: Schema.Types.ObjectId, ref: "Post"},
		followingTags: [{type: Schema.Types.ObjectId, ref: "Tag", default: []}],
		joinedAt: {type: Date, default: Date.now},
		role: {type: String, default: "user"},
		theme_color: {type: String, default: "ingido"},
		settings: {
			notification_like: {
				type: Boolean,
				default: true,
			},

			notification_comment: {
				type: Boolean,
				default: true,
			},
		},
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
	}
);

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
