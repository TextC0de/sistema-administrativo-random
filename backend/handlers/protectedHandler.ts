import accessControl from '../middleware/accessControl'

import baseHandler from './baseHandler';

const protectedHandler = () => baseHandler.use(accessControl);

export default protectedHandler()