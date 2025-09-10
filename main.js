var nav = document.getElementById("nav"); 
var main=document.querySelector('.main');
var first = document.querySelector('.first');
var second = document.querySelector('.second');
var clse = document.querySelector('.close');

var Now = document.getElementById("Now"); 
var Popular = document.getElementById("Popular");
var Top = document.getElementById("Top");
var Trending = document.getElementById("Trending");
var Upcoming = document.getElementById("Upcoming");
var Contact = document.getElementById("Contact");

var form = document.getElementById("form");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirmPassword");
var msg = document.getElementById("msg");

var search=document.getElementById("search");
var byword=document.getElementById("byword");

var currentCategory = "popular";


const ky="b5b91d02b6d6a6241a89c29344cb6451";
//nav
main.addEventListener("click", function() {
 
    
        second.style.display = "flex";
        first.style.display = "none";
        
       
    

});
clse.addEventListener("click", function() {
        second.style.display = "none";
        first.style.display = "flex";
       

});

//display
var allItems = [];
function getMovies(category) {
    var MyHttp = new XMLHttpRequest();
    MyHttp.open("GET", `https://api.themoviedb.org/3/movie/${category}?api_key=${ky}`);
    MyHttp.send();
    MyHttp.addEventListener("readystatechange", function () {
    if (MyHttp.readyState == 4) {
   allItems = JSON.parse(MyHttp.response).results;

    
    display(allItems);
    }
    });
}

function display( allItems) {
    var cartona = "";
    for (var i = 0; i < allItems.length; i++) {
    cartona += `
   
    <div class="col-md-4 mb-5 ps-4 pe-4 par ">
   
   <img src="https://image.tmdb.org/t/p/w500${allItems[i].poster_path}" class=" img-fluid" alt="${allItems[i].title}" />
     <div class="layer">
    <h4>+'${allItems[i].original_title}'+</h4>
    <p>"${allItems[i].overview}"</p>
    <p>"rate:${allItems[i].vote_average}"</p>
    <p>"${allItems[i].release_date}"</p>
  </div>
    </div>`;
    }
    document.querySelector(".row").innerHTML = cartona;
  }

    Now.addEventListener("click", function () {
  getMovies("now_playing");
  window.scrollTo({ top: 0, behavior: 'smooth' });
  currentCategory = "now_playing";
});

Popular.addEventListener("click", function () {
  getMovies("popular");
  window.scrollTo({ top: 0, behavior: 'smooth' });
  currentCategory = "popular";
});

Top.addEventListener("click", function () {
  getMovies("top_rated");
  window.scrollTo({ top: 0, behavior: 'smooth' });
    currentCategory = "top_rated";
});

Trending.addEventListener("click", function () {
  getMovies("trending");
  window.scrollTo({ top: 0, behavior: 'smooth' });
   currentCategory = "trending";
});

Upcoming.addEventListener("click", function () {
  getMovies("upcoming");
     currentCategory = "upcoming";
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
Contact.addEventListener("click", function () {
  
  window.scrollTo({ 
    top: document.body.scrollHeight, 
    behavior: 'smooth' 
  });
});

form.addEventListener("submit", function(e) {
  if (password.value === confirmPassword.value) {
    msg.innerHTML = " Passwords match!";
    msg.style.color = "green";
    
  } else {
    e.preventDefault();
    msg.innerHTML = " Passwords do not match!";
    msg.style.color = "red";
  }
});
//byword

byword.addEventListener("keyup", function() {
    var term = byword.value; 
   if (term.length === 0) {
      
        getMovies("popular"); 
        return;
    }
    var MyHttp = new XMLHttpRequest();
    MyHttp.open("GET", `https://api.themoviedb.org/3/search/movie?api_key=${ky}&query=${term}`);
       MyHttp.send();

    MyHttp.addEventListener("readystatechange", function () {
        if (MyHttp.readyState === 4 ) {
            var Container = JSON.parse(MyHttp.response).results;
            display(Container); }
    });
});

//search

search.addEventListener("keyup", function() {
    var term = search.value.trim(); 
   
    if (term.length === 0) {
        getMovies("popular"); 
        return;
    }

    var Container = [];
    for (var i = 0; i < allItems.length; i++) {
        if (allItems[i].original_title.toLowerCase().includes(term.toLowerCase())) {
            Container.push(allItems[i]);
        }
    }

    display(Container);
});


        
        




 getMovies("popular");