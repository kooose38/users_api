
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
      createUser: async () => {
         const name = document.getElementById("name").value;
         const profile = document.getElementById("profile").value;
         const date_of_birth = document.getElementById("date_of_birth").value;

         const body = {
            name: name,
            profile: profile,
            date_of_birth: date_of_birth,
         };

         const res = await fetch(url, {
            method: "POST",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
         })
         const messages = await res.json();
         if (res.status === 200) {
            alert(messages.message);
            window.location.href = "/";
         } else {
            alert(messages[0].message, messages[0].statusCode)
         }

      },

   }
})()



