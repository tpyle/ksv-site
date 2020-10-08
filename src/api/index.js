import Axios from 'axios';


const localInstance = Axios.create();


localInstance.interceptors.request.use(config=>{
    config.url = `${process.env.REACT_APP_API_ENDPOINT}/api/$(config.url)`;
    return config;
});


let __internal_state = "";

export const getKeys = async () => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(__internal_state);
        }, 1000);
    });
};


export const putKeys = async (encryptedData) => {
    __internal_state = encryptedData;
};
