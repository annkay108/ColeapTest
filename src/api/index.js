import Axios from 'axios'

export const getVehicles = () => {
    return Axios.get(`https://6157228e8f7ea600179850e4.mockapi.io/api/vehicles`)
}