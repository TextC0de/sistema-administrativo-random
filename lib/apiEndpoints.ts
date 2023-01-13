export const baseUrl = process.env.BASE_URL || 'http://localhost:3000/'
export const baseApiUrl = baseUrl + 'api/'
export const authUrl = baseApiUrl + 'auth/'
export const logoutUrl = authUrl + 'logout/'
export const registerUrl = authUrl + 'register/'
export const loggedInUser = authUrl + 'user/'
const accAdminBase = baseApiUrl + 'acc-admin/'

export const accAdmin:any ={
    services: accAdminBase + 'services/',
    expenses: accAdminBase + 'expenses/'
}

const auditorBase = baseApiUrl + 'auditor/'

export const auditor:any ={
    services: auditorBase + 'services/',
    expenses: auditorBase + 'expenses/'
}

const techAdminBase = baseApiUrl + 'tech-admin/'

export const techAdmin:any = {
    services: techAdminBase + 'services/',
    provinces: techAdminBase + 'provinces/',
    citys: techAdminBase + 'citys/',
    branchs: techAdminBase + 'branchs/',
    businesses: techAdminBase + 'businesses/',
    clients: techAdminBase + 'clients/',
    preventives: techAdminBase + 'preventives/',
    users: techAdminBase + 'users/',
}
