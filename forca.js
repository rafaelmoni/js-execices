const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const palavras = [
  "formiga",
  "babuino",
  "encefalo",
  "elefante",
  "girafa",
  "hamburger",
  "chocolate",
  "giroscopio",
  "computador",
  "celular",
];

const gameOver = (won) => {
  if (won) {
    console.log("Parabéns, você acertou a palavra! :D");
  } else {
    console.log("Você perdeu!");
    console.log(`A palavra era:`, word);
  }
  return false;
};

const getWord = () => {
  const i = (Math.random() * 10).toString().split("")[2];
  return palavras[i].toUpperCase();
};

let word = getWord();

let errors = 0;

const w = "||";

const topLine = [w, "=".repeat(30), w];
const emptyLine = [w, " ".repeat(30), w];
const margin = " ".repeat(10);

const hError = (c, n, nc = "") => (errors >= n ? c : nc);

let letters = [];

const printLetters = () => {
  const revealed = [];
  const underline = [];
  word.split("").forEach((c) => {
    revealed.push(`${letters.includes(c) ? c : " "}`);
    underline.push("¯");
  });
  console.log();
  console.log(revealed.join("  "));
  console.log(underline.join("  "));
  console.log();
};

const printForca = () => {
  const forca = [
    [],
    topLine,
    emptyLine,
    [w, margin, " F O R C A", margin, w],
    emptyLine,
    topLine,
    [w, "     ||    /      ", hError("|           ||", 1, "            ||")],
    [w, "     ||   /     ", hError("(   )         ||", 2, "              ||")],
    [w, "     ||  /        ", hError("|           ||", 3, "            ||")],
    [w, "     || /         ", hError("|           ||", 4, "            ||")],
    [w, "     ||/         ", hError("/|\\          ||", 5, "             ||")],
    [w, "     ||         ", hError("/ | \\         ||", 6, "              ||")],
    [w, "     ||           ", hError("|           ||", 7, "            ||")],
    [w, "     ||          ", hError("/ \\          ||", 8, "             ||")],
    [w, "     ||         ", hError("/   \\         ||", 9, "              ||")],
    [w, "     ||", " ".repeat(23), w],
    [w, "     ||", " ".repeat(23), w],
    topLine,
    [],
  ];

  forca.forEach((linha) => console.log(linha.join("")));
  if (letters.length > 0) {
    console.log("Letras utilizadas:");
    console.log(letters.join(", "));
  }

  printLetters();
};

const checkWon = () => {
  let hasHidden = false;
  word.split("").forEach((c) => {
    if (!hasHidden) {
      hasHidden = !letters.includes(c);
    }
  });

  if (errors === 9) {
    return gameOver(false);
  } else if (!hasHidden) {
    return gameOver(true);
  } else {
    play();
  }
};

printForca();

const play = () =>
  rl.question("Digite uma letra: ", (l) => {
    if (l.toLowerCase() === word.toLowerCase()) {
      return gameOver(true);
    }
    if (l.split("").length > 1) {
      console.log("Digite apenas uma letra!\n");
      play();
      return false;
    }
    if (l.match(/[A-Za-z]/) !== null) {
      if (letters.includes(l)) {
        console.log("Você já usou esta letra!\n");
        play();
      } else {
        const letter = l.toUpperCase();
        letters.push(letter);

        if (word.includes(letter) === false) {
          errors++;
        }

        printForca();
        return checkWon();
      }
    } else {
      console.log(l, "não é uma letra!\n");
      play();
    }
  });

play();
