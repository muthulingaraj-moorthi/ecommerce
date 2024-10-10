import axios from "axios";
import { useEffect, useState } from "react";
import "../css/components_css/login_form.css";
import Logo from "../images/supermaket.png";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import HomePage from "./HomePage";

function LoginPage(props) {
    const [user_name, setUsername] = useState("");
    const [password, setpassword] = useState("");
    const [user_login, setUserlogin] = useState(null);
    const [user_token, setuserToken] = useState(null);
    const [login_err, setLoginerror] = useState(null)

    //Handkle Login
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            setLoginerror(null)
            const response = await axios.post("https://fakestoreapi.com/auth/login", {
                username: user_name,
                password: password
            });

            if (response.status == 200) {
                setUserlogin(response.data);
            }

            //store in Local storage
            if (response.data && response.data.token) {
                localStorage.setItem("login", response.data.token);
                const decodedToken = jwtDecode(response.data.token);
                if (decodedToken) {
                    setuserToken(decodedToken);
                    localStorage.setItem("user_details", JSON.stringify(decodedToken))
                }
            }

            //Check is user is Register or not
            const all_user = await axios.get("https://fakestoreapi.com/users");
            console.log(all_user.data)
            if(all_user && all_user.length != 0 ){
                for(let user of all_user.data){
                    console.log(user)
                    if(user.id == user_token.sub){
                        props.setLog(true);
                        return <HomePage />
                    }
                }
            }
        }
        catch (error) {
            setLoginerror(error.response.data)
            console.log(error.response)
        }
    }

    return (
        <div className="login_form_page">
            <form className="login_fome-init" method="post" onSubmit={handleLogin}>
                <div className="form_lable logo_section">
                    <img src={Logo} alt="Store" />
                    <h4>Online Ecommerce Store</h4>
                </div>
                <div className="error_msg">
                    {
                        login_err ? <span>{login_err}</span> : ''
                    }
                </div>
                <div className="form_lable">
                    <label>Username</label>
                    <input className="username" required name="user_name" type="text" autoComplete="off" placeholder="Enter username or Email" onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className="form_lable">
                    <label>Password</label>
                    <input className="username" name="password" type="password" autoComplete="new-password" placeholder="Password" onChange={(event) => setpassword(event.target.value)} />
                </div>
                <div className="form_lable submit_sign">
                    <button>Login</button>
                    <button>Register</button>
                </div>
            </form>
        </div>
    )
}


export default LoginPage;