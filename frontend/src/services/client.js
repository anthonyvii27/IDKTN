import { io } from "socket.io-client";

export const socket = io("http://localhost:3333", {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});