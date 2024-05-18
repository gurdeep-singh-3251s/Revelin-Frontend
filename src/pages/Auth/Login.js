import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout title={"Login - Revelin"}>
            <div style={styles.loginContainer}>
                <img src="/Images/JewelryMarket.jpg" style={styles.loginImage} alt="Jewelry Marketplace" />
                <div style={styles.loginFormContainer}>
                    <form style={styles.loginForm} onSubmit={handleClick}>
                        <h1 style={styles.loginTitle}>Login</h1>
                        <h5 style={styles.loginSubtitle}>
                            <strong>Welcome back!</strong>
                            <br />
                            Sign in to explore our exquisite collection of Items.
                        </h5>
                        <div className="mb-3">
                            <input 
                                type="email" 
                                className="form-control" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder='Enter Your Email' 
                                required 
                                style={styles.formControl}
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                type="password" 
                                placeholder='Enter Your Password' 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password} 
                                className="form-control" 
                                required 
                                style={styles.formControl}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={styles.btnPrimary}>Login</button>
                        <hr className='mx-5' />
                        <div style={styles.buttonGroup}>
                            <button 
                                type="button" 
                                onClick={() => navigate('/register')} 
                                className="btn btn-secondary"
                                style={styles.btnSecondary}
                            >
                                Sign Up
                            </button>
                            <button 
                                type="button" 
                                onClick={() => navigate('/forgot-password')} 
                                className="btn btn-secondary"
                                style={styles.btnSecondary}
                            >
                                Forgot Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

const styles = {
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        position: 'relative',
        background: 'url("/Images/JewelryMarket.jpg") no-repeat center center/cover'
    },
    loginImage: {
        display: 'none' // The image is used as a background, so we hide the img element
    },
    loginFormContainer: {
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    loginTitle: {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '0.5em'
    },
    loginSubtitle: {
        fontSize: '1.2em',
        color: '#555',
        marginBottom: '1.5em'
    },
    formControl: {
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '1em',
        width: '100%',
        fontSize: '1em'
    },
    btnPrimary: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '1em',
        fontSize: '1.1em',
        color: 'white',
        cursor: 'pointer',
    },
    btnPrimaryHover: {
        backgroundColor: '#0056b3',
        borderColor: '#004085'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    btnSecondary: {
        backgroundColor: '#6c757d',
        borderColor: '#6c757d',
        width: '48%',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '1em',
        color: 'white',
        cursor: 'pointer',
    },
    btnSecondaryHover: {
        backgroundColor: '#5a6268',
        borderColor: '#545b62'
    }
};
