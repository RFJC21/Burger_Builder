import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-bc277.firebaseio.com/"
});

export default instance;
