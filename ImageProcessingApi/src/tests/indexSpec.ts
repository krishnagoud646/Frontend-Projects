import supertest from 'supertest';
import app from '../index';
const request = supertest(app);
import path from 'path';
import image_size from '../helpers/sharp';

//Path of the actual images Directory
const originalPath = `${path.resolve(
  __dirname,
  `./../../images/originalImages/encenadaport.jpg`,
)}`;

//Path of the resized images Directory
const resizedPath = `${path.resolve(
  __dirname,
  `./../../images/resizedImages/encenadaport.jpg`,
)}`;

describe('For resized image', (): void => {
  it('it rejects if promise goes wrong ', async (): Promise<void> => {
    await expectAsync(
      image_size(100, 100, originalPath, resizedPath),
    ).toBeRejected();
  });
});

describe('get request /api/images', () => {
  it('response with 400 without parameters', async (): Promise<void> => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
  });
  it('After showing image it will give 200 status', async () => {
    request.get('/api/images?filname=fjord&width=200&height=200').expect(200);
  });
  it('it will return No such image available', async () => {
    request.get('/api/images?filname=test&width=200&height=200').expect(404);
  });
});
describe('it describes the get request to be true', () => {
  it('it will respond true with status 200', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
