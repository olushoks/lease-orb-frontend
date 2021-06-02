const Conversation = ({
  handleReplyText,
  sendReply,
  conversationThread,
  setShowThread,
  text,
}) => {
  return (
    <>
      <div className="msg-section">
        <i
          className="fas fa-chevron-right close-thread"
          onClick={() => setShowThread(false)}
        ></i>
        {conversationThread.map((convo) => {
          let type = convo.type === "received" ? "left" : "right";

          return (
            <p key={convo.text} className={`${type} text`}>
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

export default Conversation;
