import BusinessForm, { IBusinessForm } from "frontend/components/Forms/TechAdmin/BusinessForm"

export default function NewBusiness({}){
    const businessForm:IBusinessForm ={
        _id:'',
        name:''
    }

    return(
        <>
            <BusinessForm newBusiness={true} businessForm={businessForm} />
        </>
    )
}