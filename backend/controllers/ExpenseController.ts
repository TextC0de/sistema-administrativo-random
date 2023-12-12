import { type NextConnectApiRequest } from './interfaces';

import dbConnect from 'lib/dbConnect';

const ExpenseController = {
    postTech: async (req: NextConnectApiRequest) => {
        const { body } = req;
        await dbConnect();
        console.log(body);
    },
};

export default ExpenseController;
