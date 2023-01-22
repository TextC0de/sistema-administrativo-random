import baseHandler from 'backend/handlers/baseHandler';
import ImageController from 'backend/controllers/ImageController';
import { upload } from 'backend/middleware/multer'


baseHandler.use(upload.array('image'));

baseHandler.post(ImageController.postImage);

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default baseHandler;




