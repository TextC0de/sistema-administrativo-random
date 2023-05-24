import Router from 'next/router'
import { mutate } from 'swr'

const revalidate = async (): Promise<void> => {
    const { pathname } = Router
    console.log(pathname)
    await mutate(pathname)
}

export default function useRevalidate(): () => Promise<void> {
    return revalidate
}
