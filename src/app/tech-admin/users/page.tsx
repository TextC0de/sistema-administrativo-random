import Users from './Content';

import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import UserModel from 'backend/models/User';

const getData = async () => {
    await dbConnect();
    const docUsers = await UserModel.findUndeleted({});
    return { users: formatIds(docUsers) };
};

const Page = async () => {
    const props = await getData();
    return <Users users={props.users} />;
};

export default Page;
