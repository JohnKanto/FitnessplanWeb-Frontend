<template>
  <div v-if="isVisible" class="popup" style="z-index: 10;">
    <div style="width: 100%; height: 81px; text-align: center; color: black; font-size: 50px; font-weight: 700; word-wrap: break-word">Edit Exercise</div>
    <div style="padding-bottom: 11px;width: 30%;">
      <div class="form-floating mb-3">
        <input type="text" :class="['form-control', {'is-invalid': !isNameInputValid}]"  id="Nameinput" placeholder="Name" v-model="inputName" style="font-size: 1.5em;">
        <label for="Nameinput">Name</label>
      </div>
      <div class="form-floating mb-3">
        <input type="number" class="form-control" id="Setinput" style="font-size: 1.5em;" placeholder=0 v-model="inputSets">
        <label for="Setinput">Sets</label>
      </div>
      <div class="form-floating mb-3">
        <input type="number" class="form-control" id="Repinput" style="font-size: 1.5em;" placeholder=0 v-model="inputReps">
        <label for="Repinput">Reps</label>
      </div>
      <div class="input-group form-floating mb-3">
        <input type="number" class="form-control" id="WeigthInput" step="0.25" style="font-size: 1.5em;" v-model="inputWeight" placeholder=0>
        <label for="floatingInput">Weight</label>
        <span class="input-group-text">KG</span>
      </div>
      <div class="form-floating mb-3">
        <input type="time" class="form-control" id="timeInput" step="1" style="font-size: 1.5em;" v-model="inputDuration">
        <label for="timeInput">Duration</label>
      </div>
    </div>
    <div style="height: 41px; justify-content: center; align-items: center; gap: 10px; display: inline-flex" class="buttoncontainer">
      <button type="button" class="btn btn-danger" @click="onCancel">CANCEL</button>
      <button type="button" class="btn btn-success" @click="onSave">SAVE</button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'EditExercise',
  data () {
    return {
      inputName: '',
      isNameInputValid: true,
      isVisible: false,
      inputSets: null,
      inputReps: null,
      inputWeight: null,
      inputDuration: null,
      Tid: null,
      ID: null
    }
  },
  methods: {
    open (tid, id) {
      this.isVisible = true
      if (id != null) {
        this.ID = id
      }
      if (tid != null) {
        this.Tid = tid
      }
    },
    close () {
      this.isVisible = false
      this.inputName = ''
      this.isNameInputValid = true
      this.inputSets = null
      this.inputReps = null
      this.inputWeight = null
      this.inputDuration = null
      this.ID = null
    },
    onCancel () {
      this.close()
    },
    onSave () {
      if (!this.inputName) {
        this.isNameInputValid = false // Setzen Sie auf false, wenn das Input-Feld leer ist
      } else {
        this.isNameInputValid = true
        this.sendDataToApi()
        this.close()
      }
    },
    sendDataToApi () {
      const payload = {
        name: this.inputName,
        sets: parseInt(this.inputSets),
        reps: parseInt(this.inputReps),
        weight: parseFloat(this.inputWeight),
        duration: this.inputDuration,
        tid: this.Tid
      }

      if (this.ID != null) {
        fetch('http://localhost:8080/api/v1/exercise/' + this.ID, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            // Behandeln Sie hier die erfolgreiche Antwort
          })
          .catch(error => {
            console.error(error)
            // Behandeln Sie hier Fehlerfälle
          })
      } else {
        fetch('http://localhost:8080/api/v1/exercise', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            // Behandeln Sie hier die erfolgreiche Antwort
          })
          .catch(error => {
            console.error(error)
            // Behandeln Sie hier Fehlerfälle
          })
      }
    }
  }
}
</script>

<style scoped>
.popup {
  position: absolute;
  width: 40%;
  /* Zentriert das Popup im Overlay */
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  padding-left: 63px;
  padding-right: 63px;
  padding-top: 15px;
  padding-bottom: 15px;
  background: #A0A0A0;
  border-radius: 17px;
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 10px; display: inline-flex
}

</style>
