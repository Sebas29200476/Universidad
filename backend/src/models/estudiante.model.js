const db = require("../config/db");

exports.createEstudiante = (estudiante, callback) => {
  const sql = ` INSERT INTO estudiantes_uq_enriquecido (identificacion, nombre, apellido, correo,
    telefono, direccion, vigencia, tipo_hecho, genero, estado_civil, nacionalidad, depa_pro_colegio,
    ciudad_pro_colegio, depa_residencia, ciudad_residencia, modalidad, metodologia, jornada, facultad,
    programa, semestre, sede, condicion_estudiante, colegio, naturaleza_colegio, raza, discapacidad,
    eps, estrato) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const values = [
    estudiante.identificacion, estudiante.nombre, estudiante.apellido, estudiante.correo,
    estudiante.telefono, estudiante.direccion, estudiante.vigencia, estudiante.tipo_hecho,
    estudiante.genero, estudiante.estado_civil, estudiante.nacionalidad, estudiante.depa_pro_colegio,
    estudiante.ciudad_pro_colegio, estudiante.depa_residencia, estudiante.ciudad_residencia,
    estudiante.modalidad, estudiante.metodologia, estudiante.jornada, estudiante.facultad,
    estudiante.programa, estudiante.semestre, estudiante.sede, estudiante.condicion_estudiante,
    estudiante.colegio, estudiante.naturaleza_colegio, estudiante.raza, estudiante.discapacidad,
    estudiante.eps, estudiante.estrato];
  db.query(sql, values, callback);
};

exports.getEstudiante = (callback) => {
  db.query("SELECT * FROM estudiantes_uq_enriquecido", callback);
};

exports.getEstudianteById = (id, callback) => {
  const sql = `SELECT * FROM estudiantes_uq_enriquecido WHERE id = ?`;
  db.query(sql, [id], callback);
};

exports.updateEstudiante = (id, estudiante, callback) => {
  const sql = `UPDATE estudiantes_uq_enriquecido SET identificacion=?, nombre=?, apellido=?, correo=?,
    telefono=?, direccion=?, vigencia=?, tipo_hecho=?, genero=?, estado_civil=?, nacionalidad=?,
    depa_pro_colegio=?, ciudad_pro_colegio=?, depa_residencia=?, ciudad_residencia=?, modalidad=?,
    metodologia=?, jornada=?, facultad=?, programa=?, semestre=?, sede=?, condicion_estudiante=?,
    colegio=?, naturaleza_colegio=?, raza=?, discapacidad=?, eps=?, estrato=? WHERE id=?`;
  const values = [
    estudiante.identificacion, estudiante.nombre, estudiante.apellido, estudiante.correo,
    estudiante.telefono, estudiante.direccion, estudiante.vigencia, estudiante.tipo_hecho,
    estudiante.genero, estudiante.estado_civil, estudiante.nacionalidad, estudiante.depa_pro_colegio,
    estudiante.ciudad_pro_colegio, estudiante.depa_residencia, estudiante.ciudad_residencia,
    estudiante.modalidad, estudiante.metodologia, estudiante.jornada, estudiante.facultad,
    estudiante.programa, estudiante.semestre, estudiante.sede, estudiante.condicion_estudiante,
    estudiante.colegio, estudiante.naturaleza_colegio, estudiante.raza, estudiante.discapacidad,
    estudiante.eps, estudiante.estrato, id];
  db.query(sql, values, callback);

};

exports.deleteEstudiante = (id, callback) => {
  const sql = `DELETE FROM estudiantes_uq_enriquecido WHERE id = ?`;
  db.query(sql, [id], callback);
};

exports.filtroEstudiante = (query, callback) => {

  const search = `%${query}%`;
  const sql = `SELECT * FROM estudiantes_uq_enriquecido WHERE nombre LIKE ? OR apellido LIKE ?
    OR programa LIKE ? OR facultad LIKE ? OR identificacion LIKE ?
  `;

  const values = [search, search, search, search, search];

  db.query(sql, values, callback);

};

exports.getEstudiantesPaginados = (page, limit, callback) => {
  const offset = (page - 1) * limit;
  const sql = `SELECT * FROM estudiantes_uq_enriquecido LIMIT ? OFFSET ?`;
  db.query(sql, [limit, offset], callback);
};
