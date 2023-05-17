import { type GetServerSidePropsContext } from 'next'

export default function Test(): JSX.Element {
	return <></>
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext): Promise<{ props: {} }> {
	return { props: {} }
}
