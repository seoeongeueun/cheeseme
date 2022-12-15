import axios from "axios";

export const FetchAPIPost = async (url, params) => {
    try{
        if (params === undefined){
            params = {};
        }

        const res = await axios({
            method: 'POST',
            url: url,
            data: params,
            //요청 종류 찾아보기
            header: {
                'Access-Control-Allow-Origin': '*'
            },
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

export const FetchApiGet = async (url, params) => {
    try {
        // Json Data를 URLSearchParams Data로 변환
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

        const response = await axios({
            method:  "GET",
            url: url,
            data: urlSearchParams,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
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

        const response = await axios({
            method: "Delete",
            url: url,
            data: params,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
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