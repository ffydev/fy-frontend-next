import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Metadata } from 'next'
import type { AppProps } from 'next/app'
import React from 'react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const metadata: Metadata = {
  manifest: 'manifest.json',
}
const theme = extendTheme({ config })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
