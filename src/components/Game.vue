<template>
  <div id="game-container" v-if="downloaded" />
  <div class="placeholder" v-else>
    Downloading ...
  </div>
</template>


<script>
export default {
  name: 'game',
  data() {
    return {
      downloaded: false
    }
  },
  async mounted() {
    if (!window.location.href.includes('play')) {
      return
    }
    const game = await import(/* webpackChunkName: "game" */ '@/game/game')
    this.downloaded = true
    this.$nextTick(() => {
      game.launch()
    })
  }
}
</script>


<style lang="scss" scoped>
.placeholder {
  font-size: 2rem;
  font-family: 'Courier New', Courier, monospace;
}
</style>
