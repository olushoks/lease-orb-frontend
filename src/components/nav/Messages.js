import { useState } from "react";

const Messages = ({ user, closeNav }) => {
  const messages = user.messages;
  const [conversationText, setConversationText] = useState(null);

  const displayConversationText = (conversation) => {
    const conversationDetails = conversation.map((convo) => {
      return (
        <p key={convo.text}>
          <i
            className="fas fa-chevron-left"
            onClick={() => setConversationText(null)}
          ></i>
          {convo.text}
        </p>
      );
    });
    setConversationText(<div>{conversationDetails}</div>);
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
      </div>
    </div>
  );
};

export default Messages;
