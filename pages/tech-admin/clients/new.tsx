import ClientForm, { IClientForm } from 'frontend/components/Forms/TechAdmin/ClientForm'


export default function NewClient(){
    const clientForm:IClientForm = {
        _id:'',
        name:''
    }

    return(
        <>
           <ClientForm clientForm={clientForm}/>
        </>
    )
}
