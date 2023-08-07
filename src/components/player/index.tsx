import React, { LegacyRef, useCallback, useEffect, useRef } from "react";
import flvjs from "flv.js";

interface IProps {
  id: number;
  url: string;
  videoId: string;
}

let playerExample: flvjs.Player | undefined = undefined;

export default function Player(props: IProps) {
  const { id, url, videoId } = props;
  const videoRef = useRef<HTMLVideoElement>();

  const destoryPlayer = () => {
    playerExample?.pause?.();
    playerExample?.unload?.();
    playerExample?.detachMediaElement?.();
    playerExample?.destroy();
    playerExample = undefined;
  };

  const initPlayer = useCallback(() => {
    const video = document.createElement("video");
    video.muted = true;
    video.autoplay = true;
    video.controls = true;
    video.width = 480;
    video.height = 270;
    video.className = "flv-video-hidden";
    video.id = videoId;
    // 必须要挂载才能渲染
    document.body.appendChild(video);
    videoRef.current = video;
    if (playerExample) return;

    if (!flvjs.isSupported()) {
      return console.error("flv.js is not Supported ！");
    }
    if (!url) return;
    console.info(playerExample, "playerExample.current??!");
    if (playerExample) {
      destoryPlayer();
    }

    const flvPlayer = flvjs.createPlayer({
      type: "flv",
      isLive: true,
      hasVideo: true,
      hasAudio: false,
      url: `ws://localhost:8888/rtsp/${id}/?url=${url}`,
    });
    console.info(videoRef.current, "videoRef.current???");
    flvPlayer.attachMediaElement(videoRef.current);
    try {
      flvPlayer.load();
      flvPlayer.play();
    } catch (error) {
      console.log("error:", error);
    }
    playerExample = flvPlayer;
  }, [id, url, videoId]);

  useEffect(() => {
    initPlayer();
  }, [initPlayer]);

  return <></>;
}
