const s = "*";

let main = (n) => {
  console.log("\nPrinting Stars:");
  const rows = [];
  for (let i = 1; i < n; i++) {
    if (i % 2 !== 0) {
      const space = " ".repeat(Math.floor((n - i) / 2));
      const star = s.repeat(i);
      rows.push(`${space}${star}`);
    }
  }
  rows.forEach((r) => console.log(r));
  if (n % 2 !== 0) console.log(s.repeat(n));
  rows.reverse().forEach((r) => console.log(r));
};

const v = parseInt(process.argv[2]);

if (v) {
  main(v);
} else {
  //console.log("Informe um número");
  main(1);
  main(2);
  main(3);
  main(4);
  main(5);
  main(6);
}
