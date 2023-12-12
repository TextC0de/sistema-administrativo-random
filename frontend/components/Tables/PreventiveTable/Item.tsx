import { useRouter } from 'next/router';

import { Table, Badge } from 'flowbite-react';
import { useState } from 'react';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';

import { type IPreventive, type IUser } from 'backend/models/interfaces';
import { type Month } from 'backend/models/types';
import Modal from 'frontend/components/Modal';
import useAlert from 'frontend/hooks/useAlert';
import useLoading from 'frontend/hooks/useLoading';
import * as api from 'lib/apiEndpoints';
import fetcher from 'lib/fetcher';
import { dmyDateString } from 'lib/utils';

export default function Item({
    preventive,
    deletePreventive,
}: {
    preventive: IPreventive;
    deletePreventive: (id: string) => void;
}): JSX.Element {
    const { startLoading, stopLoading } = useLoading();
    const router = useRouter();
    const [modal, setModal] = useState(false);
    const { triggerAlert } = useAlert();

    const openModal = (): void => {
        setModal(true);
    };

    const closeModal = (): void => {
        setModal(false);
    };

    const deleteData = async (): Promise<void> => {
        try {
            await fetcher.delete({ _id: preventive._id }, api.techAdmin.preventives);
            deletePreventive(preventive._id as string);
            triggerAlert({
                type: 'Success',
                message: `El preventivo de ${preventive.business.name} para la sucursal ${preventive.branch.number} del cliente ${preventive.branch.client.name} fue eliminado correctamente`,
            });
        } catch (error) {
            console.log(error);
            triggerAlert({
                type: 'Failure',
                message: `No se pudo eliminar el preventivo de ${preventive.business.name} para la sucursal ${preventive.branch.number} del cliente ${preventive.branch.client.name}, compruebe su conexion`,
            });
        }
    };

    function imposedMonths(months: Month[]): string[] | Month {
        return months.length > 1 ? months.map((month) => `${month}, `) : months[0];
    }

    function selectedTechs(techs: IUser[]): string | string[] | undefined {
        return techs.length > 1
            ? techs.map((tech) => `${tech.fullName as string}, `)
            : techs[0].fullName;
    }

    async function navigateEdit(): Promise<void> {
        startLoading();
        await router.push(`/tech-admin/preventives/${preventive._id as string}`);
        stopLoading();
    }

    const handleNavigateEdit = (): void => {
        void navigateEdit();
    };

    const handleDelete = (): void => {
        void deleteData();
    };

    return (
        <Table.Row className="border-b">
            <Table.Cell>{preventive.business.name}</Table.Cell>
            <Table.Cell>{`${preventive.branch.number}, ${preventive.branch.client.name}, ${preventive.branch.city.name}`}</Table.Cell>
            <Table.Cell>{selectedTechs(preventive.assigned)}</Table.Cell>
            <Table.Cell>
                {preventive.frequency !== undefined
                    ? `Cada ${preventive.frequency} meses`
                    : ''}
            </Table.Cell>
            <Table.Cell>
                {preventive.months != null ? imposedMonths(preventive.months) : ''}
            </Table.Cell>
            <Table.Cell>{preventive.observations}</Table.Cell>
            <Table.Cell>
                {preventive.lastDoneAt != null
                    ? dmyDateString(new Date(preventive.lastDoneAt))
                    : ''}
            </Table.Cell>
            <Table.Cell>
                <Badge color="warning">{preventive.status}</Badge>
            </Table.Cell>
            <Table.Cell>
                {preventive.batteryChangedAt != null
                    ? dmyDateString(new Date(preventive.batteryChangedAt))
                    : ''}
            </Table.Cell>
            <Table.Cell>
                <div className="flex items-center justify-evenly">
                    <button
                        className="rounded-lg p-0.5 hover:bg-gray-200 "
                        onClick={handleNavigateEdit}
                    >
                        <BsFillPencilFill color="gray" size="15" />
                    </button>
                    <button
                        className="rounded-lg p-0.5 hover:bg-gray-200"
                        onClick={openModal}
                    >
                        <BsFillTrashFill color="gray" size="15" />
                    </button>
                </div>
                <Modal
                    openModal={modal}
                    handleToggleModal={closeModal}
                    action={handleDelete}
                    msg="¿Seguro que quiere eliminar este preventivo?"
                />
            </Table.Cell>
        </Table.Row>
    );
}
