const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

// Configuración de la base de datos
const dbConfig = {
  server: 'DSIROSITS16',
  database: 'Vepelis',
  user: 'JCAISIA',
  options: {
    trustedConnection: true, // Autenticación de Windows
    enableArithAbort: true,
  },
};

// Inicializar el servidor
const app = express();
app.use(bodyParser.json());
app.use(cors());  

// Endpoint para registrar un usuario
app.post('/register', async (req, res) => {
  const { email, password, name, username, dni, age, country } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input('email', sql.VarChar(50), email)
      .input('password', sql.VarChar(100), password)
      .input('name', sql.VarChar(50), name)
      .input('username', sql.VarChar(50), username)
      .input('dni', sql.VarChar(10), dni)
      .input('age', sql.Int, age)
      .input('country', sql.VarChar(50), country)
      .query(
        `INSERT INTO registro (email, password, name, username, dni, age, country)
        VALUES (@email, @password, @name, @username, @dni, @age, @country)`
      );

    res.status(201).send({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al registrar el usuario' });
  }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
