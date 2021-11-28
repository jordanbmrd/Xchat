import './Login.css';

const Login = props => (
  <div className="centeredLogin">
    <div className="login">
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
  </div>
);

export default Login;