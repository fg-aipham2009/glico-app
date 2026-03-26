import axios from "axios";

const $request = async option => {
  const request = axios.create({
    baseURL: "https://glico-app-api.uz-apps.com/app"
  });

  // const auth0token = localStorage.getItem("authToken");
  request.interceptors.request.use(config => {
    // if (auth0token != undefined) {
    // config.headers["Authorization"] = "Bearer " + auth0token;
    config.headers["Content-Type"] = "application/json";
    // }

    return config;
  });

  try {
    let response = await request({
      responseType: option.responseType,
      url: option.url,
      method: option.method || "GET",
      data: option.data,
      params: option.params
    });
    const res = response.data;
    return res;
  } catch (e) {
    const error = e.response || "";
    sessionStorage.removeItem("authToken");
    return error;
  }
};

export { $request };
