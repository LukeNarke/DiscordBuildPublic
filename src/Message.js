import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

// the destructured props are the same as our Chat.js props
function Message({ timestamp, user, message }) {
  return (
    <div className="message">
      <Avatar src={user.photo} />
      <div className="message__info">
        <h4>
          {user.displayName}
          <span className="message_timestamp">
            {/* the way to get the global timestamp */}
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
