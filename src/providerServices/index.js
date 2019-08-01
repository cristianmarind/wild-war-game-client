import axiosApi from 'axios'
import store from '@/store'

const axios = axiosApi.create({
    baseURL: `http://${store.getters.host}`/*,
    headers:{ header:{value} }*/
});

export default {
    isValidPlayerId(playerId){
        return axios.post('/isValidPlayerId', {
            playerId
        })
    }
}