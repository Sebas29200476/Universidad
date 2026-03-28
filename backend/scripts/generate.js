const fs = require("fs");
const path = require("path");

const name = process.argv[2];

if (!name) {
  console.log("Debes pasar un nombre. Ejemplo: npm run make usuario");
  process.exit(1);
}

const files = [
  `src/controllers/${name}.controller.js`,
  `src/routes/${name}.routes.js`,
  `src/models/${name}.model.js`
];

files.forEach(file => {
  const filePath = path.join(__dirname, "..", file);

  fs.writeFileSync(filePath, `// ${name} file\n`);
  console.log("Archivo creado:", file);
});