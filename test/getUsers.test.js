const assert = require("power-assert");
const Users = require("../routers/controller");
const Helper = require("./helper/requestHelper")

const getUsers = async () => {
   const res = await Helper.request({
      method: "get",
      endPoint: "/api/users",
      statusCode: 200,
   })

   return res.body;
};

describe("get ALL users", () => {
   it("function", () => {
      assert.equal(typeof Users.getUsers === "function", true)
   });
   it("戻り値は正しいか？", async () => {
      const users = await getUsers();

      assert.equal(Array.isArray(users), true);
      users.forEach(user => {
         assert.equal(typeof user.id === "number", true)
         assert.equal(typeof user.name === "string", true)
         assert.equal(typeof user.profile === "string", true)
         assert.equal(typeof user.created_at === "string", true)
         assert.equal(typeof user.updated_at === "string", true)
         assert.equal(typeof user.date_of_birth === "string", true)
      })
   })
})

