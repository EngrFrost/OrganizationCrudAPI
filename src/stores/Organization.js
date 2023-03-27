import { defineStore } from 'pinia'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-dev.talentbuilders.org/api/v1'
})

const useOrganization = defineStore('Organization', {
  state: () => ({
    login: [],
    error: null,
    fetching: false
  }),
  actions: {
    loginHandler() {
      api
        .post('/auth/login', { email: 'superuser@email.com', password: 'password' })
        .then((res) => {
          this.login = res.data.data
          console.log(res.data.data)
          localStorage.setItem('token', res.data.access_token)
          localStorage.setItem('user', JSON.stringify(res.data.data))
          this.fetching = false
        })
        .catch((err) => {
          if (err) {
            this.error = err.response
            this.fetching = false
          }
        })
    },
    fetchOrganization() {
      api
        .get('/organization')
        .then((res) => {
          this.login = res.data.data
          console.log(res.data.data)
          localStorage.setItem('token', res.data.access_token)
          localStorage.setItem('user', JSON.stringify(res.data.data))
          this.fetching = false
        })
        .catch((err) => {
          if (err) {
            this.error = err.response
            this.fetching = false
          }
        })
    }
  }
})

export default useOrganization
