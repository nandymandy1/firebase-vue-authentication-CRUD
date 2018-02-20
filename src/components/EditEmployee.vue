<template>
  <div id="edit-employee">
      <br>
      <h3>Edit Employee</h3>
      <div class="card" style="width: 36rem;">
        <div class="card-body">
          <form @submit.prevent="updateEmployee">
            <div class="form-group">
              <label># Employee Id</label>
              <input disabled placeholder="Employee Id" class="form-control" type="text" v-model="employee_id">
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
            <button type="submit" class="btn btn-md btn-info">Update</button>
            <router-link to="/" class="btn btn-md btn-secondary">Cancel</router-link>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name:'edit-employee',
  data(){
    return{
      employee_id: null,
      name: null,
      dept: null,
      position: null
    }
  },
  beforeRouteEnter(to, from , next){
    db.collection('employees').where('employee_id', '==', to.params.employee_id)
    .get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        next(vm => {
          vm.employee_id = doc.data().employee_id
          vm.name = doc.data().name
          vm.dept = doc.data().dept
          vm.position = doc.data().position
        })
      })
    })
  },
  watch:{
    '$route': 'fetchData'
  },
  methods:{
    fetchData(){
      db.collection('employees').where('employee_id', '==', this.$route.params)
      .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.employee_id = doc.data().employee_id
          this.name = doc.data().name
          this.dept = doc.data().dept
          this.position = doc.data().position
        })
      })
    },
    updateEmployee () {
      db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            employee_id: this.employee_id,
            name: this.name,
            dept: this.dept,
            position: this.position
          })
          .then(() => {
           this.$router.push({ name: 'view-employee',
           params: { employee_id: this.employee_id }})
        });
      })
    })
   }
  }
}
</script>

<style lang="css">

</style>
