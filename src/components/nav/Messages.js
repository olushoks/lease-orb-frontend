import { useState } from "react";
import Conversation from "./Conversation";
import "./nav.css";
import "./Messages.css";

const Messages = ({ user, closeNav, replyMessage }) => {
  const messages = [...user.messages];
  const [conversationThread, setConversationThread] = useState(null);
  const [text, setText] = useState("");
  const [replyParams, setReplyParams] = useState(null);

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
