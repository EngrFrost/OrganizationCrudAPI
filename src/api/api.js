import axios from 'axios'

export default axios.create({
  baseURL: `https://api-dev.talentbuilders.org/api/v1`
})
