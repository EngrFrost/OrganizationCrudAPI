import { defineStore } from 'pinia'
import api from '../api/api'
import token from '../api/token'
import { message } from 'ant-design-vue'

const useOrganization = defineStore('Organization', {
  state: () => ({
    login: [],
    error: null,
    fetching: false,
    organizationData: []
  }),
  actions: {
    loginHandler(form) {
      api
        .post('/auth/login', form)
        .then((res) => {
          this.login = res.data.data
          console.log(res.data)
          localStorage.setItem('token', res.data.access_token)
          localStorage.setItem('user', JSON.stringify(res.data.data))
          this.fetching = false
        })
        .catch((err) => {
          console.log(err.response.data)
          if (err.response.data['email']) {
            message.error(err.response.data['email'])
          }
          if (err.response.data['password']) {
            message.error(err.response.data['password'])
          }
          if (err.response.data['message']) {
            message.error(err.response.data['message'])
          }
          this.error = err.response
          this.fetching = false
        })
    },
    fetchOrganization() {
      const storedToken = token()
      this.fetching = true
      console.log('check')
      api
        .get(
          '/organization',

          {
            params: {
              per_page: 10
            },
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json'
            }
          }
        )
        .then((res) => {
          this.organizationData = res.data.data
          console.log(res.data.data)

          this.fetching = false
        })
        .catch((err) => {
          this.error = err.response
          this.fetching = false
        })
    },
    addOrganization(form) {
      const storedToken = token()
      this.fetching = true

      api
        .post('/organization/store', form, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          this.fetching = false
          this.fetchOrganization()

          message.success(res.data['message'])
        })
        .catch((err) => {
          this.error = err.response
          this.fetching = false
          console.log(err)
          if (err.response.data['message']) {
            message.error(err.response.data['message'])
          }
        })
    },
    deleteOrganization(id) {
      const storedToken = token()
      this.fetching = true

      api
        .delete(`/organization/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          this.fetching = false
          this.fetchOrganization()
          console.log(res)
          message.success(res.data['message'])
        })
        .catch((err) => {
          this.error = err.response
          console.log(err)
          this.fetching = false
          if (err.response.data['message']) {
            message.error(err.response.data['message'])
          }
        })
    }
  }
})

export default useOrganization
