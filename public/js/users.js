
const users = (() => {
   const url = `http://localhost:5001/api/users`;
   //error or correctData
   const switchFetchData = (res, messages) => {
      if (res.status === 200) {
         alert(messages.message);
         window.location.href = "/";
      } else if (
         res.status === 400 || res.status === 500
      ) {
         alert(messages[0].statusCode + ":" + messages[0].message)
      } else {
         alert("原因不明エラー")
      }
   };


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
               <th><a href="/edit.html?id=${user.id}">編集する</a></th>
               <th><a href="/detail.html?id=${user.id}">詳細</a></th>
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

         await switchFetchData(res, messages);

      },
      saveUser: async (id) => {
         const name = document.getElementById("name").value;
         const profile = document.getElementById("profile").value;
         const date_of_birth = document.getElementById("date_of_birth").value;

         const body = {};
         //reqが存在する分だけ追加
         if (name !== "" || !name) {
            body.name = name;
         }
         if (profile !== "" || !profile) {
            body.profile = profile;
         }
         if (date_of_birth !== "" || !date_of_birth) {
            body.date_of_birth = date_of_birth;
         }

         const res = await fetch(url + "/" + id, {
            method: "PUT",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
         });
         const messages = await res.json();

         await switchFetchData(res, messages);
      },
      removeUser: async (id) => {
         if (!window.confirm("削除しますか？")) {
            return;
         }

         const res = await fetch(url + "/" + id, {
            method: "DELETE",
            headers: {
               'Content-Type': 'application/json'
            },
         })
         const messages = await res.json();

         await switchFetchData(res, messages);
      },
      setUsers: async (id) => {
         const res = await fetch(url + "/" + id);
         const user = await res.json();

         if (res.status === 200) {
            document.getElementById("name").value = user.name;
            document.getElementById("profile").value = user.profile;
            document.getElementById("date_of_birth").value = user.date_of_birth;
         } else {
            alert(user.message)
         }

      },
      getFollowing: async (id) => {
         const res = await fetch(`http://localhost:5001/api/following/${id}`);
         const users = await res.json();

         if (res.status !== 200) {
            alert(users.statusCode + ":" + users.message);
            return
         }

         const followingList = document.getElementById("following-list")
         let body = "";

         users.forEach(user => {
            body += `
         <li>${user.followed_id}</li>
         <li>${user.name}</li>
         <li>${user.date_of_birth}</li>
         <li>${user.profile}</li>
         `
         })
         followingList.insertAdjacentHTML("beforeend", body);
      },
      getFollowed: async (id) => {
         const res = await fetch(`http://localhost:5001/api/followed/${id}`);
         const users = await res.json();

         if (res.status !== 200) {
            alert(users.statusCode + ":" + users.message);
            return
         }

         const followedList = document.getElementById("followed-list")
         let body = "";

         users.forEach(user => {
            body += `
         <li>${user.following_id}</li>
         <li>${user.name}</li>
         <li>${user.date_of_birth}</li>
         <li>${user.profile}</li>
         `
         })
         followedList.insertAdjacentHTML("beforeend", body);
      },

   }
})()



