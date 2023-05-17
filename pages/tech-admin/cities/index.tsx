import { type GetServerSidePropsContext } from 'next'
import CityTable from 'frontend/components/Tables/CityTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { type ICity, type IProvince } from 'backend/models/interfaces'
import City from 'backend/models/City'
import Province from 'backend/models/Province'
import TitleButton from 'frontend/components/TitleButton'

interface props {
	cities: ICity[]
	provinces: IProvince[]
}

export default function Cities({ cities, provinces }: props): JSX.Element {
	return (
		<>
			<TitleButton title="Localidades" path="/tech-admin/cities/new" nameButton="Agregar localidad" />
			<CityTable cities={cities} provinces={provinces} />
		</>
	)
}

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<{ props: props }> {
	await dbConnect()
	const cities = await City.findUndeleted()
	const provinces = await Province.findUndeleted()
	const props = formatIds({ cities, provinces })
	return { props }
}
