<template>
  <div id="view-employee">
    <div class="card border-primary mb-3" style="max-width: 18rem;">
      <div class="card-header">Employee</div>
      <div class="card-body text-primary">
        <h5 class="card-title">{{ name }}</h5>
        <ul class="list-group">
          <li class="list-group-item"><b>Employee ID:</b> {{ employee_id }}</li>
          <li class="list-group-item"><b>Department:</b> {{ dept }}</li>
          <li class="list-group-item"><b>Position:</b> {{ position }}</li>
        </ul>
      </div>
    </div>
    <router-link class="btn btn-md btn-secondary" to="/">Back</router-link>
     <button type="button" class="btn btn-md btn-danger" name="button" @click="deleteEmployee">
      <i class="fa fa-trash"></i>
      Delete
    </button>
    <router-link v-bind:to="{name: 'edit-employee', params:{ employee_id: employee_id }}" class="btn btn-info btn-md">
      <i class="fws fa fa-edit"> Edit </i>
    </router-link>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name:'view-employee',
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
    // Delete Method
    deleteEmployee(){
      if(confirm('Are you sure you want to delete this employee?')){
        db.collection('employees').where('employee_id', '==', this.$route.params.employee_id)
        .get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete()
            this.$router.push('/')
          })
        })
      }
    }// Delete Employee
  }// Methods
}
</script>

<style lang="css">

</style>
