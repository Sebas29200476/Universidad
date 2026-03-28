const usuario = require("../models/estudiante.model");

exports.getEstudiante = (req, res) => {
  usuario.getEstudiante((err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
};

exports.createEstudiante = (req, res) => {
  const estudiante = req.body;
  if (!estudiante) {
    return res.status(400).json({
      message: "Debe enviar datos del estudiante"
    });
  }
  usuario.createEstudiante(estudiante, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Error al crear el estudiante",
        error: err
      });
    }
    res.status(201).json({
      message: "Estudiante creado correctamente",
      id: result.insertId
    });

  });

};

exports.getEstudianteById = (req, res) => {
    const id = req.params.id;
    usuario.getEstudianteById(id, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!results || results.length === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }
        res.json(results[0]);
    });
};

exports.updateEstudiante = (req, res) => {
    const id = req.params.id;
    const estudiante = req.body;
      if (!estudiante) {
        return res.status(400).json({
        message: "Debe enviar datos del estudiante"
      });
  }
    usuario.updateEstudiante(id, estudiante, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!results || results.length === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }
        res.json({message: "Estudiante actualizado"});
    });
};
exports.deleteEstudiante = (req, res) => {
  const id = req.params.id;
  usuario.deleteEstudiante(id, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!results || results.length === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }
        res.json({message: "estudiante eliminado", data: results[0]});
    });
};

exports.filtroEstudiante = (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({
      message: "Debe enviar un parámetro de búsqueda"
    });
  }
  usuario.filtroEstudiante(query, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Error al buscar estudiantes"
      });
    }
    res.json(data);
  });
};

exports.getEstudiantesPaginados = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  usuario.getEstudiantesPaginados(page, limit, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Error al obtener estudiantes"
      });
    }
    res.json(data);
  });

};