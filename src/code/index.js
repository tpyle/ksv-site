const LOWERCASE_LETTERS = Array(26).fill().map((_,i)=>String.fromCharCode(i + 'a'.charCodeAt(0)))
const UPPERCASE_LETTERS = Array(26).fill().map((_,i)=>String.fromCharCode(i + 'A'.charCodeAt(0)));


function getRandomLowercaseLetter() {
    return LOWERCASE_LETTERS[Math.floor(Math.random() * LOWERCASE_LETTERS.length)];
}

function getRandomUppercaseLetter() {
    return UPPERCASE_LETTERS[Math.floor(Math.random() * UPPERCASE_LETTERS.length)];
}

function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}

function _getSpecial(specialList) {
    return ()=>specialList[Math.floor(Math.random() * specialList.length)];
}

function removeRandom(array) {
    const index = Math.floor(Math.random() * array.length);
    return array.splice(index,1)[0];
}


export const generatePassword = ({ specialLength=4, upperLength=4, numberLength=4, lowerLength=4, specialCharacters=["!","@", "#", "$", "%", "^", "&", "*"] }={}) => {
    const toGenerate = [
        ...Array(lowerLength).fill().map(_=>getRandomLowercaseLetter),
        ...Array(upperLength).fill().map(_=>getRandomUppercaseLetter),
        ...Array(numberLength).fill().map(_=>getRandomNumber),
        ...Array(specialLength).fill().map(_=>_getSpecial(specialCharacters))
    ];
    return Array(toGenerate.length)
                .fill()
                .map(_=>removeRandom(toGenerate)())
                .join("");
};


export const generatePin = (length) => {
    return Array(length)
                .fill()
                .map(_=>getRandomNumber())
                .join("");
};
