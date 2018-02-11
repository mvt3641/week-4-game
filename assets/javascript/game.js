//--Objects--//
$(document).ready(function() {
  var characters = {
    "Alien": {
      name: "Alien",
      health: 150,
      attack: 14,
      imageUrl: "assets/images/alien_xenomorph.jpg",
      counterAttack: 10

    },
    "Predator": {
      name: "Predator",
      health: 125,
      attack: 14,
      imageUrl: "assets/images/predator.jpg",
      counterAttack: 10

    },
    "Queen": {
      name: "Queen",
      health: 150,
      attack: 14,
      imageUrl: "assets/images/queen_alien.jpg",
      counterAttack: 10
    },
    "Colonial Marine": {
      name: "Colonial Marine",
      health: 150,
      attack: 14,
      imageUrl: "assets/images/colonial marine.jpg",
      counterAttack: 10

    }


  };
  console.log(characters);



  //Global Varabiles//

  var currPlayer;
  var currEnemy;
  var combatants = [];
	var turnCounter = 1;
	var killCount = 0;



  //Functions//
  var renderOne = function(character, renderArea, charStatus) {
    // character: obj; renderArea: class/id; makeChar: string
    var charDiv = $("<div class='character' data-name='" + character.name + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    var charHealth = $("<div class='character-health'>").text(character.health);
    charDiv.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(charDiv)

    if (charStatus === "enemy") {
      $(charDiv).addClass("enemy");
    } else if (charStatus === "defender") {
      currEnemy = character;
      $(charDiv).addClass("target-enemy");
    };
  };

// messaging function
var renderMessage = function(message) {

	//buildes message appends to page
	var gameMessageSet = $('#game-status');
	var newMessage = $('<div>').text(message);
	gameMessageSet.append(newMessage);

	if (message === "clearMessage") {
		gameMessageSet.text('');
	}
}

  // Function to render characters to designated area
  var renderCharacters = function(charObj, areaRender) {
    if (areaRender === '#character-section') {
      $(areaRender).empty();
      for (var key in charObj) {
        if (charObj.hasOwnProperty(key)) {
          renderOne(charObj[key], areaRender, '');
        }
      }
    }

    if (areaRender === "#selected-character-section") {
      renderOne(charObj, areaRender, '');
    }
    //loop through characters and place them to enemy to fight area
    if (areaRender === "#enemy-to-fight") {
      for (var i = 0; i < charObj.length; i++) {
        renderOne(charObj[i], areaRender, 'enemy')

      };
      $(document).on('click', '.enemy', function() {
        var name = ($(this).attr('data-name'));

        if ($("#defender").children().length === 0) {
          renderCharacters(name, "#defender");
           $(this).hide();
					 renderMessage("clearMessage");
        };

      });

    };

		if (areaRender === '#defender') {
			$(areaRender).empty();
			for (var i = 0; i < combatants.length; i++) {
				if (combatants[i].name === charObj) {
					renderOne(combatants[i], areaRender, "defender");

				}
			}
		}

		// Re-render defender after Attack
		if(areaRender === "playerDamage"){
			$("#defender").empty();
			renderOne(charObj,"#defender", "defender");

		}

//Rerender player character when attacked
		if (areaRender ==="enemyDamage") {
			$('#selected-character-section').empty();
			renderOne(charObj,'#selected-character-section','');
		}

		// Remove defeated enemy
		if (areaRender ==="enemyDefeated") {
			$('#defender').empty();
			var gameMessageSet = "You have defeated " + charObj.name+"!  You may choose another opponent" ;
				renderMessage(gameMessageSet);
		}

  };

	var restartGame = function(inputEndGame){

		var restart =$('<button>Restart</button>').click(function(){
			location.reload();
		});

		var gameState =$('<div').text(inputEndGame);

		$('body').append(gameState);
		$('body').append(restartGame);

	};

  //Render all characters to the page//
  renderCharacters(characters, "#character-section");


  // Mouse over graphic
  $(document).on({
    mouseenter: function() {
      var selector = $(this).css('background-color', '#1d2');


    },
    mouseleave: function() {
      var selector = $(this).css('background-color', '#abc')


    }
  }, '.character');

  // Selecting a Character on click
  $(document).on("click", ".character", function() {
    // assigning the selected characters name
    var name = $(this).attr("data-name");
    //If players character has not been chosen
    if (!currPlayer) {
      // selected player = current player
      currPlayer = characters[name];
      //loop thorugh rest of characters and push them to combatants array
      for (var key in characters) {
        if (key !== name) {
          combatants.push(characters[key]);
        }
      }

      console.log(combatants);
      //Hide characters that were unselected
      $("#character-section").hide();

      //Render selected player in selected player div
      renderCharacters(currPlayer, "#selected-character-section")
      //Render remaining characters in enemy to fight section
      renderCharacters(combatants, "#enemy-to-fight")
    }

  });

	// When attack button is clicked run the following logic//
$("#attack-button").on('click', function(){

	if($('#defender').children().length !==0){
		currEnemy.health -= (currPlayer.attack * turnCounter);

		if (currPlayer.health >0){

			// show the enemy updated character charDiv
			renderCharacters(currEnemy, "playerDamage");


			// Reduce your health by opponenets atack value
			currPlayer.health -= currEnemy.counterAttack;


			// Render the players updated card
			renderCharacters(currPlayer, "enemyDamage");

			if (currPlayer.heath <=0) {
				renderMessage("clearMessage")
				restartGame("you have been defeated...Game Over Man..")
				$("#attack-button").unbind("click");
			}


		}

		else {

	 	 // Remove enemy player card
	 	 renderCharacters(currEnemy,"enemyDefeated");
	 	 killCount++
	 	 if (killCount >= 3) {
	 		 renderMessage("clearMessage");
	 		 restartGame("You Won!! Game over man!!");

	}


// If the enemy has less than zero health they are defeated
 // else {
 //
	//  // Remove enemy player card
	//  renderCharacters(currEnemy,"enemyDefeated");
	//  killCount++
	//  if (killCount >= 3) {
	// 	 renderMessage("clearMessage");
	// 	 restartGame("You Won!! Game over man!!");

	 }
 }
	turnCounter++;
});


});
