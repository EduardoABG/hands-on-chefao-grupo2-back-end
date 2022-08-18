import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ENV from "../infra/config/env";
import { v4 as uuid } from 'uuid';

export default  class UploadService {
  private cloudName: string = ENV.CLOUDINARY_CLOUD_NAME;
  private apiKey: string = ENV.CLOUDINARY_API_KEY;
  private apiSecret: string = ENV.CLOUDINARY_API_SECRET;

  constructor() {
    this.config();
  }

  config() {
    cloudinary.config({
      cloud_name: this.cloudName,
      api_key: this.apiKey,
      api_secret: this.apiSecret,
    })
  }


  async send(imagePath: string) {

    const uploadResult = await cloudinary.uploader.upload(imagePath,
      { public_id: uuid() });

    fs.unlink(imagePath, (err) => { return; });

    return uploadResult as UploadApiResponse;
  }
}
