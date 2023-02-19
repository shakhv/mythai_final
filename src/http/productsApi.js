import { $host } from "."

export const fetchProducts = async() => {
    const {data} = await $host.get('/products')
    return data
}