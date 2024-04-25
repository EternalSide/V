import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
	if (!process.env.DB_URL) return console.log("URL не найден.");

	if (isConnected) return;

	mongoose.set("strictQuery", true);

	try {
		await mongoose.connect(`${process.env.DB_URL}`, {
			dbName: "blog",
		});

		isConnected = true;
	} catch (e) {
		console.log(e, "Проблемы с подключением к БД", e);
	}
}
