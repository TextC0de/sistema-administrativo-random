import { createApiRouter } from '@/lib/createRouter';
import AuthController from 'backend/controllers/AuthController';
import { onError, onNoMatch } from 'backend/controllers/NextConnectController';

const router = createApiRouter().post(AuthController.login);

export default router.handler({
    onError,
    onNoMatch,
});
