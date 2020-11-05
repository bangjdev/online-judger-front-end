import * as HttpStatus from 'http-status-codes';
import axios, { AxiosInstance } from 'axios';


const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

class APIFetcher {
    private fetcher: AxiosInstance;
    /*
        Fetcher's constructor, takes a token (optional) as a parameter
            - Initialize a publicFetcher with the base url
            - Initialize an authorizedFetcher with the base url and given token
    */
    constructor(token?: string) {
        if (token) {
            console.log(token);
            this.fetcher = axios.create({
                baseURL: BASE_URL,
                headers: { 'Authorization': 'Token ' + token }
            });
        } else {
            this.fetcher = axios.create({
                baseURL: BASE_URL
            });
        }
    }
    public doFetch = async<T extends {}>(
        method: string,
        target: string,
        params: object,
        callback: (responseData: T) => void,
        errorHandle: (error: Error) => void,
        data?: object
    ) => {
        try {
            let result;
            const config: object = {
                url: target,
                method: method,
                params: params
            }
            if (data && (method === 'put' || method === 'post' || method === 'patch')) {
                result = await this.fetcher.request({
                    ...config,
                    data: data
                });
            } else {
                result = await this.fetcher.request(config);
            }
            let responseData: T = result.data;
            console.log(result.status);
            if (result.status === HttpStatus.OK || result.status === HttpStatus.CREATED) {
                callback(responseData);
                console.log(`Successful ${method} to ${target}`)
            } else {
                throw new Error("OOPS");
            }
        } catch (error) {
            errorHandle(error);
            console.log(`We got some error here`);
            console.log(error);
        } finally {
            console.log(`Finish attemp ${method}`);
        }
    }

    public getFetcher(): AxiosInstance {
        return this.fetcher;
    }
}

export default APIFetcher;