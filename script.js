 // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD1SZ4I4KXOLSm66bEWR_TiJU64MrnxzXk",
    authDomain: "project-bravo-5eac0.firebaseapp.com",
    databaseURL: "https://project-bravo-5eac0-default-rtdb.firebaseio.com",
    projectId: "project-bravo-5eac0",
    storageBucket: "project-bravo-5eac0.appspot.com",
    messagingSenderId: "970915401283",
    appId: "1:970915401283:web:7e591f9a2af27404984ef6"
  };

firebase.initializeApp(firebaseConfig);
let titleRef = firebase.database().ref("/title");

// there is an alternative to set called update, 

let rosterRef = firebase.database().ref("/roster");

$("#sendit").on("click", ()=>{
      var thename = $("#addme").val();
      var person = {
        name: thename
      }
      
      let newPersonRef = rosterRef.push();
      newPersonRef.set(person);
      
      })


//var provider = new firebase.auth.GoogleAuthProvider();
//firebase.auth().signInWithPopup(provider);

rosterRef.on("value", ss=>{
  let rosterObj = ss.val();
  //alert(JSON.stringify(rosterObj));
  $("#roster").html('');
  let theIDs = Object.keys(rosterObj);
  
  theIDs.map(anID=>{
    let thePlayer = rosterObj[anID];
    $("#roster").append(`<div>${thePlayer.name}</div>`);
  });
});

$("#nukes").on('click', ()=>{
  rosterRef.remove();
})

//if signed in logic goes here
firebase.auth().onAuthStateChanged((user) => {
  //alert("Does this fire even at page load?")
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    
    console.log(user.displayname);
    var uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});


/*let tweetJSON = {
  "content": "Let Kenny play!!!!",
  "likes": -1,
  "retweets": 50,
  "timestamp": 1663545820543,
  "author": {
    "handle": "Yinzer123",
    "pic": "https://i.pinimg.com/originals/55/95/de/5595de1fb1e8c14305ab77f9c09ac05d.jpg"
  }
};*/

let renderTweet = (tObj)=>{
  $("#alltweets").prepend(`
  <div class="card mb-3 tweet" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${tObj.author.pic}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${tObj.author.handle}</h5>
        <p class="card-text">${tObj.content}</p>
        <p class="card-text"><small class="text-muted">Tweeted at ${new Date(tObj.timestamp).toLocaleString()}</small></p>
        <a href="#" class="btn btn-success">${tObj.likes} Likes</a>
        <a href="#" class="btn btn-danger">TEMP Dislikes</a>
        <a href="#" class="btn btn-dark">Delete Tweet</a>
      </div>
    </div>
  </div>
</div>
  `);
  
}

//tweet printing logic
let tweetref = firebase.database().ref("/tweets");

tweetref.on("child_added", (ss)=>{     
  let tObj = ss.val();
  renderTweet(tObj);      
  //$(".tweet").on("click", (evt)=>{
  //alert("clicked");
  //alert(JSON.stringify());          //this alert is coming up as undefined for some reason
//}
                 //);

//renderTweet(tweetJSON);
//renderTweet(tweetJSON);

})

//tweet sending logic
$("#sendtweet").on("click", ()=>{
      var userinfo=firebase.auth().currentUser;
      var tweetmessage = $("#message").val();
      var tweetinfo = {
        author: {
          handle: userinfo.displayName,
          pic: userinfo.photoURL
        },
        content: tweetmessage,
        likes: 0,
        retweets: 0,
        timestamp: new Date().getTime()
        
      }
     
      let newtweetref =  tweetref.push();
      newtweetref.set( tweetinfo);
      
      //what should I do with tweetinfo?
      })

//login logic

$("#loginbutton").on("click", ()=>{
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider);
});

//logout logic goes here
$("#logoutbutton").on("click", ()=>{
  firebase.auth().signOut();
})



//THE KEY AUTH LISTENING FUNCTION IS THIS ONE:
/*
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

//THE KEY SIGNOUT IS THIS:
firebase.auth().signOut();*/
