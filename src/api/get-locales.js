import fetch from "node-fetch";

import {URL} from "./../utils/constants.js"
export const getLocales = async(token) =>{
    try {
        const locales = await fetch(`${URL}/locales?key=${token}`).then(res => res.json());
        if(!locales) {
            throw new Error('Error getting locales');
        }
        if (locales.ok){
            return await locales.json();
        }
        return locales;
        
    } catch (error) {
        console.error(`Error getting locales: ${error}`);   
        throw new Error('Error getting locales');

    }
}