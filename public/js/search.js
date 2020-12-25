const search = (() => {
   const url = "http://localhost:5001/api/search";

   return {
      seachUsers: async () => {

         const query = document.getElementById("search").value;
         if (query === "") {
            alert("必須項目です。")
            return;
         }
         const res = await fetch(url + "?q=" + query);
         const users = await res.json();

         let body = "";

         users.forEach(user => {
            body += `<tr>
            <th>${user.id}</th>
            <th>${user.name}</th>
            <th>${user.profile}</th>
            <th>${user.date_of_birth}</th>
            <th>${user.created_at}</th>
            <th>${user.updated_at}</th>
         </tr>`
         })
         const list = document.getElementById("list");
         list.innerHTML = body;
      },

   }

})()