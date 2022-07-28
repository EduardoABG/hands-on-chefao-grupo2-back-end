import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { v4 as uuid } from 'uuid';

const uploader = async function(imagePath: string) {

  const uploadResult = await cloudinary.uploader.upload(imagePath,
    { public_id: uuid() });

  fs.unlink(imagePath, (err) => { return; });

  return uploadResult as UploadApiResponse;
}

export default uploader;
