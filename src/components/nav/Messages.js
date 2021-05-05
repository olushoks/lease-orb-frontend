import { useState } from "react";

const Messages = ({ user, closeNav }) => {
  const messages = user.messages;
  const [conversationText, setConversationText] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleReplyText = (e) => {
    console.log(e.target.value);
    setReplyText(e.target.value);
  };

  const reply = (e) => {
    e.preventDefault();
    console.log(replyText);
  };

  const replyTextArea = (
    <form onSubmit={reply}>
      <textarea
        name="text"
        rows="5"
        cols="20"
        value={replyText}
        onChange={handleReplyText}
      ></textarea>
      <button type="submit">reply</button>
    </form>
  );

  const displayConversationText = (conversation) => {
    const conversationDetails = conversation.map((convo) => {
      return <p key={convo.text}>{convo.text}</p>;
    });
    setConversationText(
      <div>
        <i
          className="fas fa-chevron-left"
          onClick={() => setConversationText(null)}
        ></i>
        {conversationDetails}
      </div>
    );
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
    <div>
      <span onClick={closeNav}>
        <i className="fas fa-window-close"></i>
      </span>
      <div>
        {messages.map((message) => {
          return (
            <div key={message._id}>
              <h6 onClick={() => displayConversationText(message.conversation)}>
                {message.title}
              </h6>
            </div>
          );
        })}
        <>{conversationText}</>
        {conversationText && replyTextArea}
      </div>
    </div>
  );
};

export default Messages;
