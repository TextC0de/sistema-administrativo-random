import { type IUser } from 'backend/models/interfaces';
import User from 'backend/models/User';
import UserTable from 'frontend/components/Tables/UserTable';
import TitleButton from 'frontend/components/TitleButton';
import dbConnect from 'lib/dbConnect';
import { formatIds } from 'lib/utils';

interface props {
    users: IUser[];
}

export default function Users({ users }: props): JSX.Element {
    return (
        <>
            <TitleButton
                title="Usuarios"
                path="/tech-admin/users/new"
                nameButton="Agregar usuario"
            />
            <UserTable users={users} />
        </>
    );
}

export async function getServerSideProps(): Promise<{ props: props }> {
    await dbConnect();
    const docUsers = await User.findUndeleted({});
    return { props: { users: formatIds(docUsers) } };
}
