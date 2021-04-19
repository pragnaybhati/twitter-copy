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

username = localStorage.getItem("User Name");
roomname = localStorage.getItem("Room Name");

function send() {
    message = document.getElementById("msg").value;
    firebase.database().ref(roomname).push({
        name: username,
        message: message,
        like: 0
    });
    document.getElementById("msg").innerHTML = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;

                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });

}
getData();

function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}