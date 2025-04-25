import axios from "axios";
import backendURL from "./config";
// export default axios.create({
//   baseURL: "http://localhost:8000/api",
// });

export default axios.create({
  baseURL: `${backendURL}/api`,
});
