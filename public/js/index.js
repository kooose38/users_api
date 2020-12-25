(() => {
   const btn = document.getElementById("search-btn")
   btn.addEventListener("click", async () => {
      await search.seachUsers();
      console.log(search);
   });

   return users.getUsers();
})();