import ProvinceForm, { IProvinceForm } from 'frontend/components/Forms/TechAdmin/ProvinceForm/ProvinceForm'


export default function NewProvince(){
    const provinceForm:IProvinceForm = {
        name:''
    }

    return(
        <>
           <ProvinceForm provinceForm={provinceForm}/>
        </>
    )
}
