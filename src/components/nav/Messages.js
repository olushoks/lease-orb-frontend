const Messages = ({ user, closeNav }) => {
  const messages = user.messages;

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
      {messages.map((message) => {
        return (
          <div key={message._id}>
            <p>{message.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
