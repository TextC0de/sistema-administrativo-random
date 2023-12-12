import nc from 'next-connect';

import { onError, onNoMatch } from 'backend/controllers/NextConnectController';

import uploadImage from '../middleware/multer';

const singleImageHandler = nc({ onError, onNoMatch });
singleImageHandler.use(uploadImage.single('image'));

export default singleImageHandler;
