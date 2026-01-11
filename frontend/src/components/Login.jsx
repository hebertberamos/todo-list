import { useState } from 'react'
import { loginService } from '../services/AuthService';

const Login = ({ onLoginSuccess, onGoToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try { 
            await loginService (username, password);
            onLoginSuccess();
        } catch(err) {
            setError('Invalid credentials');
        }
    }


  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', maxWidth: '300px' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="text" 
                        placeholder="Username"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>

            <p style={{ marginTop: '15px' }}>
                Don't have an account? 
                {/* When the link is clicked, call the function passed from App.jsx */}
                <a href="#" onClick={(e) => {
                    e.preventDefault(); // Prevents the browser from navigating/reloading
                    onGoToRegister(); // Calls setCurrentView(VIEWS.REGISTER) in App.jsx
                }}>
                    Register here
                </a>
            </p>
        </div>
  )
}

export default Login