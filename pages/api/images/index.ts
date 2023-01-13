import baseHandler from 'backend/handlers/baseHandler';
import { postImage } from 'backend/controllers/ImageController';
import { upload } from 'backend/middleware/multer'


baseHandler.use(upload.array('image'));

baseHandler.post(postImage);

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default baseHandler;




