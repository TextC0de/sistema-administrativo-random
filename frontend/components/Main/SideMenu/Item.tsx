import Link from 'next/link'

interface props{
    title:string,
    path:string,
    children: React.ReactNode
}

export default function Item({title,path, children}:props){
    return(
        <Link href={path}>
            <a className="flex items-center w-full h-12 px-4 mt-1 rounded hover:bg-gray-700 hover:text-gray-300">
                {children}
                <span className="ml-2 text-sm font-medium select-none">{title}</span>
            </a>
        </Link>
    )
}
