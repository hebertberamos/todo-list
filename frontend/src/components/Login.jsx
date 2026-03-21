import { useState } from 'react';
import { loginService } from '../services/AuthService';

const Login = ({ onLoginSuccess, onGoToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginService(username, password);
            onLoginSuccess();
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-rectangle-bg">
            <div className="login-body">
                <div className="login-title">Login</div>
                <div className="login-switch">
                    <div className="login-switch-bg">
                        <div className="login-switch-option login-switch-active">Entrar</div>
                        <div
                            className="login-switch-option"
                            onClick={onGoToRegister}
                            style={{ cursor: 'pointer' }}
                        >
                            Registrar
                        </div>
                    </div>
                </div>
                {error && <div className="login-error">{error}</div>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-input-group">
                        <input
                            className="login-input"
                            type="text"
                            placeholder="Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="login-line" />
                    </div>
                    <div className="login-input-group">
                        <input
                            className="login-input"
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="login-line" />
                    </div>
                    <button className="login-btn" type="submit">
                        <span className="login-btn-text">SIGN IN</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;