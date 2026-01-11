import { useState } from 'react'
import { registerService } from '../services/AuthService';

const RegisterForm = ({ onRegisterSuccess, onGoToLogin }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!name || !email || !password) {
            return setError('Por favor, informar todos os campos.');
        }

        try {
            await registerService(name, email, password);
            setSuccess(true);

            setTimeout(onGoToLogin, 2000); // Redirect to login after 2 seconds
        } catch (err) {
            setError(err.message || 'Erro ao registrar usuário.');
        }
    }

    
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', maxWidth: '300px' }}>
            <h2>Register New User</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Registration successful! Redirecting to login...</p>}

            <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <input 
                    type="text" 
                    placeholder="Name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    style={{ marginBottom: '10px', display: 'block', width: '100%' }}
                />
                {/* Email Field (Used as Username) */}
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    style={{ marginBottom: '10px', display: 'block', width: '100%' }}
                />
                {/* Password Field */}
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    style={{ marginBottom: '10px', display: 'block', width: '100%' }}
                />
                
                <button type="submit">Register</button>
            </form>
            
            <p style={{ marginTop: '15px' }}>
                Already have an account? <a href="#" onClick={onGoToLogin}>Login here</a>
            </p>
        </div>
  )
}

export default RegisterForm