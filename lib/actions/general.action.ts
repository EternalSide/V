import User from "@/database/models/user.model";
import { connectToDatabase } from "../mongoose";

export async function ViewAllNotifications(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    for (const item of user.notifications) {
      item.seen = "seen";
      await user.save();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
