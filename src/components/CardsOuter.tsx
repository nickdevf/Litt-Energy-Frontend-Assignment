import React, {useEffect} from 'react';
import axios from "axios";
import Card from "./Card.js";
import {Product} from "../types/productType.js";

type CardsOuterProps = {
    setProducts: (products: Product[]) => void;
    sortedProducts: Product[];
}

const CardsOuter = ({setProducts,sortedProducts}: CardsOuterProps) => {
    const BASE_URL = 'https://dummyjson.com';
    const apiService = axios.create({
        baseURL: BASE_URL,
    });

    const getProducts = async () => {
        try {
            const response = await apiService.get('/products');
            setProducts(response.data.products);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"}>
            {sortedProducts.map((product) => (
                <Card key={product.id} product={product} />
            ))}
        </div>
    );
};

export default CardsOuter;
