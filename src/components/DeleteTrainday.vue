<template>
  <div v-if="isVisible" class="popup" style="z-index: 10;">
    <div style="width: 100%; height: 81px; text-align: center; color: black; font-size: 50px; font-weight: 700; word-wrap: break-word">DeleteTrainday</div>
    <div style="height: 41px; justify-content: center; align-items: center; gap: 10px; display: inline-flex" class="buttoncontainer">
      <button type="button" class="btn btn-warning" @click="onCancel">Cancel</button>
      <button type="button" class="btn btn-danger" @click="onDelete">Delete</button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'DeleteTrainday',
  data () {
    return {
      isVisible: false,
      ID: null
    }
  },
  methods: {
    open (id) {
      this.isVisible = true
      if (id !== undefined) {
        this.ID = id
      }
    },
    close () {
      this.isVisible = false
    },
    onCancel () {
      this.close()
    },
    onDelete () {
      const requestOptions = {
        method: 'DELETE'
      }
      fetch('http://localhost:8080/api/v1/trainday/' + this.ID, requestOptions)
        .catch(error => console.log('error', error))
      this.close()
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
