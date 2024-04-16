import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export function uploadImage(file: Express.Multer.File) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file.path, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

export function getImage(imageId: string) {
  return cloudinary.v2.url(imageId);
}