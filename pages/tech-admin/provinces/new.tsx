import ProvinceForm, { IProvinceForm } from 'frontend/components/Forms/TechAdmin/ProvinceForm'


export default function NewProvince(){
    const provinceForm:IProvinceForm = {
        _id:'',
        name:''
    }

    return(
        <>
           <ProvinceForm provinceForm={provinceForm}/>
        </>
    )
}
