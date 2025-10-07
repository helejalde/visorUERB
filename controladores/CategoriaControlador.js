const pool = require('../bd'); // Importa la conexión desde db.js



class CategoriaControlador {
  async consultaTodo(peticiones, respuestas) {
    try {
      const { rows } = await pool.query('SELECT * FROM ahhc');
      respuestas.json(rows);
    } catch (error) {
      console.error(error);
      respuestas.status(500).json({ error: 'Error al consultar los datos' });
    }
  }

  
  async consultaUno(peticiones, respuestas) {
    const { codigo } = peticiones.params;
    try {
      const { rows } = await pool.query('SELECT * FROM ahhc WHERE codigo = $1', [codigo]);
      if (rows.length === 0) {
        return respuestas.status(404).json({ error: 'No se encontró el registro' });
      }
      respuestas.json(rows[0]);
    } catch (error) {
      console.error(error);
      respuestas.status(500).json({ error: 'Error al consultar el dato' });
    }
  }

  async insertarAHHC(peticiones, respuestas) {
    const { nam, estado } = peticiones.body;
    try {
      const { rowCount } = await pool.query(
        'INSERT INTO ahhc (nam, estado) VALUES ($1, $2)',
        [nam, estado]
      );
      respuestas.status(201).json({ message: 'Registro insertado', rowCount });
    } catch (error) {
      console.error(error);
      respuestas.status(500).json({ error: 'Error al insertar el registro' });
    }
  }

  async editarAHHC(peticiones, respuestas) {
    const { codigo } = peticiones.params;
    const { nam, estado, titulo_2025, ordenanza_inscrita, num_ordenanza, coordinacion, total_lotes, predios_catastrados, lotes_titularizados, parroquia } = peticiones.body;
    try {
      const { rowCount } = await pool.query(
        'UPDATE ahhc SET nam = $1, estado = $2, titulo_2025 = $3, ordenanza_inscrita = $4, num_ordenanza = $5, coordinacion = $6, total_lotes = $7, predios_catastrados =$8, lotes_titularizados =$9, parroquia = $10 WHERE codigo = $11',
        [nam, estado, titulo_2025, ordenanza_inscrita, num_ordenanza, coordinacion, total_lotes, predios_catastrados, lotes_titularizados, parroquia, codigo]
      );
      if (rowCount === 0) {
        return respuestas.status(404).json({ error: 'Registro no encontrado' });
      }
      respuestas.json({ message: 'Listo actualizado :)', rowCount });
    } catch (error) {
      console.error(error);
      respuestas.status(500).json({ error: 'Error al actualizar el registro' });
    }
  }

  async eliminarAHHC(peticiones, respuestas) {
    const { codigo } = peticiones.params;
    try {
      const { rowCount } = await pool.query('DELETE FROM ahhc WHERE codigo = $1', [codigo]);
      if (rowCount === 0) {
        return respuestas.status(404).json({ error: 'Registro no encontrado' });
      }
      respuestas.json({ message: 'Registro eliminado', rowCount });
    } catch (error) {
      console.error(error);
      respuestas.status(500).json({ error: 'Error al eliminar el registro' });
    }
  }

  //Resolución de Inicio

  async consultaTodoRI(peticiones, respuestas) {
    try {
      //const query = ; // const { rows } = await pool.query('SELECT * FROM ahhc');
      const { rows } = await pool.query('SELECT * FROM resolucion_inicio');
      respuestas.json(rows);
    } catch (error) {
      console.error(error);
      respuestas.status(500).json({ error: 'Error al consultar los datos.' });
    }
  }

  /**
   * Consulta un registro específico por su código.
   */
  async consultaUnoRI(peticiones, respuestas) {
    const { codigo } = peticiones.params; // Parámetro en la URL
    try {
      const { rows } = await pool.query('SELECT * FROM resolucion_inicio WHERE codigo = $1', [codigo]);
      if (rows.length === 0) {
        return respuestas.status(404).json({ error: 'Registro no encontrado.' });
      }
      respuestas.json(rows[0]);
    } catch (error) {
      console.error(error);
      respuestas.status(500).json({ error: 'Error al consultar el dato.' });
    }
  }


