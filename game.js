var gamePattern = [];
var userClickedPattern=[];

var buttonColours = ["red","blue","green","yellow"];
//track for started or not 
var started= false;

//start at level 0 
var level = 0;

//keyboard has been pressed
$(document).keypress(function(){
    if(!started){
        //suru ma press a key bhanerw aaua , tespaxi level 0 bhayerw aaunu parxa updated way ma 
        $("#level-title").text("Level "+ level);
        nextSequence(); 
        started = true;
    }
    
});

//click bhayo bhane kun click bhayo check +sound ko lagi 
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour); 
 
    $( "#"+ userChosenColour ).delay(100).fadeOut().fadeIn('slow');
    //button ma sound haleko 
    // var sound =new Audio(src="sounds/"+ userChosenColour+".mp3");
    // sound.play();
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
 });

function nextSequence(){
    //next step ko lagi previous value remove and add new values 
    userClickedPattern= [];

    level++;
    //ek patak game ma paseh paxi harek palo ko level change garna ko lagi 
    $("#level-title").text("Level "+ level);
    
   var randomNumber = Math.floor(Math.random()*4);

   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   //button lai select gareko + flash hunne feature rakheko 
   $( "#"+ randomChosenColour ).delay(100).fadeOut().fadeIn('slow');
   //button ma sound haleko 
//    var sound =new Audio(src="sounds/"+ randomChosenColour+".mp3");
//    sound.play();
    playSound(randomChosenColour);

    
}

function checkAnswer(currentLevel){
    //array compair garda array ko naam matra haina value ni garne simple but dont miss!!!
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("success");
        //sequene cahi mileko xa ki nai ? mileko xa bhane next level ma jane 
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else   
    {
        console.log("wrong");
        playSound("wrong");
        $('body').addClass("game-over");

        //class remove gareko 
        setTimeout(function () {
          $("#" + currentColour).removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart ");

        startOver();
       
    }

    
}

function startOver(){
    level = 0;
    gamePattern=[];
    started = false;
}

function playSound(name){
    var sound =new Audio(src="sounds/"+ name+".mp3");
   sound.play();
}

function animatePress(currentColour){
    //class add gareko 
    $("#" + currentColour).addClass("pressed");

    //class remove gareko 
    setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
}
