//KÆMPE BALLER SIDE
//Vi kan nærmest kalde det her vores backend, den har alt godt fra havet som vi ender med at bruge i resten af koden.


const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Vi connecter satme til vores database
const connection = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root',
  password: 'Sodabobs123?',
  database: 'calendar_db'
});


// Her sørger vi får at den er connected
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

//API for at få data fra database
app.get('/api/get_events1', (req, res) => {
  connection.query('SELECT * FROM events1', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json(results);
    }
  });
});

//API for at få data fra database
app.get('/api/get_events2', (req, res) => {
  connection.query('SELECT * FROM events2', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json(results);
    }
  });
});

//API for at få data fra database
app.get('/api/get_events3', (req, res) => {
  connection.query('SELECT * FROM events3', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json(results);
    }
  });
});

//API for at få data fra database
app.get('/api/get_events4', (req, res) => {
  connection.query('SELECT * FROM events4', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json(results);
    }
  });
});

//API for at få data fra database
app.get('/api/get_events5', (req, res) => {
  connection.query('SELECT * FROM events5', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json(results);
    }
  });
});

//API for at få data fra database
app.get('/api/get_events6', (req, res) => {
  connection.query('SELECT * FROM events6', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json(results);
    }
  });
});

//API for at få data fra database
app.get('/api/get_events7', (req, res) => {
  connection.query('SELECT * FROM events7', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json(results);
    }
  });
});

//API for at få data fra database
app.get('/api/get_events8', (req, res) => {
  connection.query('SELECT * FROM events8', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json(results);
    }
  });
});

//API for at få data fra database
app.get('/api/get_opslagstavle', (req, res) => {
  connection.query('SELECT * FROM opslagstavle', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json(results);
    }
  });
});

//API for at få data fra database
app.get('/api/signup', (req, res) => {
  connection.query('SELECT * FROM login', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json(results);
    }
  });
});

//API for at få data fra database
app.get('/api/get_find_band', (req, res) => {
  connection.query('SELECT * FROM find_band', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json(results);
    }
  });
});

//API for at få data fra database
app.get('/api/login', (req, res) => {
  connection.query('SELECT * FROM login', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json(results);
    }
  });
});

//API for at få data fra database
app.get('/api/get_faste_tider', (req, res) => {
  connection.query('SELECT * FROM faste_tider', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json(results);
    }
  });
}); 

//API for at få data fra database
app.post('/api/login', async (req, res) => {
  const { login, kodeord } = req.body;

  if (!login || !kodeord) {
    return res.status(400).json({ error: 'Login and password are required.' });
  }

  const sql = 'SELECT * FROM login WHERE login = ? AND kodeord = ?';
  connection.query(sql, [login, kodeord], (err, results) => {
    if (err) {
      console.error('Database error during login:', err);
      return res.status(500).json({ error: 'Database error during login.' });
    }

    if (results.length > 0) {
      // User fundet suiiii!
      res.json({ message: 'Login successful' });
    } else {
      // Der blev ikke fundet din bruger #sad
      res.status(401).json({ error: 'Invalid login credentials.' }); 
    }
  });
});



//APIs til at sende TIL databasen 
app.post('/api/events1', (req, res) => {
  console.log("luder skvinde");
  const { title, event_date, start_time, end_time, tlf_nr, bank_pa, description } = req.body

  console.log("det her sender vi", req.body);
  const sql = 'INSERT INTO events1 (title, event_date, start_time, end_time, tlf_nr, bank_pa, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [title, event_date, start_time, end_time, tlf_nr, bank_pa, description], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json({ message: 'event inserted', event_title: results.title});
      console.log(results);
    }
  });
});

//APIs til at sende TIL databasen 
app.post('/api/events2', (req, res) => {
  console.log("luder skvinde");
  const { title, event_date, start_time, end_time, tlf_nr, bank_pa, description } = req.body

  console.log("det her sender vi", req.body);
  const sql = 'INSERT INTO events2 (title, event_date, start_time, end_time, tlf_nr, bank_pa, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [title, event_date, start_time, end_time, tlf_nr, bank_pa, description], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json({ message: 'event inserted', event_title: results.title});
      console.log(results);
    }
  });
});

