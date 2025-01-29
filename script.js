//Création d'un tableau de mots a trouver
const wordsList = ["bonjour", "salut", "coucou", "hello", "hi", "hola"];

//Récupération des éléments du DOM
let message = document.getElementById("message");
let wordElement = document.getElementById("word");

//Création d'une fonction pour choisir un mot aléatoire
function randomWord() {
  return wordsList[Math.floor(Math.random() * wordsList.length)];
}
//Afficher le mot random dans le html
//ramplacer les lettres par des "_" dans le mot
let word = randomWord().toUpperCase();
console.log(word);

let hiddenWord = "";
for (let i = 0; i < word.length; i++) {
  hiddenWord += "_ ";
}
wordElement.innerHTML = hiddenWord;

//Création d'une fonction pour vérifier si la lettre est dans le mot et mettre a jour le mot avec la lettre trouvée
function checkLetter() {
  const letter = document.getElementById("letterInput").value.toUpperCase();
  let found = false;
  let newHiddenWord = "";
  let essais = document.getElementById("essais");
  const bodyParts = [
    document.getElementById("tete"),
    document.getElementById("torse"),
    document.getElementById("bras-gauche"),
    document.getElementById("bras-droit"),
    document.getElementById("jambe-gauche"),
    document.getElementById("jambe-droite"),
  ];

  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      newHiddenWord += letter + " ";
      found = true;
    } else if (hiddenWord[i * 2] !== "_") {
      newHiddenWord += hiddenWord[i * 2] + " ";
    } else {
      newHiddenWord += "_ ";
    }
  }

  hiddenWord = newHiddenWord;
  document.getElementById("word").innerHTML = hiddenWord;

  if (found) {
    console.log("Bonne reponse");
    message.textContent = `Bonne reponse! La lettre ${letter} est dans le mot`;
  } else {
    console.log("Mauvaise reponse");
    message.textContent = `Mauvaise reponse! La lettre ${letter} n'est pas dans le mot`;
    //Reduire le nombre d'essais
    essais.textContent = parseInt(essais.textContent) - 1;

    //Affiche les differentes partie du pendu selon les tentatives restante
    switch (parseInt(essais.textContent)) {
      case 5:
        bodyParts[0].style.display = "block";
        break;
      case 4:
        bodyParts[1].style.display = "block";
        break;
      case 3:
        bodyParts[2].style.display = "block";
        break;
      case 2:
        bodyParts[3].style.display = "block";
        break;
      case 1:
        bodyParts[4].style.display = "block";
        break;
      case 0:
        bodyParts[5].style.display = "block";
        message.textContent = `Perdu! Le mot était ${word}`;
        message.style.color = "red";
        break;
    }
  }

  //Si toutes les lettres sont trouvées affiche un message bravo

  if (hiddenWord.indexOf("_") === -1) {
    message.textContent = "Bravo! Vous avez trouvé le mot!";
    message.style.color = "green";
  }

  //Ajoute la lettre dans la liste des lettres essayées
  let letterSpan = document.createElement("span");
  letterSpan.textContent = letter + " ";
  //si la lettre n'est pas dans le mot la mettre en rouge
  document.getElementById("propositions")?.appendChild(letterSpan);

  if (found) {
    letterSpan.style.color = "green";
  } else {
    letterSpan.style.color = "red";
  }

  //Efface le champ de saisie
  document.getElementById("letterInput").value = "";
}

document
  .getElementById("letterInput")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      checkLetter();
    }
  });
