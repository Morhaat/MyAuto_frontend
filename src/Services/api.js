import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: apiUrl != null ? apiUrl : "https://dbsistemasmyauto.herokuapp.com/"
});

export default api;