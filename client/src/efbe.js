// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    if (response.status == 'unknown' && localStorage.getItem('tokenapp') == undefined) {
      // window.location.href = 'http://localhost:8080/reg.html';
    } else {
      let tokc = response.authResponse.accessToken
      localStorage.setItem("fbtoken", tokc);
      console.log(tokc)
      // testAPI();
    }
  } else {
    console.log(response)
    // if (response.status == 'unknown' && localStorage.getItem('tokenapp') == undefined) {
    // }
    // The person is not logged into your app or we are unable to tell.
    // document.getElementById('status').innerHTML = 'Please log ' +
    //   'into this app.';
  }
}

function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
    console.log(response)
  });
}


function logout() {
  localStorage.clear()
  FB.logout(function (response) {
    // user is now logged out
    console.log('out')
    console.log(response)
    window.location.href = 'http://localhost:8080/reg.html';
  });

}

window.fbAsyncInit = function () {
  FB.init({
    appId: '206208146759151',
    cookie: true, // enable cookies to allow the server to access
    // the session
    xfbml: true, // parse social plugins on this page
    version: 'v2.8' // use graph api version 2.8
  });

  // Now that we've initialized the JavaScript SDK, we call
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });

};

// Load the SDK asynchronously
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me?fields=email,name,first_name,last_name', function (response) {
    axios.get('http://localhost:3000/users/login/fb', {
        headers: {
          fbtoken: localStorage.getItem('fbtoken')
        }
      })
      .then(function (datafb) {
        console.log(datafb)
        window.localStorage.setItem("tokenapp", datafb.data.tokenfbnya);
        console.log('token before reload', datafb.data.tokenfbnya)
        window.location = 'todo.html'
        // window.location.reload();
      })
      .catch(function (err) {
        console.log(err)
      })
    console.log('LOGIN entered')
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}
