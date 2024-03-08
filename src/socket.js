import io from 'socket.io-client'; 

const URL= process.env.NODE_ENV=== 'http://localhost:5000'? "": "https://sketchbook-server-gasp.onrender.com/"
export const socket =io(URL)