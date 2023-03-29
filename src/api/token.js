import useOrganization from '../stores/Organization'

// Function to check for token
const token = () => {
  const org = useOrganization()
  const token = localStorage.getItem('token')

  if (token) {
    return token
  } else {
    localStorage.removeItem('token')
    return org.token
  }
}

export default token
