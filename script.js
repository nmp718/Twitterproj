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

let toggleLike = (tweetRef, uid)=> {
  tweetRef.transaction((tObj) => {
    console.log(tObj);
    if (tObj) {
      if(tObj.likes && tObj.liked_by_user && tObj.liked_by_user.hasOwnProperty(uid)){
        tObj.likes--;
        tObj.liked_by_user[uid] = null;
      } else {
        tObj.likes++;
        if (!tObj.liked_by_user) {
          tObj.liked_by_user = {};
        }
        tObj.liked_by_user[uid] = true;
      }
    }
    return tObj;
  });
}

let toggleDislike = (tweetRef, uid)=> {
  tweetRef.transaction((tObj) => {
    console.log(tObj);
    if (tObj) {
      if (tObj.dislikes && tObj.disliked_by_user && tObj.disliked_by_user.hasOwnProperty(uid)) {
        tObj.dislikes--;
        tObj.disliked_by_user[uid] = null;
      } else {
        tObj.dislikes++;
        if (!tObj.disliked_by_user) {
          tObj.disliked_by_user = {};
        }
        tObj.disliked_by_user[uid] = true;
      }
    }
    return tObj;
  });
}


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
firebase.auth().onAuthStateChanged(user => {
  //alert("Does this fire even at page load?")
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    
    console.log(user);
    var uid = user.uid;
    console.log(user.uid);

    $("#tweetcardsid").removeClass("d-none");
    $("#tweetboxid").removeClass("d-none");
    $("#loginbutton").addClass("d-none");
    $("#logoutbutton").removeClass("d-none"); 
    //renderPage(user);
    // ...
  } else {
    $("#loginbutton").removeClass("d-none");
    $("#tweetcardsid").addClass("d-none");
    $("#tweetboxid").addClass("d-none");
    $("#logoutbutton").addClass("d-none"); 
    //renderLogin();
    // User is signed out
    // ...
  }
});

// login page stuff
/* let renderLogin = ()=>{
  $("body").html(`
  <h1 id="title" class="title">Welcome to Yinzer!</h1>
  <h2 id="subtitle" class="title"> The best place for Yinzers to say Tomlin should be fired, Devin bush is bad, and all around complaining about the Steelers</h2>
  <!--<input id="newtitle" placeholder="Make your new title here">-->
  <div class="d-flex justify-content-center mb-5 mt-5">
  <button type="button" class="btn btn-primary" id="loginbutton"> Log into Yinzer! </button></div>
  
  <script src='https://www.gstatic.com/firebasejs/9.9.4/firebase-app-compat.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.1/js/bootstrap.min.js'></script>
    <script src='https://www.gstatic.com/firebasejs/9.9.4/firebase-auth-compat.js'></script>
    <script src='https://www.gstatic.com/firebasejs/9.9.4/firebase-database-compat.js'></script> 
    <script src='script.js'></script>
    <link rel="stylesheet" href="style.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/css/bootstrap.min.css"/>
  `);

  $("#loginbutton").on("click", ()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    });
}

//regular page stuff
let renderPage = ()=>{
  firebase.initializeApp(firebaseConfig);
  $("body").html(`
  <div class="container mb-5">
        <div class="row">
          <div class="col-6">
            <input type="text" class="form-control" id="message" placeholder="Put message here!">
          </div>
          <div class="col-2">
            <button type="button" class="btn btn-warning" id="sendtweet">send tweet</button>
          </div>
        </div>
      </div>
    
    
    
    
    
    <div class="container text-center">
        <div class="row">
          <div class="col">
            First in DOM, ordered last
          </div>
          <div class="col-6">
            <div id="alltweets" class="allthetweets"></div>
          </div>
          <div class="col">
            Third in DOM, ordered first
          </div>
        </div>
      </div>
    </body>

    <button type="button" class="btn btn-primary" id="logoutbutton"> Log out </button>
    
    <script src='https://www.gstatic.com/firebasejs/9.9.4/firebase-app-compat.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.1/js/bootstrap.min.js'></script>
    <script src='https://www.gstatic.com/firebasejs/9.9.4/firebase-auth-compat.js'></script>
    <script src='https://www.gstatic.com/firebasejs/9.9.4/firebase-database-compat.js'></script> 
    <script src='script.js'></script>
    <link rel="stylesheet" href="style.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/css/bootstrap.min.css"/>`);

    let renderTweet = (tObj)=>{
      $("#alltweets").prepend(`
      <div class="card mb-3 tweet" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4 mt-5">
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

  //logout logic goes here
$("#logoutbutton").on("click", ()=>{
  firebase.auth().signOut();
})
} */


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

