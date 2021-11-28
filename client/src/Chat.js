import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import './Chat.css';

const Chat = props => {
  useEffect(() => {
    const domMessageList = document.getElementsByClassName('messages')[0];
    domMessageList.scrollTop = domMessageList.scrollHeight;
  }, [ props.messageList ]);

  return (
    <div className="chat">
      <div className="messages">
        {
          props.messageList.map((val, i, list) => {
            const image = (val.file !== undefined) ?
              <div className={`imageFile ${val.uuid === props.uuid ? 'me' : 'other'}`}>
                <div className="emojiList">
                  <span role="img">😍</span>
                  <span role="img">🤪</span>
                  <span role="img">🤯</span>
                  <span role="img">🥴</span>
                </div>
                <img
                  src={  URL.createObjectURL(new Blob([val.file])) }
                  alt={`Envoyé par ${val.author}`} />
              </div> : null;

            return (
              <div key={i} className={`msg-container ${val.uuid === props.uuid ? 'me' : 'other'}`}>
                { image }
                { (val.message) ?
                  <div className="msg">
                    {val.message}<br />
                  </div> : null }
                  <span className="author">{val.author}&nbsp;</span>
              </div>);
          })
        }
      </div>

      <div className="inputs">
        <input
          placeholder="Message"
          value={ props.message || '' }
          onChange={ e => props.setMessage(e.target.value) }
          onKeyPress={ e => (e.key === 'Enter') ? props.sendMessage() : null } />
        <label
          htmlFor="chooseFile"
          className="img-icon">
          <FontAwesomeIcon
            icon={ faImages } />
          <input
            type="file"
            id="chooseFile"
            onChange={ props.selectFile }
            accept="image/*" />
        </label>
        <button
          onClick={ props.sendMessage }>Envoyer</button>
      </div>
    </div>);
}

export default Chat;