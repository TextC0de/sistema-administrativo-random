import { NextConnectApiRequest } from './interfaces';

import dbConnect from '@/lib/dbConnect';

const ExpenseController = {
    postTech: async (req: NextConnectApiRequest) => {
        const { body } = req;
        await dbConnect();
    },
};

export default ExpenseController;
