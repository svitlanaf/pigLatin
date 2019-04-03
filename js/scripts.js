var consonants = 'bcdfghjklmnpqrstvwyzBCDFGHJKLMNPQRSTVYWZ'.split('');
var vowels = 'aeiouyAEIOUY'.split("");


function translateWord(word){
  var output;

  var splitWord = word.split("");
  var startOfWord = "";
  var endOfWord = "";

  //if word starts with anything other than a letter, return the word.
  if (!(vowels.includes(splitWord[0])) && !(consonants.includes(splitWord[0])) ) {
    output = word;
  } else {
    // If word starts with a vowel
    if (vowels.includes(splitWord[0])) {
      // Make an exception if the word starts with a y
      if (splitWord[0] === 'y' || splitWord[0] === 'Y') {
        splitWord = splitInitialConsonants(word);
        startOfWord = splitWord[0];
        endOfWord = splitWord[1];
        output = endOfWord + startOfWord + 'ay';
      } else {
        output = splitWord.join("") + 'way';
      }
    } else {

      // if word starts with 'qu'
      if (splitWord[0] === "q" && splitWord[1] === "u") {
        startOfWord = "qu";
        endOfWord = splitWord.slice(2).join("");
        output = endOfWord + startOfWord + 'ay';
      // otherwise, split off initial consonants
      } else {
        splitWord = splitInitialConsonants(word);
        startOfWord = splitWord[0];
        endOfWord = splitWord[1];
        output = endOfWord + startOfWord + 'ay';
      }
    }
  }
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

    // if 2nd letter is a y, treat as vowel
    if (splitWord[1] === 'y' || splitWord[1] === 'Y') {
      initialConsonants = splitWord.slice(0,1).join("");
      endOfWord = splitWord.slice(1).join("");

    // Capture the first 3 letters if they are all consonants
    } else if (consonants.includes(splitWord[0]) &&  consonants.includes(splitWord[1]) && consonants.includes(splitWord[2])) {
        initialConsonants = splitWord.slice(0,3).join("");
        endOfWord = splitWord.slice(3).join("");

      // Capture the first 2 letters if they both all consonants
      } else if (consonants.includes(splitWord[0]) && consonants.includes(splitWord[1])) {
            initialConsonants = splitWord.slice(0,1).join("");
            endOfWord = splitWord.slice(1).join("");
          } else {
            initialConsonants = splitWord.slice(0,2).join("");
            endOfWord = splitWord.slice(2).join("");

      // else capture the 1st letter, if it's followed by a vowel
      } else if (consonants.includes(splitWord[0])) {
        initialConsonants = splitWord.slice(0,1).join("");
        endOfWord = splitWord.slice(1).join("");
      }
  }

  return [initialConsonants, endOfWord];
}

function translatePhrase(splitInput) {
  var output = "";

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
      var splitInput = input.split(" ");
      var output = translatePhrase(splitInput);

      $("#pigLatin").hide();
      $(".phrase").text(input);
      $(".output").text(output);
      $("#result").show();
    }
  });
});
