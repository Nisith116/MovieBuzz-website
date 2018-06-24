$(document).ready(function(){

  getData();
});

let getData = function(){
  let counter=0,i=1;

// Navigation Dropdown
  $("#navbarDropdownMenuLink").click(function(){
    i++
    if(i % 2 == 0){
      $(".dropdown-menu1").css("display","block")
    }else{
      $(".dropdown-menu1").css("display","none")
      i=1
    }

  })

  $(window).click(function () {
    $(".dropdown-menu1").css("display","none")
    i=1
  })

  $(".date").hide()
  let value,website,website1,website2,website3,Year,flag1=false,flag2=false,flag3=false;

  $('#year').click(function() {
    $("#btnGroupDrop1").html("Year")
    $(".date").show();
    flag1=true

  })

  $('#title').click(function() {
    flag3=true
    $("#btnGroupDrop1").html("Title")
    $(".date").hide()
    flag1=false
    flag2=false

  })
  $('#ImdbId').click(function() {
    flag2=true
    $("#btnGroupDrop1").html("Imdb Id")
    $(".date").hide()
    flag1=false
    flag3=false
  })


// Measuring the window width
  $(window).resize(function() {

  if($(window).width() < 1000){

   $(".post").css("width","90%")
   $(".top-card").removeClass("flex-row")
   $(".top-card").addClass("flex-column")

  }else{

  $(".post").css("width","55%")
  $(".top-card").removeClass("flex-column")
  $(".top-card").addClass("flex-row")
  }

  })

// Fetching data from API and displaying it
  $("#submit").click(function(){
  counter++
  value = $("#search").val()
  Year = $('.date').find('input[name="YearOfTitle"]').val();

  website1 = "http://www.omdbapi.com/?t=" + value + "&apikey=67e9255a"
  website2 = "http://www.omdbapi.com/?i=" + value + "&apikey=67e9255a"
  website3 = "http://www.omdbapi.com/?t=" + value + "&y=" + Year  + "&apikey=67e9255a"

  if(flag1){
    website=website3
  }else if(flag2){
    website=website2
  }else if(flag3){
    website=website1
  }else{
    website=website1
  }




  $(".slides").hide()
  $(".slides").css("border","none")


  $.ajax({
    type: 'GET',
    dataType: 'JSON',
    url:website,
    success: (data) => {
      poster = (data.Poster)?data.Poster:"default.jpg"
      Title = (data.Title)?data.Title:"Not Available"
      Year = data.Year?data.Year:"Not Available"
      Released = data.Released?data.Released:"Not Available"
      Runtime = data.Runtime?data.Runtime:"Not Available"
      Genre = data.Genre?data.Genre:"Not Available"
      Director = data.Director?data.Director:"Not Available"
      Actors = data.Actors?data.Actors:"Not Available"
      Plot = data.Plot?data.Plot:"Not Available"
      Ratings = data.imdbRating?data.imdbRating:"Not Available"
      Votes = data.imdbVotes?data.imdbVotes:"Not Available"

     let display = `<div class="card" style="width: 24rem;border:2px solid #ada6a6">
  <img class="card-img-top" src=${poster} alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Title: ${Title}</h5>
    <p class="card-text">Plot: ${Plot}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Year: ${Year}</li>
    <li class="list-group-item">Released: ${Released}</li>
    <li class="list-group-item">Runtime: ${Runtime}</li>
    <li class="list-group-item">Ratings: ${Ratings}</li>
    <li class="list-group-item">Votes: ${Votes}</li>
    <li class="list-group-item">Director: ${Director}</li>
    <li class="list-group-item">Actors: ${Actors}</li>

  </ul>
</div>`

      if(counter>1){
        $(".post").empty();
      }
      $(".trending").hide()
      $(".post").append(display)



},

error: (data) => {
  alert("error have occured")
},
timeout:3000
  })
  })
}