  async editarRI(peticiones, respuestas) {
    const { codigo } = peticiones.params; // Parámetro en la URL
    const {
      nam, coordinacion, total_lotes, extracto_fecha, lotes_entrega, cg_solicitud_uerb, 
      cg_solicitudfecha_uerb, cg_oficio_rpdmq, fechaof_cg_rpdmq, cg_num_rpdmq, 
      fecha_cg_num_rpdmq, memo_inforju_ri_uerb, fechamemo_inforju_ri_uerb, of_ri_uerb, 
      fechaof_ri_uerb, ri_shot, fecha_ri_shot, of_inscrip_ri_uerb, fechaof_inscrip_ri_uerb, 
      of_inscrip_ri_rpdmq, fechaof_inscrip_ri_rpdmq, razon_inscrip_ri_rpdmq, 
      fecha_razon_inscrip_ri_rpdmq, of_cg_uerb, fechaof_cg_uerb, of_cg_rpdmq, 
      fecha_cg_rpdmq, num_cg_rpdmq, fech_cg_rpdmq, observ
    } = peticiones.body;

    try {
      const query = `UPDATE resolucion_inicio  
        SET 
          nam = $1, coordinacion = $2, total_lotes = $3, extracto_fecha = $4, 
          lotes_entrega = $5, cg_solicitud_uerb = $6, cg_solicitudfecha_uerb = $7, 
          cg_oficio_rpdmq = $8, fechaof_cg_rpdmq = $9, cg_num_rpdmq = $10, 
          fecha_cg_num_rpdmq = $11, memo_inforju_ri_uerb = $12, fechamemo_inforju_ri_uerb = $13, 
          of_ri_uerb = $14, fechaof_ri_uerb = $15, ri_shot = $16, fecha_ri_shot = $17, 
          of_inscrip_ri_uerb = $18, fechaof_inscrip_ri_uerb = $19, of_inscrip_ri_rpdmq = $20, 
          fechaof_inscrip_ri_rpdmq = $21, razon_inscrip_ri_rpdmq = $22, 
          fecha_razon_inscrip_ri_rpdmq = $23, of_cg_uerb = $24, fechaof_cg_uerb = $25, 
          of_cg_rpdmq = $26, fecha_cg_rpdmq = $27, num_cg_rpdmq = $28, fech_cg_rpdmq = $29, 
          observ = $30
        WHERE codigo = $31`;
      const values = [
        nam, coordinacion, parseInt(total_lotes) || 0, extracto_fecha, parseInt(lotes_entrega) || 0, 
        cg_solicitud_uerb, cg_solicitudfecha_uerb, cg_oficio_rpdmq, fechaof_cg_rpdmq, cg_num_rpdmq, 
        fecha_cg_num_rpdmq, memo_inforju_ri_uerb, fechamemo_inforju_ri_uerb, of_ri_uerb, 
        fechaof_ri_uerb, ri_shot, fecha_ri_shot, of_inscrip_ri_uerb, fechaof_inscrip_ri_uerb, 
        of_inscrip_ri_rpdmq, fechaof_inscrip_ri_rpdmq, razon_inscrip_ri_rpdmq, 
        fecha_razon_inscrip_ri_rpdmq, of_cg_uerb, fechaof_cg_uerb, of_cg_rpdmq, 
        fecha_cg_rpdmq, num_cg_rpdmq, fech_cg_rpdmq, observ, codigo
      ];

      const { rowCount } = await pool.query(query, values);
      if (rowCount === 0) {
        return respuestas.status(404).json({ error: 'Registro no encontrado.' });
      }
      respuestas.json({ message: 'Actualización realizada con éxito :)', rowCount });
    } catch (error) {
      console.error(error);
      respuestas.status(500).json({ error: 'Error al actualizar el registro.' });
    }
}

