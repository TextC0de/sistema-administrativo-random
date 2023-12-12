import ImageController from 'backend/controllers/ImageController';
import singleImageHandler from 'backend/handlers/singleImageHandler';

singleImageHandler.post(ImageController.postImage);

export default singleImageHandler;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
