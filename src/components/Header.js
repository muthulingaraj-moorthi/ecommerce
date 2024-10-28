import { useState, useEffect } from "react";
import axios from "axios";
import "../css/components_css/header.css";
import Logo from "./header_component/Logo";
import SearchBar from "./header_component/SearchBar";


export default function Header() {

    const [cart, setCart] = useState(null);

    useEffect(() => {
        axios.get("https://fakestoreapi.com/carts")
            .then(response => setCart(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, [])

    return (
        <div className="header_section">
            <div className="header_wrapper">
                <div className="header-prt">
                    <div className="header-prt-inner">
                        <div className="logo_section">
                            <Logo />
                        </div>
                        <div className="search_bar">
                            <SearchBar />
                        </div>
                        <div className="user_info_alert">
                            <div>
                                cart
                            </div>
                            <div>
                                Notification
                            </div>
                            <div>
                                User INFO
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}