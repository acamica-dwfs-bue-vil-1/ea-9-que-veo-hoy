var connection = require('../lib/conexionbd');

function buscarPeliculas (req, res) {
  let sql = 'SELECT * FROM pelicula;'

  connection.query(sql, function(error, resultado, fields) {
    if (error) {
        console.log("Hubo un error en la consulta", error.message);
        return res.status(404).send("Hubo un error en la consulta");
    }
    var response = {
        'peliculas': resultado
    };

    res.send(JSON.stringify(response));
    console.log(response);
    console.log(resultado);
    console.log(fields);
  });
}

module.exports = {
  buscarPeliculas: buscarPeliculas
};