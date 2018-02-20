<template lang="html">
    <form class="form-signin">
        <h4 class="form-signin-heading">Please sign in</h4>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" v-model="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button @click="login" class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
      </form>
</template>

<script>
import firebase from 'firebase';

export default {
  name:'login',
  data: function(){
    return{
        email:'',
        password: ''
    };
  },
  methods:{
    login: function(e){
      firebase.auth()
      .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
          alert(`You are Logged in as ${user.email}`)
          this.$router.go({path: this.$router.path});
          }, err => {
          alert(err.message);
        })
      e.preventDefault();
    }
  }
}
</script>

<style lang="css">

.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
/*
(function () {
  'use strict'

  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    )
    document.head.appendChild(msViewportStyle)
  }

}())
*/
</style>
