import Meta from "@/layout/Meta"
import Main from "@/template/Main"
import Shots from "@/components/Shots"
import { IUser } from "@/models/User"
import { FC } from "react"
import { shots } from "@/utils/Data"
import { withSessionSsr } from "@/utils/IronSession"

type Props = {
  user: IUser
}
const Vaccination: FC<Props> = ({ user }) => (
  <Main meta={<Meta title="" description="" />}>
    <div className="w-full h-full flex justify-center items-center gap-3  flex-col">
      {shots.map((s, key) => (
        <Shots
          // @ts-ignore
          disabled={user?.vaccination[key]?.value}
          key={s.title}
          title={s.title}
          description={s.description}
          number={s.id}
        />
      ))}
    </div>
  </Main>
)

export const getServerSideProps = withSessionSsr(async ({ req }: any) => {
  const { loggedUser } = req.session
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string
  if (!loggedUser) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const res = await fetch(`${BACKEND_URL}/user/${loggedUser.cin}`)
  const data = await res.json()
  console.log(data)

  return { props: { user: data } }
})

export default Vaccination
