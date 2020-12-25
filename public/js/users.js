
const users = (() => {
   const url = `http://localhost:5001/api/users`;

   return {
      getUsers: async () => {

         const res = await fetch(url);
         const users = await res.json();
         const list = document.getElementById("list");
         let body = "";

         users.forEach(user => {
            body += `<tr>
               <th>${user.id}</th>
               <th>${user.name}</th>
               <th>${user.profile}</th>
               <th>${user.date_of_birth}</th>
               <th>${user.created_at}</th>
               <th>${user.updated_at}</th>
            </tr>
            `
         })

         list.insertAdjacentHTML("beforeend", body);
      },

   }
})()



