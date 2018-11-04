var string = ""
var clicks = 0
var playerValue
var gameValue
var checkedValue = document.querySelector('.checked').value
for ( var i = 0; i < document.getElementsByClassName('player-val').length; i++ ) {
	document.getElementsByClassName('player-val')[i].addEventListener('click', function(){
		playerValue = this.value
	})
}
document.querySelector('.player-ok').addEventListener('click', removal)
function removal() {
	var playerNum = document.getElementsByClassName('player')
	if ( playerValue > 3 | playerValue === undefined) {
		document.querySelector('.player-setup').style.display = "none"
		document.querySelector('.game').style.display = "flex"
		document.querySelector('.container').style.opacity = "1"
		playerValue = 4
	}
	if ( playerValue <= 3 ) {
		playerNum[playerValue].remove()
		if (playerNum[playerValue]) {
			removal()
		}
			document.querySelector('.player-setup').style.display = "none"
			document.querySelector('.game').style.display = "flex"
			document.querySelector('.container').style.opacity = "1"
	} 
}
for ( var i = 0; i < document.getElementsByClassName('game-val').length; i++ ) {
	document.getElementsByClassName('game-val')[i].addEventListener('click', function(){
		gameValue = this.value
	})
}
document.querySelector('.game-ok').addEventListener('click', function(){
	for ( var i = 0; i < document.getElementsByClassName('score-number').length; i++ ) {
		document.getElementsByClassName('score-number')[i].setAttribute("data-value", gameValue)
		document.getElementsByClassName('score-number')[i].innerHTML = gameValue
		if ( gameValue === undefined ) {
			document.getElementsByClassName('score-number')[i].setAttribute("data-value", checkedValue)
			document.getElementsByClassName('score-number')[i].innerHTML = checkedValue
			gameValue = checkedValue
		}
	}
	document.querySelector('.game').style.display = "none"
	document.querySelector('.player').classList.add('player-active')
})
for ( var i = 1; i <= 20; i++ ) {
	string += "<span data-value='"+ i +"' class='score-value'>"+ i +"</span>";
}
for ( var i = 0; i < document.getElementsByClassName('player').length; i++ ) {
	document.getElementsByClassName('numbers')[i].insertAdjacentHTML('afterbegin', string)
	document.getElementsByClassName('numbers')[i].insertAdjacentHTML('beforeend', "<span data-value='25' class='score-value'>25</span>")
	document.getElementsByClassName('numbers')[i].addEventListener('click', function(e) {
		var sc = this.parentElement.previousElementSibling.children[0]
		var hits = e.target.getAttribute("data-value")
		var score =  sc.getAttribute("data-value")
		clicks = clicks+1
		if ( clicks == 3 ) {
			this.nextElementSibling.children[2].classList.add('grey')
		}
		if ( sc.getAttribute("data-value") > 0 ) {
			if ( this.classList.contains('double') ) {
			  	sc.setAttribute("data-value", score - hits*2)
				sc.innerHTML = score - hits*2
			}
			if ( this.classList.contains('tripple') ) {
				if ( hits == 25 ) {
					return false
				} else {
			  	sc.setAttribute("data-value", score - hits*3)
				sc.innerHTML = score - hits*3
				}
			}
			if ( !this.classList.contains('double') & !this.classList.contains('tripple') )  {
				sc.setAttribute("data-value", score - hits)
				sc.innerHTML = score - hits
			}
		} else {
			return false
		}
		if ( sc.getAttribute("data-value") < 0 ) {
			sc.setAttribute("data-value", score)
			sc.innerHTML = score
		}
		this.classList.remove('double')
		Array.from(document.getElementsByClassName('x2')).forEach( el => el.classList.remove('active') )
		this.classList.remove('tripple')
		Array.from(document.getElementsByClassName('x3')).forEach( el => el.classList.remove('active') )
		var res = score - sc.getAttribute("data-value")
		if ( res == 0 ) {
			return false
		}
		this.nextElementSibling.nextElementSibling.children[1].insertAdjacentHTML('afterbegin', "<div data-value='"+ res +"' class='last-results'>"+ res +"</div>")
		this.nextElementSibling.nextElementSibling.classList.add('has-scores')
		// if ( sc.getAttribute("data-value") <= 40 ) {
		// 	this.nextElementSibling.children[0].style.color = "red"
		// 	this.nextElementSibling.children[0].style.border = "1px solid red"
		// }
		if ( sc.getAttribute("data-value") == 0 ) {
			this.parentElement.previousElementSibling.children[1].style.display = "block"
			var currentScore = Number(this.parentElement.previousElementSibling.children[1].children[0].innerHTML)
			this.parentElement.previousElementSibling.children[1].children[0].innerHTML = currentScore + 1
			Array.from(document.getElementsByClassName('score-number')).forEach(function(el) {
				el.setAttribute('data-value', gameValue)
				el.innerHTML = gameValue
			})
		}

	})
}
Array.from(document.getElementsByClassName('x2')).forEach(function(el) {
	el.addEventListener('click', function(){
	if ( this.parentElement.previousElementSibling.classList.contains('double') ) {
		this.parentElement.previousElementSibling.classList.remove('double')
	} else 
	this.parentElement.previousElementSibling.classList.add('double')
	if ( this.parentElement.previousElementSibling.classList.contains('tripple') ) {
		this.parentElement.previousElementSibling.classList.remove('tripple')
		this.parentElement.previousElementSibling.classList.add('double')
		this.nextElementSibling.classList.remove('active')
	}
	if ( this.classList.contains('active') ) {
		this.classList.remove('active')
	} else 
	this.classList.add('active')
	})
})
Array.from(document.getElementsByClassName('x3')).forEach(function(el) {
	el.addEventListener('click', function(){
	if ( this.parentElement.previousElementSibling.classList.contains('tripple') ) {
		this.parentElement.previousElementSibling.classList.remove('tripple')
	} else
	this.parentElement.previousElementSibling.classList.add('tripple')
	if ( this.parentElement.previousElementSibling.classList.contains('double') ) {
		this.parentElement.previousElementSibling.classList.remove('double')
		this.parentElement.previousElementSibling.classList.add('tripple')
		this.previousElementSibling.classList.remove('active')
	}
	if ( this.classList.contains('active') ) {
		this.classList.remove('active')
	} else 
	this.classList.add('active')
	})
})
Array.from(document.getElementsByClassName('next')).forEach(function(el, index) {
  el.addEventListener("click", function(){
  	if ( index ==  playerValue - 1) {
  		this.parentElement.parentElement.parentElement.classList.remove('player-active')
  		document.getElementsByClassName('player')[0].classList.add('player-active')
  		this.classList.remove('grey')
  	}
  	 else {
	  	this.parentElement.parentElement.parentElement.classList.remove('player-active')
	  	this.parentElement.parentElement.parentElement.nextElementSibling.classList.add('player-active')
		this.classList.remove('grey')
    }
    clicks = 0
    Array.from(document.querySelectorAll('.x2, .x3')).forEach( el => el.classList.remove('active') )
    Array.from(document.getElementsByClassName('numbers')).forEach( el => el.classList.remove("double", "tripple") )
  })
})
Array.from(document.getElementsByClassName('return-score')).forEach(function(el) {
	 el.addEventListener('click', function(){
	 	if ( this.parentElement.classList.contains('has-scores') ) {
	 		var clicked = parseInt(this.nextElementSibling.children[0].getAttribute("data-value"))
	 		var val = parseInt(this.parentElement.parentElement.previousElementSibling.children[0].getAttribute("data-value"))
	 		this.parentElement.parentElement.previousElementSibling.children[0].setAttribute("data-value", +val + +clicked)
	 		this.parentElement.parentElement.previousElementSibling.children[0].innerHTML = val + clicked
	 		var removal = this.parentNode.children[1].children[0]
	 		removal.parentNode.removeChild(removal)
	 	}
	 	if ( document.getElementsByClassName('last-results').length < 1 ) {
	 		this.parentElement.classList.remove('has-scores')
	 	}
	 })
})
Array.from(document.getElementsByClassName('next')).forEach(function(el, index) {
	el.addEventListener("click", function(){
		var thaIndex = index + 1
		var left = "-" + thaIndex + "00%"
		if ( thaIndex == document.getElementsByClassName('next').length ) {
		  	document.querySelector('.container').style.left = "0"
		} else {
		  	document.querySelector('.container').style.left = left
		}
	})
})