<template>
    <div class="container-fluid w-100 h-100">
        <div class="row h-100">
            <div class="col-12 col-md-5 col-lg-4">
                <play-bar @selectServer="selectServer"></play-bar>
            </div>
            <div class="col-12 col-md-7 col-lg-8 d-flex justify-content-center align-items-center">
                <div>
                    <game />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from '@/event-bus.js';
import conection from '@/game/conection';
import providerServices from '@/providerServices'
import Game from '@/components/Game.vue'
import PlayBar from '@/components/PlayBar.vue'

export default {
    name: 'play',
    components: {
        Game, PlayBar
    },
    data(){
        return {
        }
    },
    created(){
        let _self = this
        conection.startConnection()
        if (this.$store.getters.playerId.trim() == '') {
            this.$router.push({
                path: '/'
            })
        }
    },
    methods: {
        selectServer(serverId){
            this.$store.commit('setServerId', serverId)
            conection.selectServer()
        }
    }
}
</script>

<style scoped>

</style>
