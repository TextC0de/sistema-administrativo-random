import { type IProvince } from 'backend/models/interfaces'
import Province from 'backend/models/Province'
import CityForm, { type ICityForm } from 'frontend/components/Forms/TechAdmin/CityForm'
import dbConnect from 'lib/dbConnect'
import { type GetServerSidePropsContext } from 'next'
import { formatIds } from 'lib/utils'

interface props {
    provinces: IProvince[]
}

export default function NewCity({ provinces }: props): JSX.Element {
    const cityForm: ICityForm = {
        _id: '',
        name: '',
        province: {} as IProvince
    }

    return (
        <>
           <CityForm cityForm={cityForm} provinces={provinces}/>
        </>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<{ props: props }> {
    await dbConnect()
    const docProvinces = await Province.findUndeleted({})
    const provinces = formatIds(docProvinces)
    return { props: { provinces } }
}
