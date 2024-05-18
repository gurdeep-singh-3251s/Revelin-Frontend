import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import '../../styles/AuthStyles.css';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [role,setRole] = useState(true);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address, answer,role })
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
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
        <Layout title={"Register Now - Revelin"}>
            <div style={styles.loginContainer}>
            <img src="/Images/JewelryMarket.jpg" style={styles.loginImage} alt="Jewelry Marketplace" />
                <div className='my-3' style={styles.loginFormContainer}>
                    <form  style={styles.loginForm}>
                        <h3 className='title' style={styles.loginTitle}>REGISTRATION FORM</h3>
                        <h5 style={{ color: '#545454' }} className='p-2'><strong>Unlock a World of Elegance: </strong><br /> Register Now for Exclusive Access!</h5>
                        <div className="mb-3">
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="exampleInputName" placeholder='Enter Your Name' required />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" placeholder='Enter Your Email' required />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={phone} className="form-control" onChange={(e) => setPhone(e.target.value)} id="exampleInputNumber" placeholder='Enter Your Phone Number' required />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={address} className="form-control" onChange={(e) => setAddress(e.target.value)} id="exampleInputAddress" placeholder='Enter Your Address' aria-describedby="emailHelp" required />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={answer} className="form-control" onChange={(e) => setAnswer(e.target.value)} id="exampleInputAddress" placeholder='What is your Favorite Sports' aria-describedby="emailHelp" required />
                        </div>
                        <div className="">
                            <input type="password" placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="exampleInputPassword1" required />
                        </div>
                        <div >
                            <select className="custom-select m-2" style={{height:'2rem', fontSize:'1rem', width:'12.5rem', borderRadius:'5px', boxShadow:' 0 2px inherit'}} value={role} onChange={(e) => setRole(e.target.value)}  required>
                                <option value="">Select Role</option>
                                <option value={true}>Customer</option>
                                <option value={false}>Vendor</option>
                            </select>
                            <div className="invalid-feedback">Please select role for further process</div>
                        </div>

                        <button type="submit" style={{ width: '15rem' }} onClick={handleSubmit} className="btn btn-outline-secondary">REGISTER NOW</button>
                    </form>
                </div>
            </div>

        </Layout>
    )
}

export default Register;

const styles = {
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        position: 'relative',
        background: 'url("/Images/JewelryMarket.jpg") no-repeat center center fixed',
        backgroundSize: 'cover',
        padding: '0', // Remove padding
        margin: '0' // Remove margin
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
        fontSize: '2em',
        color: '#333',
    },
    loginSubtitle: {
        fontSize: '1.2em',
        color: '#555',
        marginBottom: '0.5em'
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
