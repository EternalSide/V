"use server";
import User from "@/database/models/user.model";
import {connectToDatabase} from "../mongoose";
import Post from "@/database/models/post.model";
import Tag from "@/database/models/tag.model";

interface ViewAllNotificationsParams {
	userId: string;
}

interface SearchInDatabaseParams {
	query: string;
}

export async function ViewAllNotifications(data: ViewAllNotificationsParams) {
	try {
		connectToDatabase();

		const {userId} = data;

		const user = await User.findOne({clerkId: userId});

		// for of работает с await
		for (const item of user.notifications) {
			item.seen = "seen";
			await user.save();
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export async function SearchInDatabase(data: SearchInDatabaseParams) {
	try {
		await connectToDatabase();

		const {query} = data;

		const regexQuery = {$regex: query, $options: "i"};

		let results = [];

		const modelAndTypes = [
			{
				model: Post,
				searchField: "title",
				type: "post",
				translate: "Пост",
			},
			{
				model: User,
				searchField: "username",
				type: "user",
				translate: "Пользователь",
			},
			{
				model: Tag,
				searchField: "name",
				type: "tag",
				translate: "Тег",
			},
		];

		const generateLink = (fieldName: string, item: any) => {
			switch (fieldName) {
				case "user":
					return `/${item.username}`;

				case "post":
					return `/post/${item._id.toString()}`;

				case "tag":
					return `/tags/${item.name}`;

				default:
					return null;
			}
		};

		for (const {model, searchField, type} of modelAndTypes) {
			const queryResults = await model.find({[searchField]: regexQuery}).limit(2);

			results.push(
				...queryResults.map((item: any) => ({
					title: item[searchField],
					href: generateLink(type, item),
				}))
			);
		}

		return JSON.stringify(results);
	} catch (e) {
		console.log(e);
	}
}
