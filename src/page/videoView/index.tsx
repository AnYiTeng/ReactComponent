import React from "react";
import Player from "../../components/player/index";

export default function VideoView() {
  return (
    <>
      <Player
        id={1}
        videoId="flv-player"
        url="rtsp://admin:nova123456@10.40.73.4:554/Streaming/Channels/101?transportmode=unicast&profile=Profile_1"
      />
    </>
  );
}
