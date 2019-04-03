var consonants = 'bcdfghjklmnpqrstvwyzBCDFGHJKLMNPQRSTVWYZ'.split('');
var vowels = 'aeiouAEIOU'.split("");


function translateWord(word){
  var output;

  var splitWord = word.split("");
  var startOfWord = "";

  //if word starts with anything other than a letter, return the word.
  if (!(vowels.includes(splitWord[0])) && !(consonants.includes(splitWord[0])) ) {
    output = word;
  } else {
    // If word starts with a vowel
    if (vowels.includes(splitWord[0])) {
      // startOfWord = splitWord[0].toString();
      // endOfWord = splitWord.slice(1).join("");
      output = splitWord.join("") + 'way';
    } else {

      // if word starts with 'qu'
      if (splitWord[0] === "q" && splitWord[1] === "u") {
        startOfWord = "qu";
        endOfWord = splitWord.slice(2).join("");
        output = endOfWord + startOfWord + 'ay';
      // otherwise, split off initial consonants
      } else {
        var splitWord = splitInitialConsonants(word);
        var startOfWord = splitWord[0];
        var endOfWord = splitWord[1];
        output = endOfWord + startOfWord + 'ay';
      }
    }
  }
//    console.log(output);
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
    if (consonants.includes(splitWord[0]) &&
      consonants.includes(splitWord[1]) &&
      consonants.includes(splitWord[2])) {
      initialConsonants = splitWord.slice(0,3).join("");
      endOfWord = splitWord.slice(3).join("");

    } else if (consonants.includes(splitWord[0]) &&
      consonants.includes(splitWord[1])) {
      initialConsonants = splitWord.slice(0,2).join("");
      endOfWord = splitWord.slice(2).join("");
    } else if (consonants.includes(splitWord[0])) {
      initialConsonants = splitWord.slice(0,1).join("");
      endOfWord = splitWord.slice(1).join("");
    }
 }
    return [initialConsonants, endOfWord];
}

function translatePhrase(splitInput) {
  var output = "";
  //console.log(splitInput);
  splitInput.forEach(function(word) {
    output = output + " " + translateWord(word);
  });
  return output;
}



$(document).ready(function() {
  $("form#pigLatin").submit(function(event) {
    event.preventDefault();

    var input = $("#input").val();
    if ($('input').val() === "") {
      alert ("Please enter your word");
    } else {
    // var splitInput = input.split(" ");
    // var output = translateWord(input);
      var splitInput = input.split(" ");
      var output = translatePhrase(splitInput);

      $("#pigLatin").hide();
      $(".phrase").text(input);
      $(".output").text(output);
      $("#result").show();
    }
  });
});
