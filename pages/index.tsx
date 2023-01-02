import { GetServerSidePropsContext } from 'next'


const Index = () => {
  return(<>
    {/* Create a card for each pet */}
    
  </>)
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps({req,res}:GetServerSidePropsContext) {
  

  //console.log(pets)
  return { props: {} }
}

export default Index
