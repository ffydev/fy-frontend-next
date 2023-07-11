import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FY_API,
  maxBodyLength: 2.5 * 1024 * 1024 * 1024,
  timeout: 20 * 60 * 1000,
})