//APIs til at sende TIL databasen 
app.post('/api/events3', (req, res) => {
  console.log("luder skvinde");
  const { title, event_date, start_time, end_time, tlf_nr, bank_pa, description } = req.body

  console.log("det her sender vi", req.body);
  const sql = 'INSERT INTO events3 (title, event_date, start_time, end_time, tlf_nr, bank_pa, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [title, event_date, start_time, end_time, tlf_nr, bank_pa, description], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json({ message: 'event inserted', event_title: results.title});
      console.log(results);
    }
  });
});

//APIs til at sende TIL databasen 
app.post('/api/events4', (req, res) => {
  console.log("luder skvinde");
  const { title, event_date, start_time, end_time, tlf_nr, bank_pa, description } = req.body

  console.log("det her sender vi", req.body);
  const sql = 'INSERT INTO events4 (title, event_date, start_time, end_time, tlf_nr, bank_pa, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [title, event_date, start_time, end_time, tlf_nr, bank_pa, description], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json({ message: 'event inserted', event_title: results.title});
      console.log(results);
    }
  });
});

//APIs til at sende TIL databasen 
app.post('/api/events5', (req, res) => {
  console.log("luder skvinde");
  const { title, event_date, start_time, end_time, tlf_nr, bank_pa, description } = req.body

  console.log("det her sender vi", req.body);
  const sql = 'INSERT INTO events5 (title, event_date, start_time, end_time, tlf_nr, bank_pa, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [title, event_date, start_time, end_time, tlf_nr, bank_pa, description], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json({ message: 'event inserted', event_title: results.title});
      console.log(results);
    }
  });
});

//APIs til at sende TIL databasen 
app.post('/api/events6', (req, res) => {
  console.log("luder skvinde");
  const { title, event_date, start_time, end_time, tlf_nr, bank_pa, description } = req.body

  console.log("det her sender vi", req.body);
  const sql = 'INSERT INTO events6 (title, event_date, start_time, end_time, tlf_nr, bank_pa, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [title, event_date, start_time, end_time, tlf_nr, bank_pa, description], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json({ message: 'event inserted', event_title: results.title});
      console.log(results);
    }
  });
});

//APIs til at sende TIL databasen 
app.post('/api/events7', (req, res) => {
  console.log("luder skvinde");
  const { title, event_date, start_time, end_time, tlf_nr, bank_pa, description } = req.body

  console.log("det her sender vi", req.body);
  const sql = 'INSERT INTO events7 (title, event_date, start_time, end_time, tlf_nr, bank_pa, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [title, event_date, start_time, end_time, tlf_nr, bank_pa, description], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json({ message: 'event inserted', event_title: results.title});
      console.log(results);
    }
  });
});

//APIs til at sende TIL databasen 
app.post('/api/events8', (req, res) => {
  console.log("luder skvinde");
  const { title, event_date, start_time, end_time, tlf_nr, bank_pa, description } = req.body

  console.log("det her sender vi", req.body);
  const sql = 'INSERT INTO events8 (title, event_date, start_time, end_time, tlf_nr, bank_pa, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [title, event_date, start_time, end_time, tlf_nr, bank_pa, description], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json({ message: 'event inserted', event_title: results.title});
      console.log(results);
    }
  });
});

//APIs til at sende TIL databasen 
app.post('/api/opslagstavle', (req, res) => {
  console.log("luder skvinde");
  const { title, content, time, date} = req.body

  console.log("det her sender vi", req.body);
  const sql = 'INSERT INTO opslagstavle (title, content, time, date) VALUES (?, ?, ?, ?)';
  connection.query(sql, [title, content, time, date], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json({ message: 'event inserted', title: results.title});
      console.log(results);
    }
  });
});

//APIs til at sende TIL databasen 
app.post('/api/find_band', (req, res) => {
  console.log("luder skvinde");
  const { soeger_band, soeger_medlemmer, title, tlf_nr, mail, time, date} = req.body

  console.log("det her sender vi", req.body);
  const sql = 'INSERT INTO find_band (soeger_band, soeger_medlemmer, title, tlf_nr, mail, time, date) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [soeger_band, soeger_medlemmer, title, tlf_nr, mail, time, date], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json({ message: 'event inserted', title: results.title});
      console.log(results);
    }
  });
});

