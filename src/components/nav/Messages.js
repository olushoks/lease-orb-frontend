import { useState } from "react";
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

      setText("");
    }
  };

  const replyTextArea = (
    <form onSubmit={sendReply}>
      <textarea
        name="text"
        rows="5"
        cols="20"
        value={text}
        onChange={handleReplyText}
      ></textarea>
      <button type="submit">reply</button>
    </form>
  );

  const displayConversationText = (message) => {
    setReplyParams({ msgId: message._id, recipient: message.recipient });

    // MAP THROUGH ALL CONVERSATION IN CURRENT THREAD
    const conversationDetails = (
      <div className="msg-section">
        <i
          className="fas fa-chevron-right close-thread"
          onClick={() => setConversationThread(null)}
        ></i>
        {message.conversation.map((convo) => {
          return <p key={convo.text}>{convo.text}</p>;
        })}
      </div>
    );

    setConversationThread(<div>{conversationDetails}</div>);
  };

  if (!messages) return null;

  if (messages.length === 0)
    return (
      <div>
        <span onClick={closeNav}>
          <i className="fas fa-window-close"></i>
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
              <h6
                onClick={() => {
                  displayConversationText(message);
                }}
              >
                {message.title}
              </h6>
            </div>
          );
        })}
        <>{conversationThread}</>
        {conversationThread && replyTextArea}
      </div>
    </div>
  );
};

export default Messages;
