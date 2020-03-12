<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <h1 class="text-center mt-5">Wild War</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error architecto est impedit culpa consequuntur, 
                    sint, deleniti maxime odio, obcaecati voluptatum natus! Provident illo dolore, voluptate ea fugit rem 
                    exercitationem! Quae! Molestiae tempora, dolores velit accusantium officia culpa fugit debitis facilis </p>
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
                <p class="mt-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel accusantium, aliquam omnis soluta repudiandae laboriosam eius fugit sunt quis a consequatur id ipsum reprehenderit quaerat, amet alias deserunt quasi dolor.
                Accusamus excepturi adipisci dolores dolorum vel. Laborum, dicta sequi. Sed, modi ullam similique officiis esse iste laborum itaque consectetur dicta quisquam maiores praesentium ex quos deserunt veritatis, ut quis blanditiis!
                Necessitatibus doloremque explicabo id, dolorem expedita tempore tenetur quisquam nulla aut voluptates laudantium obcaecati eaque iusto alias exercitationem optio perferendis molestias ipsa, quos quidem quod hic dolorum qui! Harum, nihil!
                Modi, autem reprehenderit harum, voluptatum hic explicabo, laudantium amet magnam sapiente placeat necessitatibus quisquam quos! Ducimus voluptates, illo dolorum voluptatibus cumque cum exercitationem, sit nihil fugiat magnam iusto, eius quod!
                Est voluptatibus doloremque consequatur atque necessitatibus amet perferendis fugit minima officiis impedit quisquam natus animi corrupti, sunt repellat ut deleniti, iure corporis praesentium? Impedit nemo, quo aspernatur perspiciatis unde similique.
                Natus, deleniti ipsa! Quod ipsa asperiores odit inventore praesentium et? Atque corrupti asperiores ipsa eligendi quibusdam pariatur earum voluptates deserunt optio. Sequi accusantium aspernatur quos non ex assumenda rem sit.</p>
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
</style>
