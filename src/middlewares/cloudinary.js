import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.v2.config({
  cloud_name: 'dhiif8dib',
  api_key: '972676375214881',
  api_secret: 'ZuXVc3BA4KsM75SBC6zsf8Bcj18'
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'ConfiApp'
  }
});