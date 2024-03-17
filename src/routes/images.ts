import { NextFunction, Request, Response } from "express";
import { getImage, uploadImage } from "../lib/cloudinary";
import { getItemType, getUser } from "../lib/db";
import { user } from "@prisma/client";

export async function getUserImage(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  if (!id) {
    return next(new Error("Bad Request:Missing required fields, id"));
  }
  const user = req.user as user;

  if (!user) {
    return next(new Error("No user found"));
  }

  if (!user.imageId) {
    return next(new Error("No image found"));
  }

  const image = getImage(user.imageId);
  res.json(image);
}

export async function getItemTypeImage(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  if (!id) {
    return next(new Error("Bad Request:Missing required fields, id"));
  }
  const itemType = await getItemType(id);

  if (!itemType) {
    return next(new Error("No item type found"));
  }
  if (!itemType.imageId) {
    return next(new Error("No image found"));
  }

  const image = await getImage(itemType.imageId);
  res.json(image);
}

export async function uploadImageHandler(req: Request, res: Response, next: NextFunction) {
  if (req.file) {
    try {
      uploadImage(req.file);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Error uploading image' });
    }
  }
  res.status(200).json({ message: 'Image uploaded' });
}