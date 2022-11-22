import axios from "axios";

export async function postRequisition(route, contextData,data) {
    try {
        const config = contextData.config?contextData.config:``;
        const response = await axios.post(`${contextData.url}/${route}`, data,config);
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response.data);
    }
}

export async function getRequisition(route,contextData) {
    try {
        const config = contextData.config?contextData.config:``;
        const response = await axios.get(`${contextData.url}/${route}`,config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export async function deleteRequisition(route,contextData) {
    try {
        const config = contextData.config?contextData.config:``;
        const response = await axios.delete(`${contextData.url}/${route}`,config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}