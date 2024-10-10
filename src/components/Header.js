import { useState, useEffect } from "react";
import axios from "axios";

export default function Header(){

    const [cart, setCart] = useState(null);

    useEffect(()=>{
        axios.get("https://fakestoreapi.com/carts")
        .then(response => setCart(response.data))
        .catch(error => console.error('Error fetching data:', error));
    },[])

    return(
        <div className="header_section">
            Header
        </div>
    )
}