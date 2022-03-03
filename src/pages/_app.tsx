import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "@mui/material"
import theme from "@/styles/theme"
import { CacheProvider, EmotionCache } from "@emotion/react"
import createEmotionCache from "src/lib/createEmotionCache"
import { Provider } from "react-redux"
import { store } from "../app/store"

const clientSideEmotionCache = createEmotionCache()
interface MyAppProps extends AppProps {
  emotionCache: EmotionCache
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
