import mongoose from "mongoose";

const DISABLED_NOTIFICATIONS = false;

let isConnected: boolean = false;

export async function connectToDatabase() {
  if (!process.env.DB_URL) {
    if (!DISABLED_NOTIFICATIONS) return console.log("URL не найден.");
  }
  if (isConnected) {
    if (DISABLED_NOTIFICATIONS) return;
    return console.log("🚀 Соединение с БД уже установлено.");
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(`${process.env.DB_URL}`, {
      dbName: "Vendetta",
    });

    isConnected = true;

    if (!DISABLED_NOTIFICATIONS)
      return console.log("🚀 Соединение с БД установлено.");
  } catch (e) {
    console.log(e, "Ошибка - Проблемы с подключением к БД - Фул Инфо:", e);
  }
}
