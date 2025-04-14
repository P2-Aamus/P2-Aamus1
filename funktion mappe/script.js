/* document.addEventListener("DOMContentLoaded", () => {
    const noticeBoardButton = document.getElementById("noticeBoardButton");

    function openNoticeBoard() {
        let postsElement = document.getElementById('posts');
        let messageBoardElement = document.getElementById('messageBoard');

        // Example: Log the action to the console
        console.log("Notice board opened!");

        // Additional logic can be added here if needed
    }

    if (noticeBoardButton) {
        noticeBoardButton.addEventListener("click", openNoticeBoard);
    }

    // Removed redundant postForm handling logic since it is already implemented in tavle.js
}); */

const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Database connection configuration
const connection = mysql.createConnection({
  host: '127.0.0.1', // e.g., 'localhost' or an IP address
  user: 'root',
  password: 'Sodabobs123?',
  database: 'calendar_db'
});


// Establish the connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

//APIs to get data from the database
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


//APIs to post data to the database
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

app.post('/api/faste_tider', (req, res) => {
  console.log("luder skvinde");
  const { title, lokale, day, start_time, end_time} = req.body

  console.log("det her sender vi", req.body);
  const sql = 'INSERT INTO faste_tider (title, lokale, day, start_time, end_time) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [title, lokale, day, start_time, end_time], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'database error'})
    } else {
      res.json({ message: 'event inserted', title: results.title});
      console.log(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


/*
// Example: Inserting a new event
function insertEvent(title, event_date, start_time, end_time, description, callback) {
  const sql = 'INSERT INTO events1 (title, event_date, start_time, end_time, description) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [title, event_date, start_time, end_time, description], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
}

// Example: Retrieving all events
function getEvents(callback) {
  const sql = 'SELECT * FROM events';
  connection.query(sql, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
}


// Example usage of insertEvent
/*
insertEvent(
  'Antonio',
  '2024-12-25',
  '20:00:00',
  '24:00:00',
  'Discuss project updates',
  (err, results) => {
    if (err) {
      console.error('Error inserting event:', err);
      return;
    }
    console.log('Event inserted successfully:', results);
  }
);

//Example usage of getEvents
getEvents((err, results) => {
  if(err){
    console.error('Error getting events:', err);
    return;
  }
  console.log('Events retrieved:', results);
});

// Close the connection when done (important!)
// It is recommended to not close the connection after every query in a web application,
// but rather manage the connection pool. Closing here for simplicity of example.
// connection.end((err) => {
//   if (err) {
//     console.error('Error ending connection:', err);
//     return;
//   }
//   console.log('Connection closed');
// });
  

module.exports = {
  connection
}*/
