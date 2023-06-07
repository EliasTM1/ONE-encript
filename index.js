// * Input
const inputTextarea = document.querySelector('#encr-input');
const encryptButton = document.querySelector('#encript-btn');
const decryptButton = document.querySelector('#decript-btn');

// * Elements from card
const munecoImg = document.querySelector('#munecoImg');
const noMsgTxt = document.querySelector('#noMsg');
const infoMsgTxt = document.querySelector('#infoMsg');

// * Worked message and copy button
const outputMessage = document.querySelector('#outputMsg');
const copyButton = document.querySelector('#copyBtn');

encryptButton.addEventListener('click', (e) => encryptMessage(e));
decryptButton.addEventListener('click', (e) => decryptMessage(e));

function toggleOutputMessage() {
    if (outputMessage.style.display === 'none' && copyButton.style.display === 'none') {
        outputMessage.style.display = 'block';
        copyButton.style.display = 'block';
        return
    } 
    outputMessage.style.display = 'none';
    copyButton.style.display = 'none';
}

function encryptMessage(e) {
    e.preventDefault();
    const speratedValues = inputTextarea.value.split('');
    const someExample = speratedValues.map((letter, index) => {
        switch (letter) {
            case 'a':
                return 'ai';
                break;
            case 'e':
                return 'enter';
                break;
            case 'i':
                return 'imes';
                break;
            case 'o':
                return 'ober';
                break;
            case 'u':
                return 'ufat';
                break;
            default:
                return letter
                break;
        }
    });
    // console.log(someExample.join(''))
    // console.log('Encrypting message...');
}

function decryptMessage(e) {
    e.preventDefault();
    const speratedValues = inputTextarea.value.split(' ');
    console.log(speratedValues, "Oooooo")
}

toggleOutputMessage()




