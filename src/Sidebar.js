import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import CallIcon from "@material-ui/icons/Call";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";

function Sidebar() {
  // get the user from redux
  const user = useSelector(selectUser);
  // creating a piece of state for the channels
  const [channels, setChannels] = useState([]);

  // listener that returns the channels
  useEffect(() => {
    // go to the db, find the channels, use onSnapshot to get the data in real-time (which means it will change in real-time)
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        // for each doc, return an object
        snapshot.docs.map((doc) => ({
          // return this info - the id and data
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
    // only fires off one time when the app (re-)renders
  }, []);

  // state for channels
  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");
    // if the user enters a channel name
    if (channelName) {
      // go into the db, and add the channel
      // this should fire off the useEffect hook above!
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Luke Narke and Guests</h3>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          {/* let the AddIcon button actually add channels with our onClick */}
          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>

        <div className="sidebar__channelsList">
          {/* map through the channels are return the ones that are in the state */}
          {/* destructure with {} for the id and channel */}
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              // pass these as props to the SidebarChannel.js file
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />

        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className="sidebar__voiceIcons">
          <CallIcon />
          <InfoOutlinedIcon />
        </div>
      </div>

      <div className="sidebar__profile">
        {/* pulling this info from redux! using JSX {} */}
        {/* the onClick will log us out if we click the Avatar! */}
        <Avatar onClick={() => auth.signOut()} src={user.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid}</p>
        </div>
        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
