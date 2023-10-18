import User from "@/database/models/user.model";
import { connectToDatabase } from "../mongoose";

interface ViewAllNotificationsParams {
  userId: string;
}

export async function ViewAllNotifications(data: ViewAllNotificationsParams) {
  try {
    connectToDatabase();

    const { userId } = data;

    const user = await User.findOne({ clerkId: userId });

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
