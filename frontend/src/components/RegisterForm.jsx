import { useState } from 'react';
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
    };

    return (
        <div className="login-rectangle-bg">
            <div className="login-body">
                <div className="login-title">Registrar</div>
                <div className="login-switch">
                    <div className="login-switch-bg">
                        <div className="login-switch-option" onClick={onGoToLogin} style={{ cursor: 'pointer' }}>Entrar</div>
                        <div className="login-switch-option login-switch-active">Registrar</div>
                    </div>
                </div>
                {error && <div className="login-error">{error}</div>}
                {success && <div style={{ color: 'green', marginBottom: '16px' }}>Registration successful! Redirecting to login...</div>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-input-group">
                        <input
                            className="login-input"
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="login-line" />
                    </div>
                    <div className="login-input-group">
                        <input
                            className="login-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <span className="login-btn-text">REGISTRAR</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;