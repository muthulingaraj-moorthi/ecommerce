import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";

export default function SearchBar() {
    const [search_data, setSearchData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [searchQueries, setQuery] = useState("");


    const getProduct = async (value) => {
        try {
            const { data, status } = await axios.get("https://fakestoreapi.com/products");

            if (data && status === 200) {
                setSearchData(data);
                console.log(data)
                var filterData = data.filter((products) => {
                    return (
                        value &&
                        products &&
                        products.title &&
                        products.title.includes(value)
                    );
                });

                setFilterData(filterData)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleSearch = (value) => {
        if(value){
            setQuery(value)
            getProduct(value);
        }
        else{
            setFilterData("");
            setQuery("")
        }
    }


    return (
        <>
            <div className="searchbar">
                <div className="input_ele">
                    <input
                        placeholder="Search for products, brands and more" type="text"
                        name="search_bar"
                        className="input-element"
                        onChange={event => handleSearch(event.target.value)}
                        value={searchQueries}
                    />
                </div>
                <div>
                    {
                        filterData && <ProductList data={filterData}  setqueries={setQuery} clear_filer={setFilterData} />
                    }
                </div>
            </div>
        </>
    )
}