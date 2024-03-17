import { NextFunction, Request, Response } from "express";
import { getImage, uploadImage } from "../lib/cloudinary.js";
import {
  getItemType,
  getUser,
  setItemTypeImage,
  setUserImage,
} from "../lib/db.js";
import { user } from "@prisma/client";
import cloudinary from "cloudinary";

export async function getUserImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

export async function getItemTypeImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

export async function uploadUserImageHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.file) {
    try {
      const image = (await uploadImage(
        req.file
      )) as cloudinary.UploadApiResponse;
      const user = req.user as user;
      await setUserImage(user.id, image.public_id);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Error uploading image" });
    }
  }
  res.status(200).json({ message: "Image uploaded" });
}

export async function uploadItemTypeImageHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.itemTypeId;
  if (req.file) {
    try {
      const image = (await uploadImage(
        req.file
      )) as cloudinary.UploadApiResponse;
      await setItemTypeImage(id, image.public_id);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Error uploading image" });
    }
  }
  res.status(200).json({ message: "Image uploaded" });
}
