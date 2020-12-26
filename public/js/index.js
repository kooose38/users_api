(() => {
   const path = window.location.pathname;

   switch (path) {
      case "/":
         const btn = document.getElementById("search-btn")
         btn.addEventListener("click", async () => {
            await search.seachUsers();
         });

         return users.getUsers();

      case "/create.html":
         document.getElementById("save-btn").addEventListener("click", async () => {
            await users.createUser();
         })
         document.getElementById("cancel-btn").addEventListener("click", () => {
            return window.location.href = "/"
         })
         break;

      case "/edit.html":
         const id = window.location.search.split("?id=")[1];

         document.getElementById("save-btn").addEventListener("click", async () => {
            await users.saveUser(id);
         })
         document.getElementById("cancel-btn").addEventListener("click", () => {
            return window.location.href = "/"
         })
         document.getElementById("delete-btn").addEventListener("click", async () => {
            await users.removeUser(id)
         })

         return users.setUsers(id)

      default:
         break;

   }

})();