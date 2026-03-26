import axios from "axios";
import md5 from "js-md5";

axios.defaults.timeout = 50000;
const apiBaseDefault = "https://glico-app-api-staging.uz-apps.com/app";
const useLocalApi = import.meta.env.VITE_USE_LOCAL_API === "true";
if (useLocalApi) {
  axios.defaults.baseURL = "http://localhost:5000/app";
} else {
  axios.defaults.baseURL =
    import.meta.env.VITE_API_BASE_URL || apiBaseDefault;
}

let requesting = [];
const limitTime = 1000;
let requestingId = "";

let routerRef = null;
export function bindRouter(router) {
  routerRef = router;
}

axios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/json",
    };
    const nowTime = new Date().getTime();
    requestingId = md5.hex(JSON.stringify(config));
    requesting = requesting.filter((item) => {
      return item.startTime + limitTime > nowTime;
    });
    const sessionUrl = requesting.filter((item) => {
      return item.requestingId === requestingId;
    });
    if (sessionUrl.length > 0) {
      return config;
    }
    requesting.push({
      requestingId: requestingId,
      startTime: nowTime,
    });
    return config;
  },
  (error) => {
    console.log("requesting error:");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (response.data.errCode == 2 && routerRef) {
      routerRef.push({
        path: "/login",
        query: { redirect: routerRef.currentRoute.value.fullPath },
      });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.data));
  });
}

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => resolve(response.data),
      (err) => reject(err)
    );
  });
}

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => resolve(response.data),
      (err) => reject(err)
    );
  });
}
