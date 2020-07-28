
var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).on("keypress", function(){
  //alert("aila jaadu?");
  if (!started){
    $("h1").text("level " + level);
    nextSequence();
    started = true;
  }
});

//var randomChosenColors = buttonColors[nextSequence()];

//console.log(randomChosenColors);

//gamePattern.push(randomChosenColors);

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //console.log(userClickedPattern);
  playSound(userChosenColor);
  animation(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function animation(colorChosen){
  $("#" + colorChosen).addClass("pressed");
  setTimeout(function(){
    $("#" + colorChosen).removeClass("pressed")
  }, 100);
}

function playSound(name){
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    if(userClickedPattern.length == gamePattern.length){
      //console.log("Success");
      setTimeout(function(){
        nextSequence();
      },500);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, press any key to restart!");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },250);
    //console.log("Failure");
    startOver();
  }
}
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
