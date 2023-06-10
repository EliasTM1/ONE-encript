// * Input
const inputTextarea = document.querySelector("#encr-input");
const encryptButton = document.querySelector("#encript-btn");
const decryptButton = document.querySelector("#decript-btn");

// * Elements from card
const munecoImg = document.querySelector("#munecoImg");
const noMsgTxt = document.querySelector("#noMsg");
const infoMsgTxt = document.querySelector("#infoMsg");

// * Worked message and copy button
const outputMessage = document.querySelector("#outputMsg");
const copyButton = document.querySelector("#copyBtn");

// * Event listeners
encryptButton.addEventListener("click", (e) => encryptMessage(e));
decryptButton.addEventListener("click", (e) => decryptMessage(e));

function toggleOutputMessage() {
	if ( outputMessage.style.display === "none" && copyButton.style.display === "none" ) {
		outputMessage.style.display = "block";
		copyButton.style.display = "block";
		return;
	}
	outputMessage.style.display = "none";
	copyButton.style.display = "none";
}

function encryptMessage(e) {
	e.preventDefault();
	const speratedValues = inputTextarea.value.split("");
	const someExample = speratedValues.map((letter, index) => {
		switch (letter) {
			case "a":
				return "ai";
				break;
			case "e":
				return "enter";
				break;
			case "i":
				return "imes";
				break;
			case "o":
				return "ober";
				break;
			case "u":
				return "ufat";
				break;
			default:
				return letter;
				break;
		}
	});
	toggleOutputMessage();
	console.log(someExample.join(""));
	console.log("Encrypting message...");
}

const reversedReplacements = {};
const replacements = {
	a: "ai",
	e: "enter",
	i: "imes",
	o: "ober",
	u: "ufat",
};

function swapReplacementKeys() {
	Object.keys(replacements).forEach((key) => reversedReplacements[replacements[key]] = key );
}
swapReplacementKeys();

function decryptMessage(e) {
	e.preventDefault();
	const speratedValues = inputTextarea.value.trim().split(" ");
	const separator = speratedValues.map((word) => {
		return decriptWord(word);
	});

	console.log(separator, "separator ------- FINAL");
}

function decriptWord(word) {
	const replacementValues = Object.values(replacements);
	let newWord;
	//  * use includes to check if the need to be decrypted
	replacementValues.forEach((replacement, indexfor) => {
		if (word.includes(replacementValues[indexfor])) {
			newWord = word.replace(replacement, reversedReplacements[replacement]);
		}
	});
	return newWord;
}
// Check recursively if a word contains coincidences
function containsCoincidences(word, coincidences) {
	// Base case: if word is empty, return false
	if (word.length === 0) return false;
	

	// Check if the first character of the word is a coincidence
	if (coincidences.includes(word[0])) {
		return true;
	}

	// Recursive case: check the remaining characters
	return containsCoincidences(word.slice(1), coincidences);
}

toggleOutputMessage();
