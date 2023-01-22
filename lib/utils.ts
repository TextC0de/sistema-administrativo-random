import { ICity } from "backend/models/interfaces"
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