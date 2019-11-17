// JS strict mode for habit hygiene (MUST be first statement in file)
'use strict';

// wrapper on translation function with default vowel suffix prefix
function translate(userInputPhrase) {
	return translate(userInputPhrase, 'y');
}

// translation function wrapping rest of class's functionality
function translate(userInputPhrase, suffixPrefix) {
	// define some constants for the rest of the program
	// vowels, silent 'h's, and the universal suffix (w or w/o starting letter as vowel)
	var vowels = ['a','e','i','o','u','y','A','E','I','O','U','Y'];
	var minusY = ['a','e','i','o','u','A','E','I','O','U'];
	// standard suffix
	var pyg = 'ay';
	// additional prefix for suffix for words starting with vowels (i.e. 'yay' instead of 'ay' if 'y')
	var vowPyg = (suffixPrefix == 'none') ? '' : suffixPrefix;
	// list of silent 'h' words
	var silentH = ['honestly','honor', 'honorary', 'honored', 'honorable', 'honorific', 'honoring', 'honors', 'honorifics', 'herb', 'herbalist', 'herbicide', 'herbivore', 'herbs', 'herbalists', 'herbicides', 'herbivores', 'honest', 'honesty', 'hour', 'hours', 'hourly', 'heir', 'heiress', 'heirloom', 'heirs', 'heiresses', 'heirlooms', 'homage', 'hors'];

	// functions used for assembling the translated words
	// get the index of the word's first vowel (fv)
	function firstVowelIndex(word) {
		// an empty list for saving the first vowel's index to
		var firstVowelIndex = [];
		// iterate through the word with vowels list, saving the index of each occurrence to the empty list
		vowels.forEach (function(vowel) {
			var firstVowelOccurrence = word.indexOf(vowel);
				if (firstVowelOccurrence > 0)
					firstVowelIndex.push(firstVowelOccurrence);
		});
		// sort the list and point directly to the integer, the first and lowest index in the fv_index list
		var firstVowelIndex = firstVowelIndex.sort();
		var vowelIndex = firstVowelIndex[0];
		return vowelIndex;
	}

	// basic operation for translating words starting with a consonant
	function basicTranslation(word) {
		// define the standard prefix and suffix, split at 1st occurrence of a vowel
		var prefix = word.slice(0,firstVowelIndex(word));
		var suffix = word.slice(firstVowelIndex(word));
		var newWord = (suffix + prefix + pyg);
		// add a special case to help pronunciation on leading "y"s (i.e. "bye" now = "eyebay" instead of "yebay")
		if (newWord[0] == 'y')
			return ('e' + newWord);
		// add a special case to deal with words starting in "qu" (i.e. "quit" now = "itquay" instead of "uitqay")
		if ( (word[0] == 'q') && (word[1] == 'u') )
			return (suffix.slice(1) + 'qu' + pyg);
		// if none of the above cases apply, simply return the "newWord"
		else
			return(newWord);
	}

	// slap it all together to make the translated word
	function assemble(word) {
		// make sure the individual word is greater than zero and is either all alpha or only has an apostrophe for a contraction
		if ( (word.length > 0) && (isAlpha(word) || isContraction(word)) ) {
			// proceed as normal assuming word starts with a consonant
			// lowercase it all for consistency and readability
			word = word.toLowerCase();
			// treat silent first letter 'h' words as you would if the first letter was a vowel
			if (silentH.includes(word)) {
				var silentHWord = word + vowPyg + pyg;
				return(silentHWord);
			}
			// fix vowel first words ending in 'y'from having an awkward 'yy' in  the middle
			else if (minusY.includes(word[0]) && (word.slice(-1) == vowPyg)) {
				return(word + pyg);
			}
			// return the 'word' unaltered if it is not > 0, or either alpha or a contraction
			else if ( ! minusY.includes(word[0]) ) {
				return basicTranslation(word);
			}
			// append standard suffix for words starting in a vowel (-y)
			else if (minusY.includes(word[0])) {
				var vowelWord = word + vowPyg + pyg;
				return(vowelWord);
			}
			else {
				return word;
			}
		}
		else {
			return word;
		}
	}

	// whether or not characters in string are all alphabetic
	function isAlpha(inputString) {
		return (inputString.search(/^[A-Za-z]/) != -1);
	}

	// define a case for dealing with contractions and their apostrophes
	function isContraction(string) {
		return (string.includes("'"));
	}

	// split the user input up into words you can iterate through, leaving punctuation unchanged
	var regex = /[\w']+|[.,!?;:]/g; // needs g flag to return all (global) matches, instead of first match's capture groups
	var userInputSplit = userInputPhrase.match(regex);

	// return empty when there are no words to translate
	if (userInputSplit === null)
		return '';

	// empty string to save translated words to
	var translatedWords = '';
	// assemble each word, adding it (and a space before, if alpha or contraction) to the new string
	userInputSplit.forEach(function(word) {
		if (isAlpha(word) || isContraction(word))
			translatedWords += (' ');
		translatedWords += (assemble(word)); // no spaces added before non alpha or contractions
	});

	// print the result, omitting the 1st character, which will just be the blank space before the alpha
	var finalTranslation = translatedWords.slice(1);
	return finalTranslation;
}
