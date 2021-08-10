import "./Chat.css";
import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import db from "./firebase";
import firebase from "firebase";

function Chat() {
  // get user  from redux
  const user = useSelector(selectUser);
  // get the channel stuff from redux
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  // create state for input and messages
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  //
  useEffect(() => {
    // if there is a channel
    if (channelId) {
      // go into the db, then channels
      db.collection("channels")
        // go to the doc
        .doc(channelId)
        // go to the messages
        .collection("messages")
        // order by most recent
        .orderBy("timestamp", "desc")
        // get snapshot aka real-time data
        .onSnapshot((snapshot) =>
          // for all the docs, we just want the data
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
    // re-render when the channelId is changed b/c this is a dependency
  }, [channelId]);

  const sendMessage = (e) => {
    // stop the page from needing a refresh
    e.preventDefault();

    // go to the db, then channels, go to messages, add the object
    db.collection("channels").doc(channelId).collection("messages").add({
      // add the timestamp
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // the message is the input that we get below
      message: input,
      user: user,
    });
    // reset the field to an empty string after we send a message
    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {/* for every message, render a Message component */}
        {messages.map((message) => (
          <Message
            // the props that we used above
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            // use the input value from the state above
            value={input}
            disabled={!channelId}
            // set the input to what the user types in - which is e.target.value
            onChange={(e) => setInput(e.target.value)}
            // use the {} and ` backticks to combime html and js, the channelName is data pulled from redux
            placeholder={`Message #${channelName}`}
          />
          <button
            // disable this button if there is no channelId
            disabled={!channelId}
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          ></button>
          <button className="chat__inputButton" type="submit">
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
