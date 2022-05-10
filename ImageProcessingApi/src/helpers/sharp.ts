//sharp compress the image fastly

import sharp from 'sharp';

const image_size = async (
  height: number,
  width: number,
  resizedPath: string,
  actualPath: string,
): Promise<sharp.OutputInfo> => {
  const set = await sharp(actualPath).resize(width, height).toFile(resizedPath);
  return set;
};
export default image_size;
