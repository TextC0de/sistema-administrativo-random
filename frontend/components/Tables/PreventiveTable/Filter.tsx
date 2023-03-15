import { Label, Select } from "flowbite-react"


interface props{
    types:string[]
    entities: any[]
    selectType: (type:string)=>void
    selectEntity: (entity:string)=>void
}

export default function Filter({types, entities, selectType, selectEntity}:props){

    return (
        <div className='flex flex-col'>
            Filtro
            <hr />
            <div className='flex flex-row'>
                <Label 
                    value='Tipo: '
                /> 
                <Select
                defaultValue='default'
                placeholder='default'
                >
                    <option value="default">Seleccione el tipo...</option>
                    {types.map(type=> <option value={type} onClick={()=>selectType(type)}>{type}</option>)}
                </Select>
                <Label 
                    value='Entidad: '
                /> 
                <Select
                defaultValue='default'
                placeholder='default'
                >
                    <option value="default">Seleccione la entidad...</option>
                    {entities.map(entity=> <option value={entity.name?entity.name:entity.fullname}>{entity.name?entity.name:entity.fullname}</option>)}
                </Select>
            </div>
        </div>
    )
}