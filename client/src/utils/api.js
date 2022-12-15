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