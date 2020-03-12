<template>
    <div class="container-fluid w-100 h-100">
        <div class="row h-100">
            <div class="col-12 col-md-5 col-lg-4 pt-5">
                <initial-bar @newPlayer="newPlayer"></initial-bar>
            </div>
            <div class="col-12 col-md-7 col-lg-8">
                <video autoplay muted loop id="myVideo">
                    <source :src="videoSRC" type="video/mp4">
                </video>
            </div>
        </div>
    </div>
</template>

<script>
import InitialBar from '@/components/InitialBar.vue'
import initialVideo from '@/assets/videos/initial.mp4'
export default {
    name: 'lobby',
    components: {
        InitialBar
    },
    params: {

    },
    data(){
        return {
            videoSRC: initialVideo
        }
    },
    methods: {
        newPlayer(playerId){
            this.$store.commit('setPlayerId', playerId)
            this.$router.push({
                path: '/play'
            })
        }
    }
    
}
</script>

<style scoped>
#myVideo{
    width: 100%;
    height: 100vh;
}
</style>
