import { useRouter } from 'next/navigation';

import { BsPlus } from 'react-icons/bs';

import { Button } from '@/components/ui/button';
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
                <Button onClick={handleClick} className="flex items-center space-x-2">
                    <BsPlus size="20" />
                    <span>{nameButton}</span>
                </Button>
            </div>
            <hr className="mb-2 bg-gray-100" />
        </>
    );
}
