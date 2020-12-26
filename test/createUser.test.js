const assert = require("power-assert");
const Helper = require("./helper/requestHelper")


const getUsers = async () => {
   const res = await Helper.request({
      method: "get",
      endPoint: "/api/users",
      statusCode: 200,
   })

   return res.body;
};

describe("POST test", () => {
   it("nameがない", async () => {
      const data = {
         name: null || undefined,
      };
      const res = await Helper.request({
         method: "post",
         endPoint: "/api/users",
         statusCode: 400
      }).send(data);

      assert.equal(res.body[0].message, "名前を入力してください");
   })

   it("正常テスト", async () => {
      const oldUsers = await getUsers()
      const data = {
         name: "dummy",
         profile: "dammy",
         date_of_birth: "dammy"
      };
      const res = await Helper.request({
         method: "post",
         endPoint: "/api/users",
         statusCode: 200
      }).send(data);

      const newUsers = await getUsers()

      assert.deepEqual(res.body, {
         message: "作成しました"
      });
      assert.equal(oldUsers.length + 1, newUsers.length);
   })
})