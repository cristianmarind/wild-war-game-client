<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <h1 class="text-center text-light mt-5">Wild War</h1>
            </div>
        </div>
        <div class="row">
            <div class="col d-flex-column">
                <p>Servers</p>
                <div v-for="i in 4" :key="i">
                    <button @click="selectServer(i - 1)" class="btn btn-info w-100 py-1 my-1">{{ i - 1}}</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
               
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'play-bar',
    components: {
    },
    params: {

    },
    created(){

    },
    data(){
        return {
        }
    },
    methods: {
        selectServer(serverId){
            this.$emit('selectServer', serverId)
        }
    }
}
</script>

<style scoped>
#play-naw-input{
    max-width: 300px;
}
</style>
