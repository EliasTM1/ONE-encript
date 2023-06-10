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

const reversedReplacements = {};
const replacements = {
	a: "ai",
	e: "enter",
	i: "imes",
	o: "ober",
	u: "ufat",
};

// const elementsToToggle = [
// 	munecoImg,
// 	noMsgTxt,
// 	infoMsgTxt,
// 	outputMessage,
// 	copyButton,
//   ];

// * Event listeners
encryptButton.addEventListener("click", (e) => handleEncription(e));
decryptButton.addEventListener("click", (e) => handleDecrypt(e));
copyButton.addEventListener("click", (e) => copyyEncryptedMessage(e));

swapReplacementKeys();
toggleOutputMessage();

function swapReplacementKeys() {
	Object.keys(replacements).forEach(
		(key) => (reversedReplacements[replacements[key]] = key)
	);
}

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
// * Encription

function handleEncription(e) {
	e.preventDefault();
	if (inputTextarea.value.trim().length === 0) return;
	const separatedLetters = inputTextarea.value.split("");
	const encriptedWord = separatedLetters.map((letter) => encryptWord(letter));
	console.log(encriptedWord.join(""), "encriptedWord")
	toggleOutputMessage();
	outputMessage.value = encriptedWord.join("");
	inputTextarea.value = "";
}

function encryptWord(letter) {
	let replacementsValues = Object.keys(replacements)
	replacementsValues.forEach((replacement) => {
		if (letter === replacement) letter = replacements[replacement];
		
	})
	return letter;
}

// * Encription end

// * Decription

function handleDecrypt(e) {
	e.preventDefault();
	let messageToDecrypt;
	// * No message to decrypt
	if (
		inputTextarea.value.length === 0 &&
		outputMessage.value.trim().length === 0
	)
		return;
	// * Message to decrypt is inputText area
	if (
		outputMessage.value.trim().length === 0 &&
		inputTextarea.value.length !== 0
	)
		messageToDecrypt = inputTextarea.value.trim();
	// * Message to decrypt is output area
	else messageToDecrypt = inputTextarea.value.trim().split(" ");
	console.log(inputTextarea.value.length, "inputTextarea.value.length");
	let decrypted = messageToDecrypt.map((word) => decriptWord(word));
	outputMessage.value = decrypted.join(" ");
	// toggleOutputMessage();
}

function decriptWord(word) {
	const replacementValues = Object.values(replacements);
	let newWord;
	//  * use includes to check if the need to be decrypted
	replacementValues.forEach((replacement) => {
		if (word.includes(replacement)) {
			while (word.includes(replacement)) {
				word = word.replace(replacement, reversedReplacements[replacement]);
			}
		}
		newWord = word;
	});
	return newWord;
}

// * Decription end

// * Bons copy encripted or decripted message
function copyyEncryptedMessage(e) {
	e.preventDefault();
	navigator.clipboard
		.writeText(outputMessage.value)
		.then(() => {
			inputTextarea.value = "";
			// toggleOutputMessage();
		})
		.catch((err) => {
			throw err;
		});
}
