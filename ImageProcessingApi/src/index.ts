import express, { Request, Response } from 'express';
import router from './routes/index';

const app = express();
const port = 3000;  //Server port

app.use('/api', router);

app.get('/', (req: Request, res: Response): void => {
  res.status(200).send(`Server is Running on localhost port: ${port}`);
});

//listening 
app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});

export default app;
