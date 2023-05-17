import { type GetServerSidePropsContext } from 'next'
import ProvinceTable from 'frontend/components/Tables/ProvinceTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { type IProvince } from 'backend/models/interfaces'
import Province from 'backend/models/Province'
import TitleButton from 'frontend/components/TitleButton'

interface props {
	provinces: IProvince[]
}

export default function Provinces({ provinces }: props): JSX.Element {
	return (
		<>
			<TitleButton title="Provincias" path="/tech-admin/provinces/new" nameButton="Agregar provincia" />
			<ProvinceTable provinces={provinces} />
		</>
	)
}

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<{ props: props }> {
	await dbConnect()
	const docProvinces = await Province.findUndeleted({})
	const provinces = formatIds(docProvinces)
	return { props: { provinces } }
}
