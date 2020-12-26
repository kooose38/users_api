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
   }

})();