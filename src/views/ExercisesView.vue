<template>
  <h1>Welcome to Persons</h1>
  <div class="container-fluid">
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div class="col" v-for="exercise in exercises" :key="exercise.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ exercise.name }}</h5>
            <p class="card-text">
              Sets: {{exercise.sets}}   Reps: {{exercise.reps}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Persons_view',
  data () {
    return {
      exercises: []
    }
  },
  mounted () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch('http://localhost:8080/api/v1/exercise', requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(exercise => {
        this.exercises.push(exercise)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>

</style>
