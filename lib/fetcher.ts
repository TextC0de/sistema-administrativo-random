
const contentType = 'application/json'

const fetcher = {
    post: async function(data: any, url: string) {
        const res: Response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: contentType,
                'Content-Type': contentType
                },
            body: JSON.stringify(data)
        })
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
            console.log(res)
            throw new Error('fetch failed')
        }
        return await res.json()
    },
    put: async function(data: any, url: string) {
        const res: Response = await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: contentType,
                'Content-Type': contentType
                },
            body: JSON.stringify(data)
        })
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
            console.log(res)
            throw new Error('fetch failed')
        }
        return await res.json()
    },
    get: async function(url: string) {
        const res: Response = await fetch(url, {
            method: 'GET'
        })
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
            console.log(res)
            throw new Error('fetch failed')
        }
        return await res.json()
    },
    delete: async function(data: any, url: string) {
        const res: Response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: contentType,
                'Content-Type': contentType
                },
            body: JSON.stringify(data)
        })
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
            console.log(res)
            throw new Error('fetch failed')
        }
        return await res.json()
    }
}

export default fetcher
