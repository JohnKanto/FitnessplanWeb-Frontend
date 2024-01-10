<template>
  <h1>Exercises:</h1>
  <div class="add-exercise-form">
    <input v-model="newExercise.name" placeholder="Exercise Name" />
    <input v-model="newExercise.sets" type="number" placeholder="Sets" />
    <input v-model="newExercise.reps" type="number" placeholder="Reps" />
    <input v-model="newExercise.duration" placeholder="Duration" />
    <button @click="addExercise">Add Exercise</button>
  </div>
  <div class="container-fluid">
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div class="col" v-for="exercise in exercises" :key="exercise.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ exercise.name }}</h5>
            <table>
              <tr>
                <td>sets</td>
                <td>reps</td>
                <td>duration</td>
              </tr>
              <tr>
                <td>{{ exercise.sets }}</td>
                <td>{{ exercise.reps }}</td>
                <td>{{ exercise.duration }}</td>
              </tr>
            </table>
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
      exercises: [],
      newExercise: { name: '', sets: '', reps: '', duration: '' }
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
