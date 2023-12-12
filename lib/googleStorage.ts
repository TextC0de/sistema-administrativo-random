import { type Bucket, Storage } from '@google-cloud/storage';
import type internal from 'stream';

const getBucket = (): Bucket => {
    const storage = new Storage({
        projectId: process.env.STORAGE_ID,
        keyFilename: process.env.KEY_PATH,
        /* credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    }, */
    });
    return storage.bucket(process.env.BUCKET ?? '');
};

export const deleteImage = async (filename: string): Promise<void> => {
    const bucket = getBucket();
    const blob = bucket.file(filename);
    const response = await blob.delete();
    console.log('intento borrar la imagen');
    console.log(response);
};

export const uploadImage = async (
    filename: string,
): Promise<{ blobStream: internal.Writable }> => {
    const bucket = getBucket();
    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream();
    return { blobStream };
};
