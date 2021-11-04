import axios from "axios";

export const ACCESS_TOKEN_MAP_BOX = `${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`

export const api = axios.create({
  baseURL: "https://api.mapbox.com",
});