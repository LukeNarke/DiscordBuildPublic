import React from "react";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "./features/appSlice";
import "./SidebarChannel.css";

function SidebarChannel({ id, channelName }) {
  // dispatch to fire info
  const dispatch = useDispatch();

  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          // be able to change the redux store
          setChannelInfo({
            // put this payload info into the channelInfo State in the appSlice.js file
            channelId: id,
            channelName: channelName,
          })
        )
      }
    >
      <h4>
        <span className="sidebarChannel__hash">#</span>
        {/* get channelName from the redux store */}
        {channelName}
      </h4>
    </div>
  );
}

export default SidebarChannel;
