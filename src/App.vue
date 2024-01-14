<template>
  <body>
  <i class="bi bi-house fixed-icon" @click="goTohome"></i>
  <router-view/>
  </body>
</template>

<style>
  body {
    background-image: url('@/assets/backgroundfitness.png'); /* Pfad zu Ihrem Bild */
    background-size: cover;     /* Stellt sicher, dass der Hintergrund den ganzen Bereich abdeckt */
    background-position: center; /* Zentriert das Bild */
    background-repeat: no-repeat; /* Verhindert das Wiederholen des Bildes */
    background-attachment: fixed; /* Fixiert den Hintergrund beim Scrollen */
  }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.fixed-icon {
  position: fixed;
  font-size: 40px;
  top: 0;
  right: 0;
  z-index: 1000;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
export default {
  methods: {
    goTohome () {
      window.location.href = 'http://localhost:8090/'
    }
  }
}
</script>
