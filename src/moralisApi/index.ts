import axios from "axios";

export const MORALIS_BASE_URL = 'https://deep-index.moralis.io/api/v2/';
export const MORALIS_API_KEY = process.env.REACT_APP_MORALIS_API_KEY;

export const axiosPost = (endpoint, payload, headers = null) => {
    const url = `${MORALIS_BASE_URL}${endpoint}`;
    if (!headers) headers = {};
    if (!headers['Content-Type'] && !headers['content-type'])
      headers['Content-Type'] = 'application/json';
    if (MORALIS_API_KEY) headers['X-API-Key'] = MORALIS_API_KEY;
  
    return axios
      .post(url, payload, {
        headers,
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        let code = null;
        let data = null;
        let header = null;
        if (error.response) {
          code = error.response.status;
          data = error.response.data;
          header = error.response.headers;
        } else if (error.request) {
          code = 500;
          data = {
            message: "failed!",
          };
        } else {
          code = 500;
          data = {
            message: error.message || "failed!",
          };
        }
  
        return {
          status: code,
          data,
          headers: header,
        };
    });
};

export const axiosGet = (endpoint) => {
    const url = `${MORALIS_BASE_URL}${endpoint}?chain=rinkeby`;
    const headers = {};
    if (MORALIS_API_KEY) headers['X-API-Key'] = MORALIS_API_KEY;
  
    return axios
      .get(url, {
        headers,
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        let code = null;
        let data = null;
        let header = null;
        if (error.response) {
          code = error.response.status;
          data = error.response.data;
          header = error.response.headers;
        } else if (error.request) {
          code = 500;
          data = {
            message: "failed!",
          };
        } else {
          code = 500;
          data = {
            message: error.message || "failed!",
          };
        }
  
        return {
          status: code,
          data,
          headers: header,
        };
    });
};
  
export const axiosGetMain = (endpoint) => {
    const url = `${MORALIS_BASE_URL}${endpoint}?chain=eth`;
    const headers = {};
    if (MORALIS_API_KEY) headers['X-API-Key'] = MORALIS_API_KEY;
  
    return axios
      .get(url, {
        headers,
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        let code = null;
        let data = null;
        let header = null;
        if (error.response) {
          code = error.response.status;
          data = error.response.data;
          header = error.response.headers;
        } else if (error.request) {
          code = 500;
          data = {
            message: "failed!",
          };
        } else {
          code = 500;
          data = {
            message: error.message || "failed!",
          };
        }
  
        return {
          status: code,
          data,
          headers: header,
        };
    });
};