  // Resolución Final

// Obtener todos los registros de resolucion_final
async consultaTodoRF(peticiones, respuestas) {
  try {
    const { rows } = await pool.query('SELECT * FROM resolucion_final');
    respuestas.json(rows);
  } catch (error) {
    console.error(error);
    respuestas.status(500).json({ error: 'Error al consultar los datos.' });
  }
}

// Obtener un registro específico de resolucion_final por código
async consultaUnoRF(peticiones, respuestas) {
  const { codigo } = peticiones.params;
  try {
    const { rows } = await pool.query('SELECT * FROM resolucion_final WHERE codigo = $1', [codigo]);
    if (rows.length === 0) {
      return respuestas.status(404).json({ error: 'Registro no encontrado.' });
    }
    respuestas.json(rows[0]);
  } catch (error) {
    console.error(error);
    respuestas.status(500).json({ error: 'Error al consultar el dato.' });
  }
}

async editarRF(peticiones, respuestas) {
  const { codigo } = peticiones.params;
  const {
    nam, memo_inforjuri_rf, fecha_memo_inforjuri_rf,
    of_rf_uerb, fecha_of_rf_uerb, rf_shot, fecha_rf_shot,
    of_inscriprf_uerb, fechaof_inscriprf_uerb, of_ra_inscrip_rf_rp,
    razon_inscrip, fecha_razon_inscrip_rp, of_certificacion_rf_uerb,
    fechaof_certificacion_rf_uerb, of_certificacion_shot, certificacion_shot,
    fecha_certificacion_shot, observ,
  } = peticiones.body;

  try {
    const query = `UPDATE resolucion_final SET nam = $1, memo_inforjuri_rf = $2, fecha_memo_inforjuri_rf = $3, 
    of_rf_uerb = $4, fecha_of_rf_uerb = $5, rf_shot = $6, fecha_rf_shot = $7, of_inscriprf_uerb = $8, 
    fechaof_inscriprf_uerb = $9, of_ra_inscrip_rf_rp = $10, razon_inscrip = $11, fecha_razon_inscrip_rp = $12, 
    of_certificacion_rf_uerb = $13, fechaof_certificacion_rf_uerb = $14, of_certificacion_shot = $15, 
    certificacion_shot = $16, fecha_certificacion_shot = $17, observ = $18 WHERE codigo = $19`;

    const values = [
      nam, memo_inforjuri_rf, fecha_memo_inforjuri_rf, of_rf_uerb, fecha_of_rf_uerb,
      rf_shot, fecha_rf_shot, of_inscriprf_uerb, fechaof_inscriprf_uerb, of_ra_inscrip_rf_rp,
      razon_inscrip, fecha_razon_inscrip_rp, of_certificacion_rf_uerb, fechaof_certificacion_rf_uerb,
      of_certificacion_shot, certificacion_shot, fecha_certificacion_shot, observ, codigo,
    ];

    const { rowCount } = await pool.query(query, values);

    if (rowCount === 0) {
      return respuestas.status(404).json({ error: 'Registro no encontrado.' });
    }

    respuestas.json({ message: 'Registro actualizado correctamente.', rowCount });
  } catch (error) {
    console.error(error);
    respuestas.status(500).json({ error: 'Error al actualizar el registro.' });
  }
}

    //Rezagados
  async listRezagados (peticiones, respuestas) {
    try{
      const {rows} = await pool.query('select * from rezagados');
      respuestas.json(rows);
    } catch (error){ 
      console.error(error);
      respuestas.status(500).json({error: 'Error al consultar datos'});
     }
  }

  //Rezagados obtener uno
  async obtenerUnoRezagados (peticiones, respuestas){
    const { codigo } = peticiones.params;
    try{
      const {rows} = await pool.query('select * from rezagados where codigo = $1',[codigo]);
      if (rows.length===0){
        return respuestas.status(404).json({error:'Registro no encontrado'});
      }respuestas.json(rows[0]);        
    }catch{
      console.error(error);
      respuestas.status(500).json({error:'Error al consultar este dato'});
    }
  }

