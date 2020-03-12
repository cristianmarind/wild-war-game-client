<template>
    <div class="container-fluid containerInitialBar">
        <div class="row">
            <div class="col">
                <h1 class="text-center mt-5">Wild War</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label for="play-naw-input" class="w-100 text-center">Juega ahora!</label>
                <div class="input-group mb-3 d-flex align-items-center justify-content-center">
                    <input v-model="playerId" @keypress.enter="newPlayer" id="play-naw-input" type="text" class="form-control" placeholder="Username" aria-label="Enter your username" aria-describedby="basic-addon2">
                    <div @click="newPlayer" class="input-group-append px-2 cursor-pointer">
                       <font-awesome-icon icon="play" />
                    </div>
                </div>
                <div>
                    <p class="text-danger text-center" v-text="msg"></p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h6 class="text-center mb-4">¿Como jugar?</h6>
                <p class="mt-3">
                    Debes de esquivar las bolas rojas, para aumentar la dificultad de la partida, obtén todas las estrellas.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import providerServices from '@/providerServices'

export default {
    name: 'initial-bar',
    components: {
    },
    params: {

    },
    data(){
        return {
            playerId: '',
            msg: ''
        }
    },
    methods: {
        newPlayer(){
            let _self = this
            this.msg = ''
            providerServices.isValidPlayerId(this.playerId).then(function (response) {
                let isValid =  response.data
                if (!isValid) {
                    _self.msg = 'El nombre de usuario ya existe'
                    return
                }
                _self.$emit('newPlayer', _self.playerId)
            })
        }
    }
}
</script>

<style scoped>
#play-naw-input{
    max-width: 300px;
}
.containerInitialBar{
    color: #fff;
    background-color: #000000b5;
    border-radius: 1em;
}
</style>
