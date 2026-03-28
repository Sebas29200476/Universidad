const express = require("express");

const router = express.Router();

const estudianteController = require("../controllers/estudiante.controller");

router.get("/all", estudianteController.getEstudiante);

router.post("/create", estudianteController.createEstudiante);

router.get("/filtro", estudianteController.filtroEstudiante);
router.get("/paginado", estudianteController.getEstudiantesPaginados);

router.get("/:id", estudianteController.getEstudianteById);

router.put("/:id", estudianteController.updateEstudiante);

router.delete("/:id", estudianteController.deleteEstudiante);

module.exports = router;