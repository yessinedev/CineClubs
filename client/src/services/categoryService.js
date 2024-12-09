import apiClient from "./apiClient"


export const fetchCategories = async () => {
    const {data} = await apiClient.get('/categories');
    return data;
}