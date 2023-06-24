import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NODE_ENV !== 'production' ? 'https://localhost:8080/' : "https://cheese-me.fly.dev/",
  });

export const FetchAPIPost = async (url, params) => {
    try{
        if (params === undefined){
            params = {};
        }

        const res = await instance({
            method: 'POST',
            url: url,
            data: params,
            withCredentials: true,
        });
        if (res.status != 200) {
            throw res.result;
        }
        return res.data;
    } catch (err) {
        console.log('Err: ', err)
    }
}

export const FetchAPIPostImg = async (url, params) => {
    try{
        if (params === undefined){
            params = {};
        }

        const res = await instance({
            method: 'POST',
            url: url,
            data: params,
            header: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        if (res.status !== 200) {
            throw res.result;
        }
        return res.data;
    } catch (err) {
        console.log('Err: ', err)
    }
}

export const FetchAPIPostLogin = async (url, params) => {
    try{
        if (params === undefined){
            params = {};
        }

        const res = await instance({
            method: 'POST',
            url: url,
            data: params,
            header: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        });
        if (res.status !== 200) {
            throw res.result;
        }
        return res.data;
    } catch (err) {
        console.log('Err: ', err)
    }
}

export const FetchApiGet = async (url, params) => {
    try {
        const urlSearchParams = new URLSearchParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key]) {
                    urlSearchParams.append(key, params[key]);
                }
            });
        }
        console.log(urlSearchParams.toString());
        if (params == undefined) params = {};

        const response = await instance({
            method:  "GET",
            url: url,
            data: urlSearchParams,
            withCredentials: true,
        });
        if (response.status != 200) {
            throw response.result;
        }

        return response.data;
    } catch (error) {
        // alert(error)
    }
};

export const FetchApiDelete = async (url, params) => {
    try {

        if (params == undefined) params = {};

        const response = await instance({
            method: "Delete",
            url: url,
            data: params,
            withCredentials: true,
        });
        if (response.status != 200) {
            throw response.result;
        }

        return response.data;
    } catch (error) {
        // alert(error);
    }
};