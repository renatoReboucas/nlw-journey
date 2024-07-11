import axios from "axios"

export const api = axios.create({
  baseURL: "http://192.168.1.14:3333",
  headers: {
    "Content-Type": "application/json",
  },
})
