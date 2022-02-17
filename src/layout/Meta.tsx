import { FC } from "react"
import { NextSeo } from "next-seo"
import Head from "next/head"
import AppConfig from "@/utils/AppConfig"

export type IMetaProps = {
  title: string
  description: string
  canonical?: string
}

const Meta: FC<IMetaProps> = ({ title, description, canonical }) => (
  <>
    <Head>
      <meta charSet="UTF-8" key="charset" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1"
        key="viewport"
      />
    </Head>
    <NextSeo
      title={title}
      description={description}
      canonical={canonical}
      openGraph={{
        title,
        description,
        url: canonical,
        locale: AppConfig.locale,
        site_name: AppConfig.site_name,
      }}
    />
  </>
)

export default Meta