  //Editar Rezagados
  async EditarRezagados (peticiones, respuestas){
    const {codigo} =peticiones.params;
    const {nam, num_lotes, of_cg_uerb, fecha_of_cg_uerb, of_cg_rpdmq, fecha_of_cg_rpdmq, num_cg, fecha_cg, memo_infjuri_rfr_uerb, fecha_memo_infjuri_rfr_uerb, 
      of_rfr_uerb, fecha_of_rfr_uerb, rfr_shot, fecha_rfr_shot, of_uerb_insc_rfr, fecha_of_uerb_insc_rfr, of_ri_rfr_rpdmq, fecha_of_ri_rfr_rpdmq, 
      razon_insc_rfr, fecha_razon_insc_rfr, of_certif_rfr_uerb, fecha_of_certif_rfr_uerb, of_certif_rfr_shot, certif_shot, 
      fecha_certif_shot, finalizado} = peticiones.body;
    try{
      const query= `update rezagados set nam=$1, num_lotes=$2, of_cg_uerb=$3, fecha_of_cg_uerb=$4, of_cg_rpdmq=$5, fecha_of_cg_rpdmq=$6, num_cg=$7, fecha_cg=$8, memo_infjuri_rfr_uerb=$9, fecha_memo_infjuri_rfr_uerb=$10,
      of_rfr_uerb=$11, fecha_of_rfr_uerb=$12, rfr_shot =$13, fecha_rfr_shot=$14, of_uerb_insc_rfr=$15, fecha_of_uerb_insc_rfr=$16, of_ri_rfr_rpdmq=$17, fecha_of_ri_rfr_rpdmq=$18, 
      razon_insc_rfr=$19, fecha_razon_insc_rfr=$20, of_certif_rfr_uerb=$21, fecha_of_certif_rfr_uerb=$22, of_certif_rfr_shot=$23, certif_shot=$24, fecha_certif_shot=$25, finalizado=$26 where codigo=$27`;

      const values = [nam, parseInt(num_lotes) || 0, of_cg_uerb, fecha_of_cg_uerb, of_cg_rpdmq, fecha_of_cg_rpdmq, num_cg, fecha_cg, memo_infjuri_rfr_uerb, fecha_memo_infjuri_rfr_uerb, 
        of_rfr_uerb, fecha_of_rfr_uerb, rfr_shot, fecha_rfr_shot, of_uerb_insc_rfr, fecha_of_uerb_insc_rfr, of_ri_rfr_rpdmq, fecha_of_ri_rfr_rpdmq, 
        razon_insc_rfr, fecha_razon_insc_rfr, of_certif_rfr_uerb, fecha_of_certif_rfr_uerb, of_certif_rfr_shot, certif_shot, 
        fecha_certif_shot, finalizado, codigo];

        const {rowCount} = await pool.query (query, values)
        if (rowCount ===0){
          return console.respuestas.status(404).json({error: 'No existen registros'});
        } respuestas.json ({menssage: 'Actualizado con existo', rowCount});
    }catch {
      console.error(error)
      respuestas.status(500).json({error:'Error en actualización'})
    }
  }

      //Escrituras Individuales
      async listEscritura_individual (peticiones, respuestas) {
        try{
          const {rows} = await pool.query('select * from escrituras_individuales');
          respuestas.json(rows);
        } catch (error){ 
          console.error(error);
          respuestas.status(500).json({error: 'Error al consultar datos'});
         }
      }
    
      //Escritura Individual obtener uno
      async obtenerUnoEscritura_individual (peticiones, respuestas){
        const { codigo } = peticiones.params;
        try{
          const {rows} = await pool.query('select * from escrituras_individuales where codigo = $1',[codigo]);
          if (rows.length===0){
            return respuestas.status(404).json({error:'Registro no encontrado'});
          }respuestas.json(rows[0]);        
        }catch{
          console.error(error);
          respuestas.status(500).json({error:'Error al consultar este dato'});
        }
      }
    
