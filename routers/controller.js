const sqlite3 = require("sqlite3");
const dbPath = "db.sqlite3";
const db = new sqlite3.Database(dbPath);

//queryが複数なら、string型で返す
const getAsString = (value) => {
   if (Array.isArray(value)) {
      return value[0];
   }
   return value;
};


module.exports = {
   //全GET
   getUsers: (req, res) => {
      db.all(`SELECT * FROM users`, (err, rows) => {
         if (!err && rows) {
            res.status(200).json(rows)
         } else {
            res.status(400).json({ message: err })
         }
      })
   },
   //単一GET
   getUser: (req, res) => {
      const id = req.params.id;
      db.get(`select * from users where id = ${id}`, (err, row) => {
         if (!err && row) {
            res.status(200).json(row)
         } else {
            res.status(400) / json({ message: err });
         }
      })
   },
   //queryより検索表示
   serchUser: (req, res) => {
      const oldquery = req.query.q;
      const query = getAsString(oldquery)

      db.all(`select * from users where name LIKE "%${query}%"`, (err, rows) => {
         if (!err && rows) {
            res.status(200).json(rows);
         } else {
            res.status(400).json({ message: err });
         }
      })
   },

}