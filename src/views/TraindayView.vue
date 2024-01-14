<template>
  <EditTrainday ref="myEditPopup"></EditTrainday>
  <DeleteTrainday ref="myDeletePopup"></DeleteTrainday>
  <div class="rounded-red-background">
    <h1>Traindays:</h1>
  </div>
  <select class="form-select  custom-select"  v-model="sortbyDate" aria-label="Default select example">
    <option :value="false">Sort by ID</option>
    <option :value="true">Sort by Date</option>
  </select>
  <div class="container-fluid">
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div class="col" v-for="trainday in traindays" :key="trainday.id">
        <div class="card">
          <div class="Exercisebuttons" style="position: absolute; top: 0; right: 0;">
            <i class="bi bi-pencil-square" @mouseover="hover = true" @mouseleave="hover = false" :style="hover ? 'color: green;' : ''" @click="openPopup(trainday.id)"></i>
            <button type="button" class="btn-close" aria-label="Close" @click="deleteTrainday(trainday.id)"></button>
          </div>
          <div class="card-header" >{{ trainday.name }}</div>
          <div class="card-body">
            <div class="card-item">
              <label>Datum:</label>
              <span v-if="trainday.date">{{trainday.date[2]}}:{{trainday.date[1]}}:{{trainday.date[0]}}</span>
            </div>
            <button type="button" class="btn btn-primary" @click="goToPage(trainday.id)">Exercises</button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card" style="width:200px;">
          <i class="bi bi-plus-circle" @mouseover="addhover = true" @mouseleave="addhover = false" :style="addhover ? 'color: green;font-size: 60px;' : 'font-size: 60px;'" @click="openPopup(null)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteTrainday from '@/components/DeleteTrainday.vue'
import EditTrainday from '@/components/EditTrainday.vue'

export default {
  name: 'Trainday_view',
  components: { EditTrainday, DeleteTrainday },
  data () {
    return {
      sortbyDate: false,
      hover: false,
      addhover: false,
      traindays: []
    }
  },
  methods: {
    openPopup (id) {
      console.log(id)
      if (id != null) {
        this.$refs.myEditPopup.open(id)
      } else {
        this.$refs.myEditPopup.open()
      }
    },
    deleteTrainday (id) {
      this.$refs.myDeletePopup.open(id)
    },
    refresh () {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch('http://localhost:8080/api/v1/trainday', requestOptions)
        .then(response => response.json())
        .then(result => {
          this.traindays = this.sortedTraindays(result)
        })
        .catch(error => console.log('error', error))
    },
    sortedTraindays (unsorted) {
      if (this.sortbyDate) {
        return unsorted.slice().sort((a, b) => {
          // Konvertiere die Datumswerte in ein vergleichbares Format
          const dateA = new Date(a.date[0], a.date[1] - 1, a.date[2])
          const dateB = new Date(b.date[0], b.date[1] - 1, b.date[2])
          return dateA - dateB
        })
      } else {
        return unsorted
      }
    },
    goToPage (num) {
      window.location.href = 'http://localhost:8090/workout/' + num
    }
  },
  mounted () {
    this.interval = setInterval(this.refresh, 100)
  }

}
</script>

<style scoped>
  .custom-select {
    width: 20%;
    border: 2px solid grey;
    margin: 0 auto;
    display: block;
  }
  .rounded-red-background {
    background-color: #802525;
    border-radius: 10px;
    padding: 10px;
    display: inline-block;
  }

  .card {
    border: 1px solid #c20000;
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

  .card-body {
    padding: 8px;
  }

  .card-item {
    margin-bottom: 10px;
  }

  .card-item label {
    font-weight: bold;
    color: #c20000;
  margin-right: 5px;
  }

  .card-item span {
    color: #333;
  }
</style>
