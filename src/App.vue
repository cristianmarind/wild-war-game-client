<template>
  <div class="bg-img">
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: 'App',
}
</script>


<style lang="css">
.bg-img{
  background-image: url('https://media.istockphoto.com/vectors/seamless-vector-futuristic-dark-iron-techno-texture-golden-abstract-vector-id1055048690?k=6&m=1055048690&s=170667a&w=0&h=YRVso8TAyDPlSp9GwUAt410VYbrEMQpvTw99RJ0IedI=');
  width: 100vw;
  height: 100vh;
}

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.cursor-pointer{
  cursor: pointer;
}
</style>
