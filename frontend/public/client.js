// import io from 'socket.io-client';
// import feathers from '@feathersjs/feathers';
//
// const socket = io();
// const client = feathers();
//
// client.configure(feathers.socketio(socket));
// client.configure(feathers.authentication());
//
// // Log in either using the given email/password or the token from storage
// const login = async (credentials) => {
//   try {
//     // Otherwise log in with the `local` strategy using the credentials we got
//     await client.authenticate({
//       strategy: 'local',
//       credentials
//     });
//
//     // If successful, show the board page
//     document.location.href = 'http://localhost:8080/board';
//   } catch (error) {
//     // On error, stay on login page
//     document.location.href = 'http://localhost:8080/login';
//   }
// };
//
// export default login;
