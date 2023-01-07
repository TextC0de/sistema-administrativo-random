import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'

const Index = () => {
  return(
    <>
      <Link href="/test">
        <a>
          Get to Testing!
        </a>
      </Link>
    </>
  )
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps({req,res}:GetServerSidePropsContext) {
  

  //console.log(pets)
  return { props: {} }
}

export default Index
