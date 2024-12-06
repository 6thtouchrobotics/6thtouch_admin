import axios from "axios";
import usePrompt from "./usePrompt";
import useAlert from "./useAlert";

const useServer = (
  endpoint = "",
  method = "GET",
  cb = (res) => {},
  body = null
) => {
  if (typeof window === "undefined") return;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", localStorage.token);

  const option = {
    method,
    headers: myHeaders,
    body: body ? JSON.stringify(body) : null,
    redirect: "follow",
  };
  axios(`${import.meta.env.VITE_BACKEND_SERVER_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    data: body ? JSON.stringify(body) : null,
  })
    .then((data) => {
      cb(data);
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        cb(error.response);
        return useAlert(error.response.data.message, "danger");
      }
      cb(error);
      useAlert(error.message, "danger");
    });
};

export default useServer;
