import mongoose from "mongoose";

let isConnected: boolean = false;

export async function connectToDatabase() {
  if (!process.env.DB_URL) return console.log("URL не найден.");

  if (isConnected) return;

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(`${process.env.DB_URL}`, {
      dbName: "Vendetta",
    });

    isConnected = true;
  } catch (e) {
    console.log(e, "Ошибка - Проблемы с подключением к БД - Фул Инфо:", e);
  }
}
