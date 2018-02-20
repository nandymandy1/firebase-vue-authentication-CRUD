<template>
  <div id="dashboard">
      <h3>Dashborad</h3>
      <router-link to="/new" class="btn btn-primary btn-md pull-right">
        <i class="fws fa fa-plus"> Add </i>
      </router-link>
      <br>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#Id</th>
            <th scope="col">Name</th>
            <th scope="col">Department</th>
            <th scope="col">Position</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" v-bind:key="employee.id">
            <th scope="row">{{ employee.employee_id }}</th>
            <td>{{ employee.name }}</td>
            <td><span class="badge badge-secondary">{{ employee.dept }}</span></td>
            <td>{{ employee.position }}</td>
            <td><router-link class="btn btn-primary btn-sm" v-bind:to="{name: 'view-employee', params:{ employee_id: employee.employee_id }}">
              <i class="fa fa-eye"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name:'dashboard',
  data(){
    return{
      employees:[]
    }
  },
  created(){
    db.collection('employees').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'employee_id': doc.data().employee_id,
          'name': doc.data().name,
          'dept': doc.data().dept,
          'position': doc.data().position
        }
        this.employees.push(data)
      })
    })
  }
}
</script>

<style lang="css">

</style>
