"use server";

import Tag from "@/database/models/tag.model";
import { connectToDatabase } from "../mongoose";

export const getPopularTags = async () => {
  try {
    connectToDatabase();

    const tags = await Tag.find({}).limit(3);

    return tags;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getAllTags = async () => {
  try {
    connectToDatabase();

    const tags = await Tag.find({}).limit(16);

    return tags;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
