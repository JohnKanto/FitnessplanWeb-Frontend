<template>

  <button @click="openPopup(null)">Add Exercise</button>
  <EditExercise ref="myEditPopup"></EditExercise>
  <DeleteExercise ref="myDeletePopup"></DeleteExercise>
  <h1>Exercises:</h1>
  <div class="container-fluid">
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div class="col" v-for="exercise in exercises" :key="exercise.id">
        <div class="card">
          <div class="Exercisebuttons" style="position: absolute; top: 0; right: 0;">
            <i class="bi bi-pencil-square" @mouseover="hover = true" @mouseleave="hover = false" :style="hover ? 'color: green;' : ''" @click="openPopup(exercise.id)"></i>
            <button type="button" class="btn-close" aria-label="Close" @click="deleteExercise(exercise.id)"></button>
          </div>
          <div class="card-header">{{ exercise.name }}</div>
          <table>
            <tr>
              <td>sets</td>
              <td>reps</td>
              <td>weight</td>
              <td>duration</td>
            </tr>
            <tr>
              <td>{{ exercise.sets }}</td>
              <td>{{ exercise.reps }}</td>
              <td>{{ exercise.weight }}KG</td>
              <td>{{ exercise.duration[0] }}:{{ exercise.duration[1] }}:{{ exercise.duration[2] }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditExercise from '@/components/EditExercise.vue'
import DeleteExercise from '@/components/DeleteExercise.vue'

export default {
  name: 'Persons_view',
  components: {
    DeleteExercise,
    EditExercise
  },
  methods: {
    openPopup (id) {
      if (id != null) {
        console.log('with id')
        this.$refs.myEditPopup.open(this.Tid, id)
      } else {
        console.log('without id')
        this.$refs.myEditPopup.open(this.Tid)
      }
    },
    deleteExercise (id) {
      this.$refs.myDeletePopup.open(id)
    },
    refresh () {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch('http://localhost:8080/api/v1/exercise/Trainday' + this.Tid, requestOptions)
        .then(response => response.json())
        .then(result => {
          this.exercises = result
        })
        .catch(error => console.log('error', error))
    }
  },
  data () {
    return {
      hover: false,
      exercises: [],
      Tid: 0
    }
  },
  mounted () {
    this.Tid = this.$route.params.tid
    console.log(this.Tid)
    this.interval = setInterval(this.refresh, 100)
  }
}
</script>

<style scoped>
  .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin: 16px;
    width: fit-content;
    background-color: #f8e6e6;
  }

  .card-header {
    background-color: #c20000;
    color: white;
    padding: 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    font-size: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #c20000;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #c20000;
    color: white;
  }

</style>
