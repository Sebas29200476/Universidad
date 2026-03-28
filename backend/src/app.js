const cors = require("cors");
const express = require("express");
const estudianteRoutes = require("./routes/estudiante.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/estudiante", estudianteRoutes);

app.get("/", (req, res) => {
  res.send("API de estudiantes funcionando");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});