      //Editar Escritura Individual
      async EditarEscritura_individual (peticiones, respuestas){
        const {codigo} =peticiones.params;
        const {nam, num_lotes, of_cg_uerb, fecha_of_cg_uerb, of_cg_rpdmq, fecha_of_cg_rpdmq, num_cg, fecha_cg, memo_infjuri_rfr_uerb, fecha_memo_infjuri_rfr_uerb, 
          of_rfr_uerb, fecha_of_rfr_uerb, rfr_shot, fecha_rfr_shot, of_uerb_insc_rfr, fecha_of_uerb_insc_rfr, of_ri_rfr_rpdmq, fecha_of_ri_rfr_rpdmq, 
          razon_insc_rfr, fecha_razon_insc_rfr, of_certif_rfr_uerb, fecha_of_certif_rfr_uerb, of_certif_rfr_shot, certif_shot, 
          fecha_certif_shot, finalizado} = peticiones.body;
        try{
          const query= `update escrituras_individuales set nam=$1, num_lotes=$2, of_cg_uerb=$3, fecha_of_cg_uerb=$4, of_cg_rpdmq=$5, fecha_of_cg_rpdmq=$6, num_cg=$7, fecha_cg=$8, memo_infjuri_rfr_uerb=$9, fecha_memo_infjuri_rfr_uerb=$10,
          of_rfr_uerb=$11, fecha_of_rfr_uerb=$12, rfr_shot =$13, fecha_rfr_shot=$14, of_uerb_insc_rfr=$15, fecha_of_uerb_insc_rfr=$16, of_ri_rfr_rpdmq=$17, fecha_of_ri_rfr_rpdmq=$18, 
          razon_insc_rfr=$19, fecha_razon_insc_rfr=$20, of_certif_rfr_uerb=$21, fecha_of_certif_rfr_uerb=$22, of_certif_rfr_shot=$23, certif_shot=$24, fecha_certif_shot=$25, finalizado=$26 where codigo=$27`;
    
          const values = [nam, parseInt(num_lotes) || 0, of_cg_uerb, fecha_of_cg_uerb, of_cg_rpdmq, fecha_of_cg_rpdmq, num_cg, fecha_cg, memo_infjuri_rfr_uerb, fecha_memo_infjuri_rfr_uerb, 
            of_rfr_uerb, fecha_of_rfr_uerb, rfr_shot, fecha_rfr_shot, of_uerb_insc_rfr, fecha_of_uerb_insc_rfr, of_ri_rfr_rpdmq, fecha_of_ri_rfr_rpdmq, 
            razon_insc_rfr, fecha_razon_insc_rfr, of_certif_rfr_uerb, fecha_of_certif_rfr_uerb, of_certif_rfr_shot, certif_shot, 
            fecha_certif_shot, finalizado, codigo];
    
            const {rowCount} = await pool.query (query, values)
            if (rowCount ===0){
              return console.respuestas.status(404).json({error: 'No existen registros'});
            } respuestas.json ({menssage: 'Actualizado con existo', rowCount});
        }catch {
          console.error(error)
          respuestas.status(500).json({error:'Error en actualización'})
        }
      }

  //Mapa
  async obtenerPoligonos(peticiones, respuestas) {
    try {
      const query = `
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(
          json_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(geom)::json, -- Convertir a JSON
            'properties', json_build_object('nam', nam, 'codigo', codigo)
          )
        )
      ) AS geojson
      FROM public."Total_AHHC_ene2025"
        ` ;
    // Usamos `await` para manejar la consulta correctamente
    const result = await pool.query(query);

    // Asegurar que `geojson` sea un objeto válido antes de enviarlo
    const geojson = result.rows[0]?.geojson || { type: "FeatureCollection", features: [] };

    respuestas.json(geojson); // Enviar GeoJSON correctamente
  } catch (error) {
    console.error("Error al obtener los polígonos:", error);
    respuestas.status(500).json({ error: "Error al obtener los polígonos" });
  }
}
  //Mapa_titulos 2025
  async obtenerPoligonos_titulos(peticiones, respuestas) {
    try {
      const query = `
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(
          json_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(geom)::json, -- Convertir a JSON
            'properties', json_build_object('nam', nam, 'codigo', codigo, 'Ahhc_titul', Ahhc_titul )
          )
        )
      ) AS geojson
      FROM public."Titulos_may2025"
        ` ;
    // Usamos `await` para manejar la consulta correctamente
    const result = await pool.query(query);

    // Asegurar que `geojson` sea un objeto válido antes de enviarlo
    const geojson = result.rows[0]?.geojson || { type: "FeatureCollection", features: [] };

    respuestas.json(geojson); // Enviar GeoJSON correctamente
  } catch (error) {
    console.error("Error al obtener los polígonos:", error);
    respuestas.status(500).json({ error: "Error al obtener los polígonos" });
  }
}

 //LogIn
  async LogIn(peticiones, respuestas) {
    const { username, password } = peticiones.body;
    try {
      // Verificar si el usuario existe en la base de datos
      const result = await pool.query(
        "SELECT validar_usuario($1, $2) AS is_valid",
        [username, password]
      );

      if (result.rows[0].is_valid) {
        peticiones.session.user = { username };
        respuestas.json({ message: "Sesión iniciada", user: peticiones.session.user });
      } else {
        respuestas.status(401).json({ message: "No autorizado" });
      }
    } catch (error) {
      console.error('Error ejecutando la consulta:', error);
      respuestas.status(500).json({ message: "Error interno del servidor" });
    }

    }   
}


module.exports = new CategoriaControlador();

