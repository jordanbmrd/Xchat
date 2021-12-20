import './Login.css';

const Login = props => (
  <div className="centeredLogin">
    <div className="login">
      <img src="logo.png" alt="Xchat" />
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        onChange={ e => props.setUsername(e.target.value) } />
      <input
        type="text"
        placeholder="Room"
        onChange={ e => props.setRoom(e.target.value) } />
      <button
        onClick={ props.connectToRoom }>Rejoindre le chat</button>
    </div>

    <small>Made with <span style={{ color: 'red' }}>❤</span> by Jordan</small>
  </div>
);

export default Login;