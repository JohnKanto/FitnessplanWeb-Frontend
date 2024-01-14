<template>
  <div v-if="isVisible" class="popup" style="z-index: 10;">
    <div style="width: 100%; height: 81px; text-align: center; color: black; font-size: 50px; font-weight: 700; word-wrap: break-word">Edit Exercise</div>
    <div style="padding-bottom: 11px;width: 30%;">
      <div class="form-floating mb-3">
        <input type="text" :class="['form-control', {'is-invalid': !isNameInputValid}]"  id="Nameinput" placeholder="Name" v-model="inputName" style="font-size: 1.5em;">
        <label for="Nameinput">Name</label>
      </div>
      <div class="form-floating mb-3">
        <input type="date" :class="['form-control', {'is-invalid': !isDateInputValid}]" id="dateInput" step="1" style="font-size: 1.5em;" v-model="inputDate">
        <label for="timeInput">Date</label>
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
  name: 'EditTrainday',
  data () {
    return {
      inputName: '',
      isNameInputValid: true,
      isVisible: false,
      ID: null,
      inputDate: null,
      isDateInputValid: true
    }
  },
  methods: {
    open (id) {
      this.isVisible = true
      if (id != null) {
        console.log('id hinzugefügt')
        this.ID = id
      }
    },
    close () {
      this.isVisible = false
      this.inputName = ''
      this.isNameInputValid = true
      this.ID = null
      this.inputDate = null
      this.isDateInputValid = true
    },
    onCancel () {
      this.close()
    },
    onSave () {
      if (!this.inputName) {
        this.isNameInputValid = false // Setzen Sie auf false, wenn das Input-Feld leer ist
      } else {
        this.isNameInputValid = true
      }
      if (this.inputDate == null) {
        this.isDateInputValid = false
      } else {
        this.isDateInputValid = true
      }
      if (this.isDateInputValid && this.isNameInputValid) {
        this.sendDataToApi()
        this.close()
      }
    },
    sendDataToApi () {
      const payload = {
        name: this.inputName,
        date: this.inputDate
      }

      if (this.ID != null) {
        console.log('idvorhanden')
        console.log(this.ID)
        fetch('http://localhost:8080/api/v1/trainday/' + this.ID, {
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
        console.log('idnichtvorhanden')
        fetch('http://localhost:8080/api/v1/trainday', {
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
