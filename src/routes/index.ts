import { Application } from 'express';
import { healthRoutes } from '@gateway/routes/health.route';
import { authRoutes } from '@gateway/routes/auth.route';
import { searchRoutes } from '@gateway/routes/search';
import { authMiddleware } from '@gateway/services/auth-middleware';
import { currentUserRoutes } from '@gateway/routes/current-user';
import { buyerRoutes } from '@gateway/routes/buyer';
import { gigRoutes } from '@gateway/routes/gig';
import { messageRoutes } from '@gateway/routes/message';
import { orderRoutes } from '@gateway/routes/order';
import { reviewRoutes } from '@gateway/routes/review';
import { sellerRoutes } from '@gateway/routes/seller';

const BASE_PATH = '/api/gateway/v1';

export const appRoutes = (app: Application) => {
  app.use('', healthRoutes.routes());
  app.use(BASE_PATH, authRoutes.routes());
  app.use(BASE_PATH, searchRoutes.routes());

  app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, buyerRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, sellerRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, gigRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, messageRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, orderRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, reviewRoutes.routes());
};