//APIs til at sende TIL databasen 
app.post('/api/signup', (req, res) => {
  const { login, kodeord, adminid, navn, tlfnummer, lokale1, lokale2, lokale3, lokale4, lokale5, lokale6, lokale7, lokale8} = req.body;

  if (!login || !kodeord || !navn || !tlfnummer) {
    return res.status(400).json({ error: 'login and kodeord are required' });
  }

  const sql = 'INSERT INTO login (login, kodeord, adminid, navn, tlfnummer, lokale1, lokale2, lokale3, lokale4, lokale5, lokale6, lokale7, lokale8) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [login, kodeord, adminid, navn, tlfnummer, lokale1, lokale2, lokale3, lokale4, lokale5, lokale6, lokale7, lokale8], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
  });
});



//APIs til at sende TIL databasen 
app.post('/api/faste_tider', (req, res) => {
  console.log("luder skvinde");
  const { title, lokale, tlf_nr, day, start_time, end_time, bank_pa} = req.body

  console.log("det her sender vi", req.body);
  const sql = 'INSERT INTO faste_tider (title, lokale, tlf_nr, day, start_time, end_time, bank_pa) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [title, lokale, tlf_nr, day, start_time, end_time, bank_pa], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json({ message: 'event inserted', title: results.title});
      console.log(results);
    }
  });
});

//API til at hente data fra database
app.get('/api/getPersonInfo', (req, res) => {
  console.log("Henter information om personer...");
  

  const sql = 'SELECT navn, tlfnummer, id FROM login';

  connection.query(sql, (err, results) => {
    if (err) {
      console.log('Database fejl:', err);
      return res.status(500).json({ error: 'Database fejl' });
    }

    console.log("Resultater fra forespørgslen:", results);

    if (results.length > 0) {
      res.json(results); 
    } else {
      res.json([]);
    }
  });
});

//API til at slette en bruger
app.delete('/api/deleteUser/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'DELETE FROM login WHERE id = ?';

  connection.query(sql, [userId], (err, result) => {
      if (err) {
          console.error('Error deleting user:', err);
          return res.status(500).json({ error: 'Database error' });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
  });
});


