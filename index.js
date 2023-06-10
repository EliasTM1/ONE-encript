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
copyButton.addEventListener("click", (e) => copyyEncryptedMessage(e));

function toggleOutputMessage() {
	if (
		outputMessage.style.display === "none" &&
		copyButton.style.display === "none"
	) {
		munecoImg.style.display = "none";
		noMsgTxt.style.display = "none";
		infoMsgTxt.style.display = "none";
		outputMessage.style.display = "block";
		copyButton.style.display = "block";
		return;
	}
	munecoImg.style.display = "block";
	noMsgTxt.style.display = "block";
	infoMsgTxt.style.display = "block";
	outputMessage.style.display = "none";
	copyButton.style.display = "none";
}

function encryptMessage(e) {
	e.preventDefault();
	if (inputTextarea.value.trim().length === 0) return;
	const speratedValues = inputTextarea.value.split("");
	const encriptedWord = speratedValues.map((letter, index) => {
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
	// * Check if the message is empty
	toggleOutputMessage();
	outputMessage.value = encriptedWord.join("");
	// Clean input
	// inputTextarea.value = "";
	
}

function copyyEncryptedMessage(e) {
	e.preventDefault();
	navigator.clipboard
		.writeText(outputMessage.value)
		.then(() => {
			// console.log("Copied to clipboard successfully!");
		})
		.catch((err) => {
			throw err;
		});
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
	Object.keys(replacements).forEach(
		(key) => (reversedReplacements[replacements[key]] = key)
	);
}

swapReplacementKeys();
toggleOutputMessage();

// * All above working

function decryptMessage(e) {
	e.preventDefault();
	let messageToDecrypt;
	// * No message to decrypt
	if(inputTextarea.value.length === 0 && outputMessage.value.trim().length === 0 ) return;
	// * Message to decrypt is inputText area
	if (outputMessage.value.trim().length === 0 && inputTextarea.value.length !== 0) messageToDecrypt = inputTextarea.value.trim();
	// * Message to decrypt is output area
	else messageToDecrypt = inputTextarea.value.trim().split(" ");
	console.log(inputTextarea.value.length, "inputTextarea.value.length");
	let decrypted = messageToDecrypt.map((word) => decriptWord(word));
	console.log(decrypted.join(' '), "DECRIPTED MESSAGE ******");
}



function decriptWord(word) {
	// console.warn(word, "word");
	// console.log(replacements, "replacements");
	const replacementValues = Object.values(replacements);
	let newWord;
	//  * use includes to check if the need to be decrypted
	replacementValues.forEach((replacement, indexfor) => {
		
		console.log(replacement, "replacement");
		if (word.includes(replacement)) {
			while (word.includes(replacement)) {
				word = word.replace(replacement, reversedReplacements[replacement]);
			}
		}
		newWord = word;
	});
	return newWord;
}

function containsCoincidences(word, coincidences) {
	if (word.length === 0) return false;
	if (coincidences.includes(word[0])) return true;
	return containsCoincidences(word.slice(1), coincidences);
}
