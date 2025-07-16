# 💬 MERN Chat Application

A full-stack real-time chat application built with the **MERN stack** and **Socket.IO**. This app supports:

- ✅ User authentication (login/register)
- 👥 Create and manage **chat groups**
- 💬 Send and receive **real-time messages** using Socket.IO
- 👤 One-on-one and group conversations

---

## 🔧 Tech Stack

| Layer      | Tech Used                           |
|------------|-------------------------------------|
| Frontend   | React.js, Context API, Axios        |
| Backend    | Node.js, Express.js, MongoDB        |
| Realtime   | Socket.IO                           |
| Auth       | JWT (JSON Web Token), bcrypt        |
| Database   | MongoDB + Mongoose ODM              |

---

## 📁 Features

- 🔐 **Authentication**
  - Register new users
  - Secure login using JWT
  - Passwords hashed using bcrypt

- 🧑‍🤝‍🧑 **Chat Groups**
  - Create and join chat rooms/groups
  - Add/remove members
  - View list of group members

- 🧵 **Real-time Messaging**
  - Chat in real-time using WebSockets
  - Both private and group chat supported
  - Shows online/offline users

- 🔄 **Persistent Conversations**
  - All messages are stored in MongoDB
  - Reloading the page doesn't lose chat history

---

