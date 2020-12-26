const assert = require("power-assert");
const Helper = require("./helper/requestHelper")

const INVARID_ID = 999999;
const currentId = 1;

const getUsers = async () => {
   const res = await Helper.request({
      method: "get",
      endPoint: "/api/users",
      statusCode: 200,
   })

   return res.body;
};

describe("DELETE test", () => {
   it("存在しないユーザーへの削除処理", async () => {
      const res = await Helper.request({
         method: "delete",
         endPoint: `/api/users/${INVARID_ID}`,
         statusCode: 400
      })

      assert.equal(res.body[0].message, "ユーザーが存在しません")
   });

   it("正常テスト", async () => {
      const oldUsers = await getUsers();
      const res = await Helper.request({
         method: "delete",
         endPoint: `/api/users/${currentId}`,
         statusCode: 200
      });

      const newUsers = await getUsers()

      assert.deepEqual(res.body, {
         message: "削除しました"
      });
      assert.equal(oldUsers.length - 1, newUsers.length);
      assert.notDeepEqual(oldUsers[currentId - 1], newUsers[currentId - 1]);
   })
})