var consonants = 'bcdfghjklmnpqrstvwyz'.split('');
var vowels = 'aeiou'.split("");


function translateWord(word){
  var output;
  // var consonants = 'bcdfghjklmnpqrstvwyz'.split('');
  // var vowels = 'aeiou'.split("");
  var splitWord = word.split("");
  var startOfWord = "";


  // If word starts with a vowel
  if (vowels.includes(splitWord[0])) {
    output = splitWord.join("") + 'way';
  } else {

    // if word starts with 'qu'
    if (splitWord[0] === "q" && splitWord[1] === "u") {
      startOfWord = "qu";
      endOfWord = splitWord.slice(2).join("");
    // otherwise, split off initial consonants
    } else {
      var splitWord = splitInitialConsonants(word);
      var startOfWord = splitWord[0];
      var endOfWord = splitWord[1];
    }
    output = endOfWord + startOfWord + 'ay';
  }
    console.log(output);
    return output;
}

function splitInitialConsonants(word) {
  // Determine whether the first 1, 2 or 3 letters are all consonants.
  var initialConsonants = "";
  var endOfWord = "";
  var splitWord = word.split("");

  // Handle special case with qu as not 1st letters
  if (splitWord[1] === "q" && splitWord[2] === "u") {
    initialConsonants = splitWord[0].toString() + "qu";
    endOfWord = splitWord.slice(3).join("");
  } else {
    // Capture the first letter
    if (consonants.includes(splitWord[0])) {
      initialConsonants = splitWord[0].toString();
      endOfWord = splitWord.slice(1).join("");
    }

    //capture the second letter, if it's a consonant
    if (consonants.includes(splitWord[1])) {
      initialConsonants = initialConsonants + splitWord[1].toString();
      endOfWord = splitWord.slice(2).join("");
    }
    //capture the third letter, if it's a consonant
    if (consonants.includes(splitWord[2])) {
      initialConsonants = initialConsonants + splitWord[2].toString();
      endOfWord = splitWord.slice(3).join("");
    }
  }
    return [initialConsonants, endOfWord];
}




$(document).ready(function() {
  $("form#pigLatin").submit(function(event) {
    event.preventDefault();

    var input = $("#input").val();
    var splitInput = input.split(" ");

    var output = translateWord(input);

    $("#pigLatin").hide();
    $(".phrase").text(input);
    $(".output").text(output);
    $("#result").show();
  });
});
