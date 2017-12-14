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

var renderCharacters = function(charObj,areaRender) {
	if (areaRender == '#character-section') {
		 $(areaRender).empty();
      		for (var key in charObj) {
        		if (charObj.hasOwnProperty(key)) {
         		 renderOne(charObj[key], areaRender, '');
       			 }
     		 }
    	}
	}


//Render all characters to the page//
renderCharacters(characters, "#character-section");



$(document).on({
		mouseenter: function(){
			var selector = $(this).css('background-color', '#1d2');
	

		},
		mouseleave: function(){
			var selector = $(this).css('background-color', '#abc')

			
		}
	}, '.character');


/*$(document).on("click", ".character", function() {
	
	var name = $(this).attr("data-name");
	alert(name);

})*/

});


