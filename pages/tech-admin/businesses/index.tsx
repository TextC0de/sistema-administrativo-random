import Business from 'backend/models/Business'
import { type IBusiness } from 'backend/models/interfaces'
import BusinessTable from 'frontend/components/Tables/BusinessTable'
import TitleButton from 'frontend/components/TitleButton'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { type GetServerSidePropsContext } from 'next'

interface props {
    businesses: IBusiness[]
}

export default function Businesses({ businesses }: props): JSX.Element {
    return (
        <>
            <TitleButton title='Empresas' path='/tech-admin/businesses/new' nameButton='Agregar una empresa'/>
            <BusinessTable businesses={businesses}/>
        </>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<{ props: props }> {
    await dbConnect()
    const docBusinesses = await Business.findUndeleted({})
    return { props: { businesses: formatIds(docBusinesses) } }
}
