let user = new Vue({
  el: "#logins",
  data: {
    email: '',
    password: '',
    err: '',
    username1: '',
    password1: '',
    email1: '',
    namamu: '',
    er: '',
    style: {
      color: 'red'
    }
  },

  created: function () {
    if (localStorage.hasOwnProperty('tokenapp')) {
      console.log('ada tokeN')
      window.location.href = 'http://localhost:8080/todo.html'
    }
  },

  methods: {

    loginfb: function () {
      FB.login(function (response) {
        if (response.status == 'connected') {
          let tokc = response.authResponse.accessToken
          localStorage.setItem("fbtoken", tokc);
          console.log(tokc)
          testAPI();
          console.log('masuk gak nih tes api')
          // Logged into your app and Facebook.
          console.log('login')
        } else {
          console.log('logoout')
          // The person is not logged into this app or we are unable to tell.
        }
      });

    },
    loginact: function () {
      console.log('login')
      axios({
          method: 'post',
          url: 'http://localhost:3000/users/login',
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(function (loginData) {
          // console.log(loginData)
          console.log('sukses')
          if (loginData.data == 'pass/username salah') {
            user.err = 'pass/username salah'
          } else {
            user.err = ''
            let token = loginData.data.token
            localStorage.setItem('tokenapp', token)
            window.location.href = 'http://localhost:8080/todo.html'
          }
        })
        .catch(function (err) {
          user.err = err
          console.log(this.err)
          console.log(err)
        })
    }, //end of loginAct
    registeract: function () {
      axios({
          method: 'post',
          url: 'http://localhost:3000/users/signup',
          data: {
            username: this.username1,
            password: this.password1,
            email: this.email1
          }
        })
        .then(function (dataRegister) {

          console.log(typeof dataRegister.data.message)
          let token = dataRegister.data.token

          if (dataRegister.data.message !== undefined) {
            user.er = dataRegister.data.message

          } else {
            localStorage.setItem('tokenapp', token)
            window.location.reload();
          }


          // window.location.reload();
        })
        .catch(function (err) {
          console.log(err)
        })
    }

  }
})
