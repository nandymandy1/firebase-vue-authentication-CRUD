<template>
  <div id="new-employee">
    <br>
    <h4>Add New Employee</h4>
    <div class="card" style="width: 36rem;">
      <div class="card-body">
        <form @submit.prevent="saveEmployee">
          <div class="form-group">
            <label># Employee Id</label>
            <input placeholder="Employee Id" class="form-control" type="text" v-model="employee_id">
          </div>
          <div class="form-group">
            <label>Employee Name</label>
            <input placeholder="Name" type="text" class="form-control" v-model="name">
          </div>
          <div class="form-group">
            <label>Department</label>
            <input placeholder="Department" type="text" class="form-control" v-model="dept">
          </div>
          <div class="form-group">
            <label>Position</label>
            <input placeholder="Position" type="text" class="form-control" v-model="position">
          </div>
          <button type="submit" class="btn btn-md btn-primary">Submit</button>
          <router-link to="/" class="btn btn-md btn-secondary">Cancel</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name:'new-employee',
  data(){
    return{
      employee_id: null,
      name: null,
      dept: null,
      position: null
    }
  },
  methods:{
    // to add the collection into the database
    saveEmployee(){
      db.collection('employees').add({
        employee_id: this.employee_id,
        name: this.name,
        dept: this.dept,
        position: this.position
      })
      .then(docRef => this.$router.push('/'))
      .catch(error =>
        console.log(error)
      )
    }// Save Employee method
  }// methods
}
</script>

<style lang="css">

</style>
