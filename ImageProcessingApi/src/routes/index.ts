import express, { Request, Response } from 'express';
import routeimg from './routeimg';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('routes.index');
});
router.use('/images', routeimg);

export default router;
