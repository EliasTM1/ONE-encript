// * Input
const inputTextarea = document.querySelector("#encr-input");
const encryptButton = document.querySelector("#encript-btn");
const decryptButton = document.querySelector("#decript-btn");

// * Elements from card
const cardImg = document.querySelector("#munecoImg");
const noTextMessage = document.querySelector("#noMsg");
const infoTextMessage = document.querySelector("#infoMsg");

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
const noActiveOutput = [cardImg, noTextMessage, infoTextMessage];
let inactiveOutputGlobal = outputMessage.style.display === "none" && copyButton.style.display === "none";


// * Event listeners
encryptButton.addEventListener("click", (e) => handleEncryption(e));
decryptButton.addEventListener("click", (e) => handleDecryption(e));
copyButton.addEventListener("click", (e) => copyEncryptedMessage(e));

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
	inactiveOutputGlobal = !inactiveOutputGlobal;
	if (inactiveOutputGlobal) {
		for (const element of activeOutput) element.style.display = "block";
		for (const element of noActiveOutput) element.style.display = "none";
		return;
	}
	for (const element of activeOutput) element.style.display = "none";
	for (const element of noActiveOutput) element.style.display = "block";
}

// * Encription

function handleEncryption(e) {
	e.preventDefault();
	if (inputTextarea.value.trim().length === 0) return;
	if(inactiveOutputGlobal) toggleOutputMessage();
	
	const separatedLetters = inputTextarea.value.split("");
	const encriptedWord = separatedLetters.map(encryptWord);
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

function handleDecryption(e) {
	e.preventDefault();
	let messageToDecrypt = inputTextarea.value.trim();
	if (messageToDecrypt.length === 0) return;
	if(inactiveOutputGlobal) toggleOutputMessage();
	outputMessage.value = messageToDecrypt.split(" ").map(decriptWord).join(" ");
	toggleOutputMessage();
	inputTextarea.value = "";
}

function decriptWord(word) {
    const replacementValues = Object.values(replacements);
    let newWord = word;
    //  * use includes to check if the need to be decrypted
    for(let i = 0; i < replacementValues.length; i++) {
        const replacement = replacementValues[i];
        const regex = new RegExp(replacement, 'g');
        if (newWord.includes(replacement)) {
            newWord = newWord.replace(regex, reversedReplacements[replacement]);
        }
    }
    return newWord;
}

// * Decription end

// * Bons copy encripted or decripted message
function copyEncryptedMessage(e) {
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
