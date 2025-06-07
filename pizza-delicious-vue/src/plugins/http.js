// src/plugins/http.js
import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:8081', // Ruta base de todas las llamadas
  timeout: 10000, // Puedes ajustar el tiempo de espera si es necesario (en milisegundos)
})

export const setSession = (token) => {
  localStorage.setItem("jwt_token", token)

  http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const removeSession = () => {
  localStorage.removeItem("jwt_token")

  delete http.defaults.headers.common['Authorization']
}
