const express = require("express");
const sql = require('mssql');
const cors = require("cors");
const bcrypt = require('bcryptjs');
const app = express();

app.use(express.json());
app.use(cors());

const dbConfig = {
  server: '-', 
  database: 'VePelis',
  options: {
    encrypt: false, 
    trustServerCertificate: true,
  },
  authentication: {
    type: 'ntlm', 
    options: {
      userName: '-',
      password: '-',
      domain: '-',
    },
  },
};

// Ruta para registro
app.post("/register", async (req, res) => {
  console.log("Datos recibidos:", req.body);
  const { email, password, name, username, dni, age, country } = req.body;

  if (!email || !password || !name || !username || !dni || !age || !country) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }
  try {
    const pool = await sql.connect(dbConfig);

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (email, password, name, username, dni, age, country)
              VALUES (@Email, @Password, @Name, @Username, @Dni, @Age, @Country)`;

    await pool.request()
      .input("Email", sql.NVarChar(255), email)
      .input("Password", sql.NVarChar(255), hashedPassword)
      .input("Name", sql.NVarChar(50), name)
      .input("Username", sql.NVarChar(50), username)
      .input("Dni", sql.Char(8), dni)
      .input("Age", sql.Int, age)
      .input("Country", sql.NVarChar(100), country)
      .query(query);

    res.status(201).json({ message: "Usuario registrado exitosamente." });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

// Ruta para inicio de sesión
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Por favor, ingresa el email y la contraseña." });
  }

  try {
    const pool = await sql.connect(dbConfig);

    const result = await pool.request()
      .input("Email", sql.NVarChar(255), email)
      .query("SELECT * FROM users WHERE email = @Email");

    const user = result.recordset[0];

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

// Ruta GET para obtener usuarios
app.get("/users", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM users");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

// Ruta PUT para actualizar un usuario
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { email, password, name, username, dni, age, country } = req.body;

  if (!email || !password || !name || !username || !dni || !age || !country) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
      const pool = await sql.connect(dbConfig);

      // Hashear la contraseña si fue modificada
      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `
          UPDATE users
          SET email = @Email,
              password = @Password,
              name = @Name,
              username = @Username,
              dni = @Dni,
              age = @Age,
              country = @Country
          WHERE id = @Id
      `;

      const result = await pool.request()
          .input("Id", sql.Int, id)
          .input("Email", sql.NVarChar(255), email)
          .input("Password", sql.NVarChar(255), hashedPassword)
          .input("Name", sql.NVarChar(50), name)
          .input("Username", sql.NVarChar(50), username)
          .input("Dni", sql.Char(8), dni)
          .input("Age", sql.Int, age)
          .input("Country", sql.NVarChar(100), country)
          .query(query);

      if (result.rowsAffected[0] > 0) {
          res.status(200).json({ message: "Usuario actualizado exitosamente." });
      } else {
          res.status(404).json({ message: "Usuario no encontrado." });
      }
  } catch (error) {
      console.error("Error al actualizar usuario:", error);
      res.status(500).json({ message: "Error interno del servidor." });
  }
});


// Ruta DELETE para eliminar un usuario
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await sql.connect(dbConfig);

    // Ejecutamos la consulta DELETE
    const result = await pool.request()
      .input("Id", sql.Int, id)
      .query("DELETE FROM users WHERE id = @Id");

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
