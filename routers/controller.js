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

const runDB = async (sql, res, message) => {
   return new Promise((resolve, reject) => {
      db.run(sql, (err) => {
         if (err) {
            res.status(500).json([{ message: "処理失敗" }, { statusCode: 500 }]);
            return reject();
         } else {
            res.status(200).json({ message: message });
            return resolve();
         }
      })
   })
};


module.exports = {
   //全GET
   getUsers: async (req, res) => {
      await db.all(`SELECT * FROM users`, (err, rows) => {
         if (!err) {
            res.status(200).json(rows)
         } else {
            res.status(400).json({ message: "ユーザーが存在しません" })
         }
      })
   },
   //単一GET
   getUser: async (req, res) => {
      const id = req.params.id;
      await db.get(`select * from users where id = ${id}`, (err, row) => {
         if (!err) {
            res.status(200).json(row)
         } else {
            res.status(400) / json({ message: "ユーザーが存在しません" });
         }
      })
   },
   //queryより検索表示
   serchUser: async (req, res) => {
      const oldquery = req.query.q;
      const query = getAsString(oldquery)

      await db.all(`select * from users where name LIKE "%${query}%"`, (err, rows) => {
         if (!err) {
            res.status(200).json(rows);
         } else {
            res.status(400).json({ message: "ユーザーが存在しません" });
         }
      })
   },
   //post
   createUser: async (req, res) => {
      const name = req.body.name;
      if (!name) {
         res.status(400).json([{ message: "名前を入力してください" }, { statusCode: 400 }])
         return;
      }
      const profile = req.body.profile ? req.body.profile : "";
      const date_of_birth = req.body.date_of_birth ? req.body.date_of_birth : "";

      await runDB(
         `INSERT INTO users (name,profile,date_of_birth) VALUES ("${name}","${profile}","${date_of_birth}")`,
         res,
         "作成しました"
      )

      db.close();
   },
   //put
   updatedUser: async (req, res) => {
      const id = req.params.id;

      await db.get(`select * from users where id = ${id}`, async (err, row) => {
         if (!err && row) {
            const name = req.body.name ? req.body.name : row.name;
            const profile = req.body.profile ? req.body.profile : row.profile;
            const date_of_birth = req.body.date_of_birth ? req.body.date_of_birth : row.date_of_birth;

            await runDB(
               `UPDATE users SET name="${name}" , profile="${profile}",date_of_birth="${date_of_birth}" where id=${id}`,
               res,
               "更新しました"
            )
            db.close();
         } else {
            res.status(400).json([{ message: "ユーザーが存在しません" }, { statusCode: 400 }])
         }

      })
   },
   //delete
   removeUser: async (req, res) => {
      const id = req.params.id;

      await db.get(`select * from users where id =${id}`, (err, row) => {
         if (err) {
            res.status(400).json([{ message: "ユーザーが存在しません" }, { statusCode: 400 }])
            return;
         }
      })

      await runDB(
         `DELETE from users where id = ${id}`,
         res,
         "削除しました"
      )

      db.close();
   },

}