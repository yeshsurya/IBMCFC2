(function() {
    // your page initialization code here
    // the DOM will be available here
    const DICTIONARY = "0123456789qwertyuiopasdfghjklzxcvbnm".split('');
const LETTER_TOTAL = 406;
const CENTER_WORD = 'hacker lightning';
const CW_START = LETTER_TOTAL/2 - CENTER_WORD.length/2;
const CW_END = CW_START + CENTER_WORD.length;
const ROW_LENGTH = 45;

var getBoltStartingPositions = function() {
  var results = [];
  results.push(CW_START);
  results.push(CW_END + 1);
  for(var i = CW_START; i < CW_END + 1; i++) {
    var top = i - ROW_LENGTH;
    var bottom = i + ROW_LENGTH+1;
    results.push(top, bottom);
  }
  return results;
}

const STARTING_POSITIONS = getBoltStartingPositions();

var el = document.getElementById('hackerLightning');

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var genRanChar = function() {
 var index = Math.floor(Math.random() * DICTIONARY.length);
  return DICTIONARY[index];
}

var genRanString = function(amt) {
  var string = ``;
  var wordIndex = 0;
  for(var i = 0; i < amt; i++) {
    if(i >= CW_START && i < CW_END) {
      string += `<span class="static">${CENTER_WORD[wordIndex]}</span>`;
      wordIndex++;
    }
    else {
      string += `<span>${genRanChar()}</span>`;
    }
  }
  return string;
}

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

var Bolt = function() {
  this.position = STARTING_POSITIONS[getRandomIntInclusive(0, STARTING_POSITIONS.length)];
  this.lastDirection = '';
  this.moves = {
    left: -1,
    right: 1,
    up: -ROW_LENGTH,
    down: ROW_LENGTH
  }
  this.move = function() {
    var direction = pickRandomProperty(this.moves);
    while(direction === this.lastDirection) {
      direction = pickRandomProperty(this.moves);
    }
    this.lastDirection = direction;
    var move = this.moves[direction];
    var current = document.querySelector(`#hackerLightning span:nth-child(${this.position})`);
    var next = document.querySelector(`#hackerLightning span:nth-child(${this.position += move})`);
    if(next) {
      current.style.opacity = 1;
      current.style.color = 'rgb(40,23,64)';
      next.style.opacity = 1;
      next.style.color = '#fff';
    }
    else {
      current.style.opacity = 1;
      current.style.color = 'rgb(40,23,64)';
      return false;
    }
  }
  this.strike = function() {
    var self = this;
    var animate = setInterval(function() {
      var move = self.move();
      if(move === false) {
        clearInterval(animate);
      }
    }, 16);
  }
}

document.getElementById('hackerLightning').innerHTML = genRanString(LETTER_TOTAL);

var genBolts = function(amt) {
  var results = [];
  for(var i = 0; i < amt; i++) {
    results.push(new Bolt());
  }
  return results;
}

var animateBolts = function() {
  var bolts = genBolts(15);
  for(var i = 0; i < bolts.length; i++) {
    bolts[i].strike();
  }
}

animateBolts();
 })();

