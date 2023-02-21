export default async function fetcher(data:any, url:string, method:string){

    const contentType = 'application/json'
    const res: Response = await fetch(url, {
        method, 
        headers: {
            Accept: contentType,
            'Content-Type': contentType,
            },
        body:JSON.stringify(data)
    })

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
        console.log(res);
        throw new Error('fetch failed')
    }
    return await res.json()
}    