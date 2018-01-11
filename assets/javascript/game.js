//--Objects--//
$(document).ready(function() {
	var characters = {
		"Alien": {
			name:"Alien",
			health:150,
			attack:14,
			imageUrl: "assets/images/alien_xenomorph.jpg",
			counterAttack: 10

		},
		"Predator": {
			name:"Predator",
			health:125,
			attack:14,
			imageUrl: "assets/images/predator.jpg",
			counterAttack: 10

		},
		"Queen": {
			name:"Queen",
			health:150,
			attack:14,
			imageUrl: "assets/images/queen_alien.jpg",
			counterAttack: 10
		},
		"Colonial Marine": {
			name:"Colonial Marine",
			health:150,
			attack:14,
			imageUrl: "assets/images/colonial marine.jpg",
			counterAttack: 10

		}


	};
console.log(characters);



//Global Varabiles//

var currPlayer;
var currEnemy;
var combatants = [];



//Functions//
var renderOne = function(character, renderArea, makeChar) {
// character: obj; renderArea: class/id; makeChar: string
	var charDiv = $("<div class='character' data-name='" + character.name + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    var charHealth = $("<div class='character-health'>").text(character.health);
    charDiv.append(charName).append(charImage).append(charHealth);
 	$(renderArea).append(charDiv)

};
// Function to render characters to designated area
var renderCharacters = function(charObj,areaRender) {
	if (areaRender === '#character-section') {
		 $(areaRender).empty();
      		for (var key in charObj) {
        		if (charObj.hasOwnProperty(key)) {
         		 renderOne(charObj[key], areaRender, '');
       			 }
     		 }
    	}

    	if (areaRender === "#selected-character-section") {
 		renderOne(charObj,areaRender);
		}
		//loop through characters and place them to enemy to fight area
		if (areaRender === "#enemy-to-fight"){
			for(var i=0;i<charObj.length;i++){
				renderOne(charObj[i],areaRender)

			}
 	
 		}
	}


//Render all characters to the page//
renderCharacters(characters, "#character-section");


// Mouse over graphic
$(document).on({
		mouseenter: function(){
			var selector = $(this).css('background-color', '#1d2');
	

		},
		mouseleave: function(){
			var selector = $(this).css('background-color', '#abc')

			
		}
	}, '.character');

// Selecting a Character on click
$(document).on("click", ".character", function() {
	// assigning the selected characters name
	var name = $(this).attr("data-name");
	//If players character has not been chosen
	if(!currPlayer){
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
		renderCharacters(currPlayer , "#selected-character-section")
		//Render remaining characters in enemy to fight section
		renderCharacters(combatants, "#enemy-to-fight")
		}

	})



});


