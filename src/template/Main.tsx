// import Image from "next/image"
import { FC, ReactNode } from "react"
// import AppConfig from "@/utils/AppConfig"

export type IMainProps = {
  meta?: ReactNode
  children: ReactNode
}

const Main: FC<IMainProps> = ({ meta, children }) => (
  <div className="">
    {meta}
    <div className="w-screen h-screen flex justify-center items-center">
      {children}
    </div>
  </div>
)

export default Main
