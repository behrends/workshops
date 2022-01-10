/* Aufgabe für das Testen von Programmierskills
 * (z.B. am Anfang der mobile Apps Vorlesung)
 *
 * Für gerade Zahlen: Zahl als Sterne *
 * Vielfaches von 5: Zahl als !
 * Vielfaches von 2 und 5
 * Alle anderen Zahlen: Zahl
 * Beispiel für [3, 5, 8, 10, 7]
 * 3
 * !!!!!
 * ********
 * %%%%%%%%%%
 * 7
 *
 * CLI:
 * node index.js 3 5 8 10 7
 */
let list = [3, 5, 8, 10, 7];

// replace list with CLI arguments if any
const cliArgs = process.argv.slice(2);
if (cliArgs.length > 0 && !isNaN(parseInt(cliArgs[0]))) {
  list = [];
  cliArgs.forEach((item) => {
    const number = parseInt(item);
    if (!isNaN(number)) {
      list.push(number);
    }
  });
}

for (let i = 0; i < list.length; i++) {
  let number = list[i];
  let line = number;
  if (number % 10 === 0) {
    line = '%'.repeat(number);
  } else if (number % 2 === 0) {
    line = '*'.repeat(number);
  } else if (number % 5 === 0) {
    line = '!'.repeat(number);
  }
  console.log(line);
}
