import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/AuthStyles.css';
import { useAuth } from '../../context/auth';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forget-password`, { email, newPassword, answer })
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);

                navigate(location.state || '/login');
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
        <Layout title={'Forgot-Password - UniDeals'}>
            <div className="container" style={{ width: '100vw', position: 'relative', textAlign: 'center', color: 'white', margin: '0', padding: '0', top: '0' }}>
                <img src="/Images/Forgot_password.jpg" className="d-block " style={{ width: '100vw', height: '90vh' }} alt="..." />
                <div style={{ fontWeight: '500', fontSize: '2em', position: 'absolute', top: '8vh', left: '35.65vw' }}>
                    <form style={{ background: 'White', marginTop: '10px', display: 'inline-block', padding: '25px', width: '25rem' }}>
                        <h1 className='title' style={{ fontSize: '70px ', color: '#1c1c1c' }}><u>Forgot Password</u> </h1>
                        <h5 style={{ color: '#545454' }} className='p-2'><strong>Forgotten password? No worries – </strong><br /> resetting is as easy as ordering your favorite dish.</h5>
                        <div className="mb-3">
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" placeholder='Enter Your Email' required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" value={answer} onChange={(e) => setAnswer(e.target.value)} id="exampleInputEmail1" placeholder='What is your Favorite Sports' required />
                        </div>
                        <div className="mb-3">
                            <input type="password" placeholder='Enter Your Password' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} className="form-control" id="exampleInputPassword1" required />
                        </div>
                        <button type="submit" onClick={handleClick} className="btn btn-outline-secondary">RESET NOW</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword