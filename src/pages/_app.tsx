import ContextDashboardProvider from '@/hooks/ContextDashboard'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import React from 'react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
// 3. extend the theme
const theme = extendTheme({ config })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ContextDashboardProvider>
        <Component {...pageProps} />
      </ContextDashboardProvider>
    </ChakraProvider>
  )
}
