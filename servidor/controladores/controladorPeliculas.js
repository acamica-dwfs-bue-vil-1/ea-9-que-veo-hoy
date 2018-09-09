var connection = require('../lib/conexionbd');

function buscarPeliculas (req, res) {
  let sql = 'SELECT * FROM pelicula';
  let titulo = req.query.titulo;
  let anio = req.query.anio;
  let genero = req.query.genero;

  if (titulo && anio && genero) {
    console.log(`título: ${titulo} \n año: ${anio} \n género: ${genero}`)
    sql += ` WHERE titulo LIKE \'\%${titulo}\%\' AND anio = ${anio} AND genero_id = ${genero}`;
    console.log(sql);
  } else if (!titulo && anio && genero) {
    sql += ` WHERE anio = ${anio} AND genero_id = ${genero}`;    
    console.log('año y género: ' + sql);    
  } else if (!anio && titulo && genero) {
    sql += ` WHERE titulo LIKE \'\%${titulo}\%\' AND genero_id = ${genero}`;
    console.log('género y título: ' + sql);
  } else if (!genero && anio && titulo) {
    sql += ` WHERE titulo LIKE \'\%${titulo}\%\' AND anio = ${anio}`;
    console.log('año y título: ' + sql);
  } else if (titulo) {
      sql += ` WHERE titulo LIKE \'\%${titulo}\%\'`;
      console.log('sólo título: ' + sql);
  } else if (anio) {
    sql += ` WHERE anio = ${anio}`;
    console.log('sólo año: ' + sql);
  } else if (genero) {
    sql += ` WHERE genero_id = ${genero}`;
    console.log('sólo género: ' + sql);
  }

  connection.query(sql, function(error, resultado, fields) {
    if (error) {
        console.log("Hubo un error en la consulta", error.message);
        return res.status(404).send("Hubo un error en la consulta");
    }
    var response = {
        'peliculas': resultado
    };

    res.send(JSON.stringify(response));
  });
}

function buscarGeneros (req, res) {
  let sql = 'SELECT * FROM genero;'

  connection.query(sql, function(error, resultado, fields) {
    if (error) {
        console.log("Hubo un error en la consulta", error.message);
        return res.status(404).send("Hubo un error en la consulta");
    } 
    
    var response = {
        'generos': resultado
    };

    res.send(JSON.stringify(response));
  });
}

module.exports = {
  buscarPeliculas: buscarPeliculas,
  buscarGeneros: buscarGeneros
};