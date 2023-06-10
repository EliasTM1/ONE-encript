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

const activeOutput = [outputMessage, copyButton];

const noActiveOutput = [munecoImg, noMsgTxt, infoMsgTxt];

// * Event listeners
encryptButton.addEventListener("click", (e) => handleEncription(e));
decryptButton.addEventListener("click", (e) => handleDecrypt(e));
copyButton.addEventListener("click", (e) => copyyEncryptedMessage(e));

swapReplacementKeys();
initUI();

function swapReplacementKeys() {
	Object.keys(replacements).forEach(
		(key) => (reversedReplacements[replacements[key]] = key)
	);
}

function initUI() {
	for (const element of activeOutput) element.style.display = "none";
	for (const element of noActiveOutput) element.style.display = "block";
}

function toggleOutputMessage() {
	const inactiveOutput =
		outputMessage.style.display === "none" &&
		copyButton.style.display === "none";
	if (inactiveOutput) {
		for (const element of activeOutput) element.style.display = "block";
		for (const element of noActiveOutput) element.style.display = "none";
		return;
	}

	for (const element of activeOutput) element.style.display = "none";
	for (const element of noActiveOutput) element.style.display = "block";
}

// * Encription

function handleEncription(e) {
	e.preventDefault();
	if (inputTextarea.value.trim().length === 0) return;
	const separatedLetters = inputTextarea.value.split("");
	const encriptedWord = separatedLetters.map(encryptWord);
	console.log(encriptedWord.join(""), "encriptedWord");
	toggleOutputMessage();
	outputMessage.value = encriptedWord.join("");
	inputTextarea.value = "";
}

function encryptWord(letter) {
	if (replacements.hasOwnProperty(letter)) return replacements[letter];
	return letter;
}

// * Encription end

// * Decription

function handleDecrypt(e) {
	e.preventDefault();
	let messageToDecrypt = inputTextarea.value.trim();
	if (messageToDecrypt.length === 0) return;
	outputMessage.value = messageToDecrypt.split(" ").map(decriptWord).join(" ");
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
		})
		.catch(() => {
			alert("Copy failed!");
		});
}
