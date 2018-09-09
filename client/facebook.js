window.fbAsyncInit = function () {
  FB.init({
    appId: '565817517185345',
    cookie: true,
    xfbml: true,
    version: 'v3.1'
  });
  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function checkLoginState() {
  FB.getLoginStatus(function (response) {
    $.ajax({
      url: `http://localhost:3000/fb-login`,
      method: "POST",
      data: {
        token: response.authResponse.accessToken
      }
    })
      .done(response => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', response.email);
        localStorage.setItem('id', response.id);
        location.reload();
      })
      .fail(err => {
        console.log(err);
      })
  });
}