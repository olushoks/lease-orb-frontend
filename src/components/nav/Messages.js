import axios from "axios";
import { useState, useEffect } from "react";
import Conversation from "./Conversation";
import "./nav.css";
import "./Messages.css";

const Messages = ({ user, closeNav, replyMessage }) => {
  const [messages, setMessages] = useState([...user.messages]);
  const [conversationThread, setConversationThread] = useState(null);
  const [text, setText] = useState("");
  const [replyParams, setReplyParams] = useState({});

  useEffect(() => {
    const refreshMessages = async () => {
      await axios
        .get(`http://localhost:5000/api/users/${user.username}/messages`)
        .then(({ data }) => {
          setMessages([...data]);

          if (replyParams.msgId) {
            const updatedMessage = data.filter(
              (message) => message._id === replyParams.msgId
            );
            setConversationThread([...updatedMessage[0].conversation]);
          }
        })
        .catch((err) => console.log(err.response));
    };

    let refreshInterval = setInterval(() => {
      refreshMessages();
    }, 10000);

    return () => clearInterval(refreshInterval);
  });

  const handleReplyText = (e) => {
    setText(e.target.value);
  };

  const sendReply = (e) => {
    e.preventDefault();
    if (text) {
      const { msgId, recipient } = replyParams;
      replyMessage(msgId, recipient, text);
      setConversationThread([...conversationThread, { text, type: "sent" }]);
      setText("");
    }
  };

  const displayConversationText = (message) => {
    setReplyParams({ msgId: message._id, recipient: message.recipient });
    setConversationThread(message.conversation);
    console.log(message._id);
  };

  //********RENDER */
  if (!messages) return null;

  if (messages.length === 0)
    return (
      <div className="nav-current">
        <span onClick={closeNav}>
          <i className="fas fa-window-close close-btn"></i>
        </span>
        <p>You have no mesages at this time</p>
      </div>
    );

  return (
    <div className="nav-current" style={{ left: "83%" }}>
      <span onClick={closeNav}>
        <i
          className="fas fa-window-close close-btn"
          style={{ left: "82%" }}
        ></i>
      </span>
      <div>
        {messages.map((message) => {
          return (
            <div key={message._id}>
              <p
                className="msg-title"
                onClick={() => {
                  displayConversationText(message);
                }}
              >
                <i className="fas fa-comment-alt msg-icon"></i>
                {message.title}
              </p>
            </div>
          );
        })}
        {conversationThread && (
          <Conversation
            handleReplyText={handleReplyText}
            sendReply={sendReply}
            text={text}
            conversationThread={conversationThread}
            setConversationThread={setConversationThread}
          />
        )}
      </div>
    </div>
  );
};

export default Messages;
