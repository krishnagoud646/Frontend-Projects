import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import image_size from '../helpers/sharp';

const img = express.Router();

img.get('/', async (req: Request, res: Response): Promise<void> => {
  const fileName = req.query.filename as unknown as string;
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  // Original path containing images/originalImages
  const originalPath = `${path.resolve(
    __dirname,
    `./../../images/originalImages/${fileName}.jpg`,
  )}`;

  // resized images containing images/resizedImages
  const resizedPath = `${path.resolve(
    __dirname,
    `./../../images/resizedImages/${fileName}-${width}x${height}.jpg`,
  )}`;

  //It check if the requested image already exist
  if (fs.existsSync(resizedPath)) {
    res.sendFile(resizedPath);
  } else if (!fileName || !width || !height) {
    res
      .status(400)
      .send(
        `<h1>The URL should look like http://localhost:3000/api/images?filename= <u>Your file name</u>&width=<u>200</u>&height=<u>200</u></h1> `,
      );
    return;
  } else if (width != 0 && height != 0) {
    const size = image_size(width, height, resizedPath, originalPath);
    size
      .then(() => {
        res.status(200).sendFile(resizedPath);
      })
      .catch(() => {
        res.status(404).send(`
        <h1>No Image was Found</h1>
        <h3>Your File Name Should be : encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica </h3>
        <h4>URL should be look like : http://localhost:3000/api/images?filename= <u>Your file name</u>&width=<u>200</u>&height=<u>200</u></h4>
        `);
      });
  }
});
export default img;
