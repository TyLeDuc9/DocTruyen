import axios from "axios";
import { API } from "../config/api";

const axiosPublic = axios.create({
  baseURL: API,
  withCredentials: true,
});

export default axiosPublic;