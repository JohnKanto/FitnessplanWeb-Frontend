<template>
  <EditExercise ref="myEditPopup"></EditExercise>
  <DeleteExercise ref="myDeletePopup"></DeleteExercise>
  <div class="rounded-red-background">
    <h1>Exercises</h1>
  </div>
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
              <td v-if="exercise.duration">{{ exercise.duration[0] }}:{{ exercise.duration[1] }}:{{ exercise.duration[2] }}</td>
              <td v-else></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="col">
        <div class="card" style="width: 200px;">
          <i class="bi bi-plus-circle" @mouseover="addhover = true" @mouseleave="addhover = false" :style="addhover ? 'color: green;font-size: 60px;' : 'font-size: 60px;'" @click="openPopup(null)"></i>
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
      addhover: false,
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

  .rounded-red-background {
    background-color: #802525;
    border-radius: 10px;
    padding: 10px;
    display: inline-block;
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
