import { IBranch, IBusiness, ICity, IClient, IProvince, ITask } from "backend/models/interfaces"
import { months } from "backend/models/types"

export const formatIds = (doc:any)=>{
    return JSON.parse(JSON.stringify(doc))
}

export function dmyDateString(date:Date){
    return `${date.getDate() > 10?`${date.getDate()}`:`0${date.getDate()}`}/${date.getMonth()+1 > 10?`${date.getMonth()+1}`:`0${date.getMonth()+1}`}/${date.getFullYear()}`
}

export function slugify(string:string){
    return string.replace(' ', '-')
}

export function deSlugify(string:string){
    return string.replace('-', ' ')
}

export function toCityProvince(city: ICity) {
    return `${city.name}, ${city.province.name}`
}

export function toMonth(num:number){
    return months[num]
}

export function trimProvince(province:IProvince){
    return{
        _id:province._id,
        name:province.name
    }
}

export function trimCity(city:ICity){
    return{
        _id:city._id,
        name:city.name,
        province:city.province.name
    }
}

export function trimClient(client:IClient){
    return{
        _id:client._id,
        name:client.name
    }
}

export function trimBusiness(business:IBusiness){
    return{
        _id:business._id,
        name:business.name
    }
}

export function trimBranch(branch:IBranch){
    return{
        _id:branch._id,
        number:branch.number,
        city:trimCity(branch.city),
        client:trimClient(branch.client),
        businesses:branch.businesses.map(business => trimBusiness(business)),
    }
}

export function trimTask(task:ITask){
    return{
        _id:task._id,
        branch:trimBranch(task.branch),
        business:trimBusiness(task.business),
        openedAt:task.openedAt,
        taskType:task.taskType,
        status:task.status,
        description:task.description,
    }
}