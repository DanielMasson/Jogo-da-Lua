import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

/**
 * Preencha com as credenciais do SEU projeto Firebase
 * (Console Firebase > Configurações do projeto > Seus apps > SDK setup).
 * Como o projeto já usa "jogo-da-lua" no .firebaserc, o mais simples é
 * ativar o Realtime Database nesse mesmo projeto Firebase.
 */
const firebaseConfig = {
  apiKey: "COLE_AQUI",
  authDomain: "jogo-da-lua.firebaseapp.com",
  databaseURL: "https://jogo-da-lua-default-rtdb.firebaseio.com", // região pode variar
  projectId: "jogo-da-lua",
  storageBucket: "jogo-da-lua.appspot.com",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
