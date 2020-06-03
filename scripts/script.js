    // level will track number of turns
    let level = 1;
    let timer = $('input[name=gameLength]').val();
    let userVolume = $('input[name=volume]').val() / 100

    //This function is just housekeeping and reseting values.
    const reset = function(){
        countdownFunction()
        level = 1;
        timer = $('input[name=gameLength]').val();
        $(".turns").html("")
        startingValue = createStartingValue()
        startingDirection = translateToDirection(startingValue);
        $(".startingDirection").html(startingDirection);
        turnValue = createTurns(level);
        answer = findAnswer(startingValue, turnValue);
        $(".gameOver").addClass("hidden");
        $(".settings").addClass("hidden");
        $('.time').html($('input[name=gameLength]').val());
        document.getElementById("backgroundMusic").play();
    }

    //This is a timer function it counts down every second and runs gameOver function when finished
    $(".time").html(`${timer}`);
    const countdownFunction = function(){
        const countdown = setInterval(() => {
            timer--;
            $('.time').html(`${timer}`);
            if (timer <= 0) {
                clearInterval(countdown)
                gameOver(level);
            }
        }, 1000)
    }

    // This function creates a random number between 400-403 to represent starting direction. Starting at 400 to prevent negative numbers while being divisable by 4 for the translate to direction function later.
    const createStartingValue = function(){
        return (Math.floor( Math.random() * 4 )) + 400;  
    }
    let startingValue = createStartingValue()

    //This function translates the number to a cardinal direction based on modulo
    const translateToDirection = function(value){
        let x = value % 4
        if (x == 0){
            return "North"
        }
        else if (x == 1){
            return "East"
        }
        else if (x == 2){
            return "South"
        }
        else if (x == 3){
            return "West"
        }
    }
    let startingDirection = translateToDirection(startingValue);

    //This function creates a number that we can combine with the starting value and then % 4 to return the correct ending direction
    const createTurns = function(level){
        let turnValue = 0
        // turnWord will be added the turns to the DOM so the player can read them as left or right
        let turnWord = ""
        for (let i = 1; i < level; i++){
            //math.random will return 0 or 1
            let x = Math.round(Math.random())
                //this turns the 0 into a -1
                if (x == 0){
                    x = -1
                    turnWord = "Left "
                }
                else {
                    turnWord = "Right "
                }
            turnValue = turnValue + x
            $(".turns").append(`${turnWord}`)
        }
        return turnValue
    }
    let turnValue = createTurns(level);

    //This function returns a value between 0-3 that is comparable to the values of the radio buttons (the correct answer in the game)
    const findAnswer = function(startingValue, TurnValue){
        return ((startingValue + TurnValue) % 4)
    }
    let answer = findAnswer(startingValue, turnValue);

    //This function hides the game and brings up the gameOver screen
    const gameOver = function(score){
        $(".game").addClass("hidden")
        $(".score").html(score)
        document.getElementById("backgroundMusic").pause();
        document.getElementById("gameOver").play();
        $(".gameOver").removeClass("hidden")
    }



$(document).ready(function(){

    $(".play").on("click", function(){
        //Removing Instructions Section
        $(".howToPlay").remove();
        //Showing Game Section
        $(".game").toggleClass("hidden");
        //RESETING DEFAULT VALUES
        reset();

        //Adjusting volume of all elements
        document.getElementById("incorrect").volume = userVolume 
        document.getElementById("correct").volume = userVolume
        document.getElementById("backgroundMusic").volume = userVolume
        console.log(userVolume) 
    })

    $(".submit").on("click", function(){
        let userAnswer = ($('input[name=answer]:checked').val())
        if (answer == userAnswer){
            level++
            document.getElementById("correct").play();
            $(".dadYelling").html("duh!")
        }else {
            timer = timer - 5
            document.getElementById("incorrect").play();
            $(".dadYelling").html(`It was ${translateToDirection(answer)}...`)
        }
        // Clears turns and re-randomizes
        $(".turns").html("")
        startingValue = createStartingValue()
        // This is storing the direction associated with starting value to the startingDirection variable and adjusting the DOM so the player can read it 
        startingDirection = translateToDirection(startingValue);
        $(".startingDirection").html(startingDirection);
        turnValue = createTurns(level);
        answer = findAnswer(startingValue, turnValue);

        //THIS IS LEFT IN SO THAT WE CAN CHEAT AS THE GAME IS ACTUALLY QUITE DIFFICULT!
        console.log(`Cheater's answer: ${translateToDirection(answer)}`);
    })

    $(".settingsButton").on("click", function(){
        $(".howToPlay").remove();
        $(".settings").toggleClass("hidden");
        $(".gameOver").addClass("hidden");
    })
})