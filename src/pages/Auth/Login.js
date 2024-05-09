import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/AuthStyles.css';
import { useAuth } from '../../context/auth';
// import loginImage from '../../../public/Images/Login.jpg';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password })
            console.log(res)
            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || '/');
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong');
        }
    }

    return (
        <Layout title={"Login - UniDeals"}>
            <div className="container" style={{ width: '100vw', position: 'relative', textAlign: 'center', color: 'white', margin: '0', padding: '0', top: '0' }}>
                <img src="/Images/Login.jpg" className="d-block " style={{ width: '100vw', height: '90vh' }} alt="..." />
                <div style={{ fontWeight: '500', fontSize: '2em', position: 'absolute', top: '8vh', left: '35.65vw' }}>
                    <form style={{ background: 'White', marginTop: '10px', display: 'inline-block', padding: '25px', width: '25rem' }}>
                    <h1 className='title' style={{ fontSize: '100px ', color: 'gray' }}>Login</h1>
                    <h5 style={{color:'#545454'}} className='p-2'><strong>Do you believe in love at first bite? </strong><br />Login now and let our food tempt your taste buds!</h5>
                        <div className="mb-3">
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" placeholder='Enter Your Email' required />
                        </div>
                        <div className="mb-3">
                            <input type="password" placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="exampleInputPassword1" required />
                        </div>

                        <button type="submit" onClick={handleClick} className="btn btn-outline-secondary">Login</button>
                        <hr className='mx-5' style={{color:'gray', justifyContent:'center'}}/>
                        <div className="m-1">
                            <button type="submit" onClick={() => { navigate('/register') }} className="btn btn-outline-secondary mx-3">Sign Up</button>
                            <button type="button" onClick={() => { navigate('/forgot-password') }} className="btn btn-outline-secondary mx-3">Forgot Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login