if (localStorage.getItem("uid") === null) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //do nothing
    } else {
      // No user is signed in.
      window.location.replace("logIn.html")
    }
  });
}

document.getElementById("display-name").innerHTML = localStorage.getItem("displayName")
document.getElementById("display-email").innerHTML = localStorage.getItem("email")
document.getElementById("display-email").setAttribute("style", "font-size:10")





const logOut = () => {

  localStorage.removeItem("uid");
  localStorage.removeItem("displayName");
  localStorage.removeItem("email");
  firebase.auth().signOut();
  window.location.replace("logIn.html")

}




