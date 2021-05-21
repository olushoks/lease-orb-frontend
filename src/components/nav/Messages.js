import { useState } from "react";
import "./nav.css";
import "./Messages.css";

const Conversation = ({
  handleReplyText,
  sendReply,
  conversationThread,
  setConversationThread,
  text,
}) => {
  return (
    <>
      <div className="msg-section">
        <i
          className="fas fa-chevron-right close-thread"
          onClick={() => setConversationThread(null)}
        ></i>
        {conversationThread.map((convo) => {
          let type = convo.type === "received" ? "left" : "right";

          return (
            <p key={convo.text} className={type}>
              {convo.text}
            </p>
          );
        })}

        <form onSubmit={sendReply}>
          <textarea
            name="text"
            rows="5"
            cols="20"
            value={text}
            className="text-area"
            onChange={handleReplyText}
          ></textarea>
          <button className="rep-btn" type="submit">
            send
          </button>
        </form>
      </div>
    </>
  );
};

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
