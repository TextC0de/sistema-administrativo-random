import { useRouter } from 'next/navigation';

import { BsPlus } from 'react-icons/bs';

import useLoading from '@/hooks/useLoading';

interface Props {
    title: string;
    path: string;
    nameButton: React.ReactNode;
}

export default function TitleButton({ title, path, nameButton }: Props): JSX.Element {
    const { startLoading, stopLoading } = useLoading();
    const router = useRouter();
    async function navigate(): Promise<void> {
        startLoading();
        await router.push(path);
        stopLoading();
    }

    function handleClick(): void {
        void navigate();
    }

    return (
        <>
            <div className="flex items-center justify-between border-gray-400 bg-white px-5 py-4">
                <h2 className="text-xl font-semibold text-gray-600">{title}</h2>
                <button
                    onClick={handleClick}
                    className="flex select-none items-center justify-between gap-2 rounded-lg border border-gray-300 bg-gray-900  py-2 pl-2 pr-3 text-sm text-white hover:bg-gray-700"
                >
                    <BsPlus size="20" />
                    <h4>{nameButton}</h4>
                </button>
            </div>
            <hr className="mb-2 bg-gray-100" />
        </>
    );
}
