import { useState } from "react";

const Messages = ({ user, closeNav, replyMessage }) => {
  const messages = user.messages;
  const [conversationText, setConversationText] = useState(null);
  const [text, setText] = useState("");
  const [replyParams, setReplyParams] = useState(null);

  const handleReplyText = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const SendReply = (e) => {
    e.preventDefault();
    if (!text) {
      const { msgId, recipient, text } = replyParams;
      replyMessage(msgId, recipient, text);
      console.log(text);
    }
  };

  const replyTextArea = (
    <form onSubmit={SendReply}>
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
    setReplyParams({ msgId: message._id, receipient: message.receipient });
    const conversationDetails = message.conversation.map((convo) => {
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
              <h6 onClick={() => displayConversationText(message)}>
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
