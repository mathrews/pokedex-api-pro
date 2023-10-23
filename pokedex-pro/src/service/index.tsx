import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const API = axios.create({
    baseURL: "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
});
