import type { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect'
import multer from "multer";
import { ApiResponse } from '../../../models/interfaces';
import {Storage} from '@google-cloud/storage'
import {format} from 'util'
import Image from '../../../models/Image'
import { uploadImage } from "../../../lib/googleStorage";
/* export const config = {
    api: {
        bodyParser: false,
    },
}; */

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}
type ResponseData = ApiResponse<string[], string>;


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // No larger than 5mb, change as you need
    },
  });

const apiRoute = nc({
  onError(error, req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {    
    res.status(501).json({ error: `Sorry something Happened! ${error}` });
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('image'));

apiRoute.post(async (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
 /*  const filenames = fs.readdirSync(outputFolderName);
  const images = filenames.map((name) => name);
 */ 
  const file = req.files[0]
  const newImage = {name:file.originalname, url:`https://storage.cloud.google.com/random-images-bucket/${file.originalname}?authuser=2`}
  const image = await Image.create(newImage)
  const {blobStream} = await uploadImage(file.originalname)

  blobStream.on("error", (err) => {
    res.status(500).json({error:(err as unknown) as string  });
  });
  blobStream.end(file.buffer)
    
    //uploadToGCS(req, res)


  res.status(200).json({ data: [image._id]});
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
export default apiRoute;


/* let uploadFile = memStorage.single('file')
handler.use(uploadFile)
handler.post(async (req, res) => {
    console.log('decime que te llegó algo');
    console.log("req.file", req.file);
    console.log("req.body", req.body);
    let filename = req.file.filename;
    res.status(200).send({message:`file ${filename} received`});
});
  
export default handler; */
/* export default async (req:NextApiRequest, res:NextApiResponse) =>{
    

} */


 /*   console.log('in api/upload endpoint')
    const form = formidableServerless()
    const form = new formidable.IncomingForm();
    console.log(form);
    const {files} = await parseForm(form, req)
    console.log(files)
    
   
    form.parse(req, (err, fields, files) => {
       console.log(err, fields, files);
    }); 
    console.log('parsed form')
    res.status(200).json({message:'responding'}) */

/* export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
        if (req.method !== "POST") {
            res.status(400).send(`Invalid method: ${req.method}`);
            return;
        }
        console.log('reached endpoint')
        method1(req, res);
    }
    
    console.log(req)
    res.status(200).send('server responded')
    */

