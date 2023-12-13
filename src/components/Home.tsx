import React, {useEffect, useState} from 'react';
import CardsOuter from "./CardsOuter.js";
import {Product} from "../types/productType.js";
import capitalizeFirstLetter from "../helpers/helper.js";

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortedProducts, setSortedProducts] = useState([...products]);
    const [allCategories, setAllCategories] = useState<string[]>([]);

    useEffect(() => {
        const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
        const camelCaseCategories = ["All", ...uniqueCategories.map(category => capitalizeFirstLetter(category.toLowerCase()))];
        setAllCategories(camelCaseCategories);
    }, [products]);

    useEffect(() => {
        const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === "All" || product.category === selectedCategory.toLowerCase())
        );
        const sorted = filteredProducts.sort((a, b) => a.price - b.price);
        setSortedProducts(sorted);
    }, [searchTerm, selectedCategory, products]);

    const handleSearchChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };
    const handleSetProducts = (products: Product[]) => {
        setProducts(products);
    }

    return (
        <div className={"p-8 text-black"}>
            <div className={"text-2xl font-bold mb-8 text-orange-400"}>Catalog Page</div>
            <div className={"my-8 flex flex-col md:flex-row md:justify-between gap-y-4"}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={"p-2 border border-gray-300 rounded-md focus:outline-none md:focus:w-[30%]"}
                />
                <select value={selectedCategory} onChange={handleCategoryChange}
                        className={"p-2 border border-gray-300 rounded-md focus:outline-none"}>
                    {allCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <CardsOuter setProducts={handleSetProducts} sortedProducts={sortedProducts}/>
        </div>
    );
};

export default Home;
