<template>
  <div class="about">
    <h1>Über uns</h1>
    <p>Willkommen bei MeinFitnessplan – Ihr Spezialist für maßgeschneiderte Fitnesspläne!</p>
    <h2>Unsere Mission</h2>
    <p>Unsere Mission bei MeinFitnessplan: Wir wollen Ihnen helfen, Ihre Fitnessziele effizient und effektiv zu erreichen. Wir glauben, dass jeder einen individuellen Plan verdient, der auf seine Bedürfnisse, Ziele und den Lebensstil zugeschnitten ist.</p>
    <p>Für weitere Informationen oder bei Fragen, zögern Sie nicht, uns zu kontaktieren:</p>
    <ul>
      <li>John Kanto: <a href="mailto:john.kanto@student.htw-berlin.de">john.kanto@student.htw-berlin.de</a></li>
      <li>Marc Paulwitz: <a href="mailto:marc.paulwitz@student.htw-berlin.de">marc.paulwitz@student.htw-berlin.de</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
  // Hier kannst du Daten, Methoden usw. hinzufügen
}
</script>

<style scoped>
.about {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f8e6e6;
  border: 1px solid #c20000;
  border-radius: 8px;
}

.about h1, .about h2 {
  color: #c20000;
}

.about a {
  color: #c20000;
  text-decoration: none;
}

.about a:hover {
  text-decoration: underline;
}
</style>
