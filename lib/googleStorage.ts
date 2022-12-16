import {Storage} from '@google-cloud/storage'




export const deleteImage = async(filename:string) =>{
    const storage = new Storage({
        projectId: process.env.STORAGE_ID,
        keyFilename: process.env.KEY_PATH
        /* credentials: {
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.PRIVATE_KEY,
        }, */
     })
    
      //const imageName = encodeURIComponent(file.originalname)      
    const bucket = storage.bucket(process.env.BUCKET || '')
    const blob = bucket.file(filename);
    const response = await blob.delete()
    console.log('intento borrar la imagen')
    console.log(response);
}

export const uploadImage = async(filename:string) =>{
    const storage = new Storage({
        projectId: process.env.STORAGE_ID,
        keyFilename: process.env.KEY_PATH
        /* credentials: {
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.PRIVATE_KEY,
        }, */
      })
    
      //const imageName = encodeURIComponent(file.originalname)      
      const bucket = storage.bucket(process.env.BUCKET || '')
      const blob = bucket.file(filename);
      const blobStream = blob.createWriteStream()
      return {blobStream}
}

