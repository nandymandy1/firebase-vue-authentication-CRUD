<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <router-link to="/" class="navbar-brand">Employee Manager</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li v-if="isLoggedIn"><span class="badge badge-pill badge-light email">{{ currentUser }}</span></li>
        <li class="nav-item" v-if="isLoggedIn">
          <router-link class="nav-link" to="/">Dashboard</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
           <button class="btn btn btn-light btn-outline-light my-2 my-sm-0" @click="logout">Logout</button>
        </li>
      </ul>
    </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name:'navbar',
  data(){
    return{
      isLoggedIn: false,
      currentUser: false
    }
  },
  created() {
    if(firebase.auth().currentUser){
      this.isLoggedIn = true;
      this.currentUser  = firebase.auth().currentUser.email;
    }
  },
  methods:{
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.go({path: this.$router.path});
      });
    }
  }
}
</script>

<style scoped>
.email{
  padding-top: 5px;
}
</style>