let renderTweet = (tObj,uuid)=>{
  $("#alltweets").prepend(`
  <div class="card mb-3 tweet" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4 mt-5">
      <img src="${tObj.author.pic}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${tObj.author.handle}</h5>
        <p class="card-text">${tObj.content}</p>
        <p class="card-text"><small class="text-muted">Tweeted at ${new Date(tObj.timestamp).toLocaleString()}</small></p>
        <a href="#" class="btn btn-success likebutton" data-tweetid="${uuid}">${tObj.likes} Likes</a>
        <a href="#" class="btn btn-danger dislikebutton"data-tweetid="${uuid}">${tObj.dislikes} Dislikes</a>
        <a href="#" class="btn btn-dark deletebutton">Delete Tweet</a>
      </div>
    </div>
  </div>
</div>
  `);
  renderedTweetLikeLookup[uuid] = tObj.likes;
  firebase.database().ref("/tweets").child(uuid).child("likes").on("value", ss=>{
    renderedTweetLikeLookup[uuid]= ss.val();
    $(`.likebutton[data-tweetid=${uuid}]`).html(`${renderedTweetLikeLookup[uuid]} Likes`);
    console.log(renderedTweetLikeLookup[uuid]);
  })

  renderedTweetDislikeLookup[uuid] = tObj.dislikes;
  firebase.database().ref("/tweets").child(uuid).child("dislikes").on("value", ss=>{
    renderedTweetDislikeLookup[uuid]= ss.val();
    $(`.dislikebutton[data-tweetid=${uuid}]`).html(`${renderedTweetDislikeLookup[uuid]} Dislikes`);
    console.log(renderedTweetDislikeLookup[uuid]);
  })
  
}

//tweet printing logic
let tweetref = firebase.database().ref("/tweets");

//logic for like addition
let renderedTweetLikeLookup = {};
let renderedTweetDislikeLookup = {};

tweetref.on("child_added", (ss)=>{    
  const user = firebase.auth().currentUser; 
  let tObj = ss.val();
  let uuid = ss.key;            //this is the tweet id
  renderTweet(tObj,uuid);
  $(".likebutton").off("click");
  $(".likebutton").on("click", (evt)=>{
  let clickedTweet = $(evt.currentTarget).attr("data-tweetid");
  //alert(clickedTweet);
  let likeCount = renderedTweetLikeLookup[clickedTweet];
  //console.log(likeCount);
  let tweetRef = firebase.database().ref("/tweets").child(clickedTweet);
  toggleLike(tweetRef, user.uid);

  });
  $(".deletebutton").off("click");
  $(".deletebutton").on("click", (evt)=>{
    let clickedTweet = $(evt.currentTarget).attr("data-tweetid");
    let tweetRef = firebase.database().ref("/tweets").child(clickedTweet);
    rtdb.remove(tweetRef);

  }); 
  $(".dislikebutton").off("click");
  $(".dislikebutton").on("click", (evt)=>{
  let clickedTweet = $(evt.currentTarget).attr("data-tweetid");
  //alert(clickedTweet);
  let likeCount = renderedTweetLikeLookup[clickedTweet];
  //console.log(likeCount);
  let tweetRef = firebase.database().ref("/tweets").child(clickedTweet);
  toggleDislike(tweetRef, user.uid);

  });
  
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
        dislikes: 0,
        timestamp: new Date().getTime()
        
      }
     
      let newtweetref =  tweetref.push();
      newtweetref.set( tweetinfo);
      
      //what should I do with tweetinfo?
      const messageInput = document.getElementById('message');
      messageInput.value='';
      
      // trying to clear the input above this
      })

 //login logic

$("#loginbutton").on("click", ()=>{         //when login button is clicked, make tweets, tweet box, and logout button visible
  $("#tweetcardsid").removeClass("d-none");
  $("#tweetboxid").removeClass("d-none");
  $("#loginbutton").addClass("d-none");
  $("#logoutbutton").removeClass("d-none");
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithRedirect(provider);

}); 

//logout logic goes here
$("#logoutbutton").on("click", ()=>{
  $("#loginbutton").removeClass("d-none");
  $("#tweetcardsid").addClass("d-none");
  $("#tweetboxid").addClass("d-none");
  $("#logoutbutton").addClass("d-none");

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
