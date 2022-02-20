import Survey from "@/components/Survey"
import Meta from "@/layout/Meta"
import Main from "@/template/Main"
import { withSessionSsr } from "@/utils/IronSession"
import { useRouter } from "next/router"
import { FC } from "react"

type Props = {}
const Shot: FC<Props> = () => {
  const router = useRouter()
  // @ts-ignore
  const { number }: string | "" = router.query
  const shots = ["1", "2", "3"]

  return (
    <Main meta={<Meta title="" description="" />}>
      <div className="  w-full h-full overflow-x-hidden">
        {shots.includes(number) ? <Survey shot={number} /> : <h1>not found</h1>}
      </div>
    </Main>
  )
}
export const getServerSideProps = withSessionSsr(async ({ req }: any) => {
  const { loggedUser } = req.session
  if (!loggedUser) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return { props: { user: loggedUser } }
})

export default Shot
