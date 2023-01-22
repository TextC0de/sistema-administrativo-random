export const baseUrl = process.env.BASE_URL || 'http://localhost:3000/'
export const baseApiUrl = baseUrl + 'api/'
export const authUrl = baseApiUrl + 'auth/'
export const logoutUrl = authUrl + 'logout/'
export const registerUrl = authUrl + 'register/'
export const loggedInUser = authUrl + 'user/'
const accAdminBase = baseApiUrl + 'acc-admin/'

export const accAdmin:any ={
    tasks: accAdminBase + 'tasks/',
    expenses: accAdminBase + 'expenses/'
}

const auditorBase = baseApiUrl + 'auditor/'

export const auditor:any ={
    tasks: auditorBase + 'tasks/',
    expenses: auditorBase + 'expenses/'
}

const techAdminBase = baseApiUrl + 'tech-admin/'

export const techAdmin:any = {
    tasks: techAdminBase + 'tasks/',
    provinces: techAdminBase + 'provinces/',
    cities: techAdminBase + 'cities/',
    branches: techAdminBase + 'branches/',
    businesses: techAdminBase + 'businesses/',
    clients: techAdminBase + 'clients/',
    preventives: techAdminBase + 'preventives/',
    users: techAdminBase + 'users/',
}
