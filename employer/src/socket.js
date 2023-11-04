import io from "socket.io-client";

let socket;

const connectSocket = ({ employerId }) => {
  socket = io("http://localhost:5000", {
    query: `employerId=${employerId}`,
  });
};

export { socket, connectSocket };
