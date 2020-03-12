import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
      playerId: '',
      serverId: -1,
      host: '192.168.30.29:3000',
      isDownloaded: false
    },
    getters: {
        playerId(state){
            return state.playerId
        },
        serverId(state){
            return state.serverId
        },
        host(state){
            return state.host
        },
        isDownloaded(state){
            return state.isDownloaded
        }
    },
    mutations: {
        setPlayerId(state, value){
            state.playerId =  value
        },
        setServerId(state, value){
            state.serverId =  value
        },
        setIsDownloaded(state, value){
            state.isDownloaded =  value
        },
    }
  })

  export default store