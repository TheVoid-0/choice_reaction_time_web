import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()

  router.push('/criar')
  return (
    <>
    </>
  )
}

export default Home
