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

describe("PUT test", () => {
   it("存在しないユーザーへの更新処理", async () => {
      const data = {
         name: "dummy",
         profile: "dammy",
         date_of_birth: "dammy"
      };
      const res = await Helper.request({
         method: "put",
         endPoint: `/api/users/${INVARID_ID}`,
         statusCode: 400
      }).send(data);

      assert.equal(res.body[0].message, "ユーザーが存在しません");
   });

   it("正常テスト", async () => {
      const oldUsers = await getUsers();
      const data = {
         name: "dummy",
         profile: "dammy",
         date_of_birth: "dammy"
      };
      const res = await Helper.request({
         method: "put",
         endPoint: `/api/users/${currentId}`,
         statusCode: 200
      }).send(data);

      const newUsers = await getUsers();

      assert.deepEqual(res.body, {
         message: "更新しました"
      })

      assert.equal(oldUsers.length, newUsers.length);
      assert.equal(oldUsers[currentId - 1].updated_at < newUsers[currentId - 1].updated_at, true);
      assert.deepEqual(oldUsers[currentId - 1] !== newUsers[currentId - 1], true);
   });
})