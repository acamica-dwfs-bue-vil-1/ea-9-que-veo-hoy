var connection = require('../lib/conexionbd');

function buscarPeliculas (req, res) {
  let sql = 'SELECT * FROM pelicula';
  let sql_;
  let titulo = req.query.titulo;
  let anio = req.query.anio;
  let genero = req.query.genero;
  let orden =req.query.columna_orden; 
  let tipoOrden = req.query.tipo_orden;
  let pagina = req.query.pagina;
  let cantidad = req.query.cantidad;
  let total;

//FILTROS POR TÍTULO, AÑO Y GÉNERO
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
    sql += ` WHERE titulo LIKE \'\%${titulo}\%\' AND anio =  ${anio}`;
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

//FILTROS POR ORDEN
  if (orden === 'anio') {
    sql += ` ORDER BY anio ${tipoOrden}`;    
    console.log(sql);
  } else if (orden === 'puntuacion') {
    sql += ` ORDER BY puntuacion ${tipoOrden}`;    
    console.log(sql);
  }
  sql_ = sql;      
  //PAGINACIÓN Y LIMIT
  sql += ` LIMIT ${(pagina - 1) * cantidad},${cantidad}`;

  connection.query(sql, function(error, resultado, fields) {
    if (error) {
        console.log("Hubo un error en la consulta", error.message);
        return res.status(404).send("Hubo un error en la consulta");
        console.log(sql);        
    }
    
    //TOTAL DE PELÍCULAS
    connection.query(sql_, function(error_, resultado_, fields_) {
      if (error_) {
        console.log("Hubo un error en la consulta", error_.message);
        return res.status(404).send("Hubo un error en la consulta");       
      }
      total = resultado_.length;
      console.log(`sql_ = ${sql_}`);
      console.log(total);

      var response = {
        'peliculas': resultado,
        'total': total
      };

      res.send(JSON.stringify(response));
      console.log(sql);
      console.log(total);    
    });

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

function buscarInfoPelicula (req, res) {
    let id = req.params.id;
    // let sql = `SELECT * FROM pelicula WHERE id = ${id}`;
    let sql = `SELECT * FROM pelicula INNER JOIN genero ON genero_id = genero.id WHERE pelicula.id = ${id}`
    console.log(`id de película: ${id}`);

    connection.query(sql, function(error, resultado, fields) {
      if (error) {
          console.log("Hubo un error en la consulta", error.message);
          return res.status(404).send("Hubo un error en la consulta");
      } 
      console.log(resultado);
      console.log('genero ' + resultado[0].nombre)
      sql = `SELECT * FROM actor_pelicula INNER JOIN actor ON actor_id = actor.id WHERE pelicula_id = ${id}`
      connection.query(sql, function(error_, resultado_, fields_) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        } 
        var response = {
            'pelicula': resultado[0],
            'genero': resultado[0].nombre,
            'actores': resultado_         
        };
    
        res.send(JSON.stringify(response));
      }); 
    });
}

module.exports = {
  buscarPeliculas: buscarPeliculas,
  buscarGeneros: buscarGeneros,
  buscarInfoPelicula: buscarInfoPelicula
};