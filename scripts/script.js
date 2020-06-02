// 0 = North  1 = East  2 = South  = 3 West
$(document).ready(function(){
    // level will track number of turns
    let level = 1;
    let timer = 60;

    const reset = function(startingTime){
        countdownFunction()
        level = 1;
        timer = startingTime;
        $(".turns").html("")
        startingValue = createStartingValue()
        startingDirection = translateToDirection(startingValue);
        $(".startingDirection").html(startingDirection);
        turnValue = createTurns(level);
        answer = findAnswer(startingValue, turnValue);
        $(".gameOver").addClass("hidden");
        $('.time').html(`${timer}`);
        document.getElementById("backgroundMusic").play();
    }

    $(".play").on("click", function(){
        //Removing Instructions Section
        $(".howToPlay").remove();
        //Showing Game Section
        $(".game").toggleClass("hidden");
        
        
        //RESETING DEFAULT VALUES
        reset(60);
    })

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


    const createTurns = function(level){
        //turnValue creates a number that we can combine with the starting value and then % 4 to return the correct ending direction
        let turnValue = 0
        // turnWord will add the turns to the DOM so the player can read them as left or right
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

    const findAnswer = function(startingValue, TurnValue){
        return ((startingValue + TurnValue) % 4)
    }
    let answer = findAnswer(startingValue, turnValue);

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


        console.log(`Cheat: ${translateToDirection(answer)}`);
    })

    const gameOver = function(score){
        $(".game").addClass("hidden")
        $(".score").html(score)
        document.getElementById("backgroundMusic").pause();
        document.getElementById("gameOver").play();
        $(".gameOver").removeClass("hidden")
    }

    //TIMER 
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



})