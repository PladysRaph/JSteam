import { io } from 'socket.io-client';
import Router from "./utils/Router.js";

// Router vers le LoginView
Router.navigate('/', [null, null, io()]);