//API til at slette fra oplslagstavle
app.delete('/api/opslagstavle/:id', (req, res) => {
  const postId = req.params.id;
  const sql = 'DELETE FROM opslagstavle WHERE id = ?';

  connection.query(sql, [postId], (err, result) => {
      if (err) {
          console.error('Error deleting post:', err);
          return res.status(500).json({ error: 'Database error' });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
  });
});

//API til at slette fra find_band
app.delete('/api/find_band/:id', (req, res) => {
  const postId = req.params.id;
  const sql = 'DELETE FROM find_band WHERE id = ?'; 

  connection.query(sql, [postId], (err, results) => {
      if (err) {
          console.error('Database error deleting post:', err);
          return res.status(500).json({ error: 'Database error deleting post' });
      }

      if (results.affectedRows > 0) {
          res.json({ message: `Post with ID ${postId} deleted successfully` });
      } else {
          res.status(404).json({ error: `Post with ID ${postId} not found` });
      }
  });
});

//API til at slette fra events
app.delete('/api/events1/:id', (req, res) => {
  const bookingId = req.params.id;
  const sql = 'DELETE FROM events1 WHERE id = ?'; 

  connection.query(sql, [bookingId], (err, results) => {
      if (err) {
          console.error('Database error deleting post:', err);
          return res.status(500).json({ error: 'Database error deleting post' });
      }

      if (results.affectedRows > 0) {
          res.json({ message: `Post with ID ${bookingId} deleted successfully` });
      } else {
          res.status(404).json({ error: `Post with ID ${bookingId} not found` });
      }
  });
});

//API til at slette fra events
app.delete('/api/events2/:id', (req, res) => {
  const bookingId = req.params.id;
  const sql = 'DELETE FROM events2 WHERE id = ?'; 

  connection.query(sql, [bookingId], (err, results) => {
      if (err) {
          console.error('Database error deleting post:', err);
          return res.status(500).json({ error: 'Database error deleting post' });
      }

      if (results.affectedRows > 0) {
          res.json({ message: `Post with ID ${bookingId} deleted successfully` });
      } else {
          res.status(404).json({ error: `Post with ID ${bookingId} not found` });
      }
  });
});

//API til at slette fra events
app.delete('/api/events3/:id', (req, res) => {
  const bookingId = req.params.id;
  const sql = 'DELETE FROM events3 WHERE id = ?'; 

  connection.query(sql, [bookingId], (err, results) => {
      if (err) {
          console.error('Database error deleting post:', err);
          return res.status(500).json({ error: 'Database error deleting post' });
      }

      if (results.affectedRows > 0) {
          res.json({ message: `Post with ID ${bookingId} deleted successfully` });
      } else {
          res.status(404).json({ error: `Post with ID ${bookingId} not found` });
      }
  });
});

//API til at slette fra events
app.delete('/api/events4/:id', (req, res) => {
  const bookingId = req.params.id;
  const sql = 'DELETE FROM events4 WHERE id = ?'; 

  connection.query(sql, [bookingId], (err, results) => {
      if (err) {
          console.error('Database error deleting post:', err);
          return res.status(500).json({ error: 'Database error deleting post' });
      }

      if (results.affectedRows > 0) {
          res.json({ message: `Post with ID ${bookingId} deleted successfully` });
      } else {
          res.status(404).json({ error: `Post with ID ${bookingId} not found` });
      }
  });
});

//API til at slette fra events
app.delete('/api/events5/:id', (req, res) => {
  const bookingId = req.params.id;
  const sql = 'DELETE FROM events5 WHERE id = ?'; 

  connection.query(sql, [bookingId], (err, results) => {
      if (err) {
          console.error('Database error deleting post:', err);
          return res.status(500).json({ error: 'Database error deleting post' });
      }

      if (results.affectedRows > 0) {
          res.json({ message: `Post with ID ${bookingId} deleted successfully` });
      } else {
          res.status(404).json({ error: `Post with ID ${bookingId} not found` });
      }
  });
});

//API til at slette fra events
app.delete('/api/events6/:id', (req, res) => {
  const bookingId = req.params.id;
  const sql = 'DELETE FROM events6 WHERE id = ?'; 

  connection.query(sql, [bookingId], (err, results) => {
      if (err) {
          console.error('Database error deleting post:', err);
          return res.status(500).json({ error: 'Database error deleting post' });
      }

      if (results.affectedRows > 0) {
          res.json({ message: `Post with ID ${bookingId} deleted successfully` });
      } else {
          res.status(404).json({ error: `Post with ID ${bookingId} not found` });
      }
  });
});

//API til at slette fra events
app.delete('/api/events7/:id', (req, res) => {
  const bookingId = req.params.id;
  const sql = 'DELETE FROM events7 WHERE id = ?'; 

  connection.query(sql, [bookingId], (err, results) => {
      if (err) {
          console.error('Database error deleting post:', err);
          return res.status(500).json({ error: 'Database error deleting post' });
      }

      if (results.affectedRows > 0) {
          res.json({ message: `Post with ID ${bookingId} deleted successfully` });
      } else {
          res.status(404).json({ error: `Post with ID ${bookingId} not found` });
      }
  });
});

//API til at slette fra events
app.delete('/api/events8/:id', (req, res) => {
  const bookingId = req.params.id;
  const sql = 'DELETE FROM events8 WHERE id = ?'; 

  connection.query(sql, [bookingId], (err, results) => {
      if (err) {
          console.error('Database error deleting post:', err);
          return res.status(500).json({ error: 'Database error deleting post' });
      }

      if (results.affectedRows > 0) {
          res.json({ message: `Post with ID ${bookingId} deleted successfully` });
      } else {
          res.status(404).json({ error: `Post with ID ${bookingId} not found` });
      }
  });
});

//Starter serveren og gør det muligt for den at lytte til requests :)
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


