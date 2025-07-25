import axiosInstance from '../config/AxiosConfig';

const getAllProducts = async () => {
    try {
        const res = await axiosInstance.get('/product');
        console.log(res.data.data.products);
        return res.data.data.products;
    } catch (error) {
        console.error("Error fetching products:", error.response?.data.message || error.message);
        throw new Error(error.response?.data.message || "An error occurred while fetching products.");
        
    }
};

const getProductById = async (sku) => {
    try {
        const res = await axiosInstance.get(`/product/${sku}`);
        console.log(res.data.product);
        return res.data.product;
    } catch (error) {
        console.error("Error fetching product by ID:", error.response?.data.message || error.message);
        throw new Error(error.response?.data.message || "An error occurred while fetching the product.");
        
    }
}

const productService = {
    getAllProducts,
    getProductById
};

export default productService;
