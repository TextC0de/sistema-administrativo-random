import Link from 'next/link'
import {useRouter} from 'next/router'
import useLoading from 'frontend/hooks/useLoading'

interface props{
    title:string,
    path:string,
    children: React.ReactNode
}

export default function Item({title,path, children}:props){
    const router = useRouter()
    const {startLoading, stopLoading} = useLoading()
    async function navigate(){
        startLoading()
        await router.push(path)
        stopLoading()
    }

    return(
        <button className="flex items-center w-full h-12 px-4 mt-1 rounded hover:bg-gray-700 hover:text-gray-300" onClick={navigate}>
            {children}
            <span className="ml-2 text-sm font-medium">{title}</span>
        </button>
    )
}
