var firebaseConfig = {
      apiKey: "AIzaSyDsgmyAMgerbYASZMJw0I4nx0csRBtQr8c",
      authDomain: "kwitter-444a6.firebaseapp.com",
      databaseURL: "https://kwitter-444a6-default-rtdb.firebaseio.com",
      projectId: "kwitter-444a6",
      storageBucket: "kwitter-444a6.appspot.com",
      messagingSenderId: "754004560688",
      appId: "1:754004560688:web:90dc134396ec93326256f5"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

var user_name = localStorage.getItem("User Name");
document.getElementById("user-name").innerHTML = " Welcome " +  user_name  + " ! ";

function add_room() {
      roomname = document.getElementById("roomname").value;
      console.log(roomname);
      firebase.database().ref("/").child(roomname).update({
            purpose:"Adding room name"
      });
      localStorage.setItem("Room Name", roomname);
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function(snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;

                  console.log(Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;

            });
      });
}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("Room Name", name);
      window.location = "kwitter_page.html";

}

function logout() {
      localStorage.removeItem("Room Name");
      localStorage.removeItem("User Name");
      window.location = "index.html";
}