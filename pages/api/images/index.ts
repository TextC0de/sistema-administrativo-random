import baseHandler from "../../../handlers/baseHandler";
import { postImage } from "../../../controllers/ImageController";
import { upload } from '../../../middleware/multer'


baseHandler.use(upload.array('image'));

baseHandler.post(postImage);

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default baseHandler;




