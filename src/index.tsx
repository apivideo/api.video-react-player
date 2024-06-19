import { PlayerSdk } from "@api.video/player-sdk";
import * as React from "react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type PlayerTheme = {
  text?: string;
  link?: string;
  linkHover?: string;
  trackPlayed?: string;
  trackUnplayed?: string;
  trackBackground?: string;
  backgroundTop?: string;
  backgroundBottom?: string;
  backgroundText?: string;
  linkActive?: string;
};

export type ControlName =
  | "play"
  | "seekBackward"
  | "seekForward"
  | "playbackRate"
  | "volume"
  | "fullscreen"
  | "subtitles"
  | "chapters"
  | "pictureInPicture"
  | "progressBar"
  | "chromecast"
  | "download"
  | "more";

export interface ApiVideoPlayerVideo {
  id: string;
  live?: boolean;
  token?: string;
  privateSession?: string;
}

export interface ApiVideoPlayerProps {
  style?: React.CSSProperties;
  autoplay?: boolean;
  muted?: boolean;
  metadata?: {
    [key: string]: string;
  };
  ads?: {
    adTagUrl: string;
  };
  hideControls?: boolean;
  hidePoster?: boolean;
  chromeless?: boolean;
  loop?: boolean;
  hideTitle?: boolean;
  iframeUrl?: string;
  playbackRate?: number;
  showSubtitles?: boolean;
  video: ApiVideoPlayerVideo;
  volume?: number;
  controls?: ControlName[];
  theme?: PlayerTheme;
  videoStyleObjectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  videoStyleTransform?: string;
  customDomain?: string;
  hotKeys?: boolean;
  // This feature is experimental.
  // It may change or be removed at any time and could cause significant playback issues.
  minimalQuality?: number;
  // This feature is experimental.
  // It may change or be removed at any time and could cause significant playback issues.
  maximalQuality?: number;

  responsive?: boolean;

  onPlay?: () => void;
  onPause?: () => void;
  onControlsDisabled?: () => void;
  onControlsEnabled?: () => void;
  onEnded?: () => void;
  onError?: () => void;
  onFirstPlay?: () => void;
  onFullscreenChange?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onPlayerResize?: () => void;
  onQualityChange?: (resolution: { height: number; width: number }) => void;
  onVideoSizeRatioChange?: (ratio: number) => void;
  onRateChange?: () => void;
  onReady?: () => void;
  onResize?: () => void;
  onSeeking?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onUserActive?: () => void;
  onUserInactive?: () => void;
  onVolumeChange?: (volume: number) => void;

  onDurationChange?: (duration: number) => void;

  children?: JSX.Element | JSX.Element[];
}

export interface ApiVideoPlayerRef {
  play: () => void;
  pause: () => void;
  requestFullscreen: () => void;
  exitFullscreen: () => void;
  mute: () => void;
  unmute: () => void;
  hideTitle: () => void;
  showTitle: () => void;
  hideControls: () => void;
  showControls: () => void;
  seek: (time: number) => void;
  setCurrentTime: (time: number) => void;
  setLoop: (loop: boolean) => void;
  setPlaybackRate: (rate: number) => void;
  setVolume: (volume: number) => void;
  requestPictureInPicture: () => void;
  exitPictureInPicture: () => void;
}

const ApiVideoPlayer = forwardRef<ApiVideoPlayerRef, ApiVideoPlayerProps>(
  (props, ref) => {
    const [playerSdk, setPlayerSdk] = useState<PlayerSdk | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [ratio, setRatio] = useState<number | null>(null);
    const [controls, setControls] = useState<ControlName[]>([]);
    const [theme, setTheme] = useState<PlayerTheme | null>(null);

    useEffect(() => {
      if (!iframeRef.current || !!playerSdk) return;

      const sdk = new PlayerSdk(iframeRef.current!, {
        ...props,
        ...props.video,
      });

      sdk.addEventListener("play", () => props?.onPlay?.());
      sdk.addEventListener("pause", () => props.onPause?.());
      sdk.addEventListener("controlsdisabled", () =>
        props.onControlsDisabled?.()
      );
      sdk.addEventListener("controlsenabled", () =>
        props.onControlsEnabled?.()
      );
      sdk.addEventListener("ended", () => props.onEnded?.());
      sdk.addEventListener("error", () => props.onError?.());
      sdk.addEventListener("firstplay", () => props.onFirstPlay?.());
      sdk.addEventListener("fullscreenchange", () =>
        props.onFullscreenChange?.()
      );
      sdk.addEventListener("mouseenter", () => props.onMouseEnter?.());
      sdk.addEventListener("mouseleave", () => props.onMouseLeave?.());
      sdk.addEventListener("playerresize", () => props.onPlayerResize?.());
      sdk.addEventListener("qualitychange", (v: any) =>
        props.onQualityChange?.(v.resolution)
      );
      sdk.addEventListener("ratechange", () => props.onRateChange?.());
      sdk.addEventListener("ready", () => props.onReady?.());
      sdk.addEventListener("resize", () => props.onResize?.());
      sdk.addEventListener("seeking", () => props.onSeeking?.());
      sdk.addEventListener("timeupdate", (v: any) =>
        props.onTimeUpdate?.(v.currentTime)
      );
      sdk.addEventListener("useractive", () => props.onUserActive?.());
      sdk.addEventListener("userinactive", () => props.onUserInactive?.());
      sdk.addEventListener("volumechange", (v: any) =>
        props.onVolumeChange?.(v.volume)
      );

      if (props.controls) {
        sdk.hideControls();
        sdk.showControls(props.controls);
      }

      if (props.videoStyleObjectFit) {
        sdk.setVideoStyleObjectFit(props.videoStyleObjectFit);
      }

      if (props.videoStyleTransform) {
        sdk.setVideoStyleTransform(props.videoStyleTransform);
      }

      if (props.theme) {
        sdk.setTheme(props.theme);
      }

      sdk.addEventListener("ready", () => {
        sdk
          .getVolume()
          .then((d) => props.onVolumeChange && props.onVolumeChange(d));
        sdk
          .getDuration()
          .then((d) => props.onDurationChange && props.onDurationChange(d));
        sdk.getVideoSize().then((size: { width: number; height: number }) => {
          const videoSizeRatio = size.height / size.width;
          if (props.onVideoSizeRatioChange) {
            props.onVideoSizeRatioChange(videoSizeRatio);
          }
          setRatio(videoSizeRatio);
        });
      });

      setPlayerSdk(sdk);
    }, [iframeRef]);

    useImperativeHandle(ref, () => ({
      play: () => playerSdk?.play(),
      pause: () => playerSdk?.pause(),
      requestFullscreen: () => playerSdk?.requestFullscreen(),
      exitFullscreen: () => playerSdk?.exitFullscreen(),
      mute: () => playerSdk?.mute(),
      unmute: () => playerSdk?.unmute(),
      hideTitle: () => playerSdk?.hideTitle(),
      showTitle: () => playerSdk?.showTitle(),
      hideControls: () => playerSdk?.hideControls(),
      showControls: () => playerSdk?.showControls(),
      seek: (time: number) => {
        if (isNaN(time)) throw new Error("Invalid time");
        playerSdk?.seek(time);
      },
      setCurrentTime: (time: number) => {
        if (isNaN(time)) throw new Error("Invalid time");
        playerSdk?.setCurrentTime(time);
      },
      setLoop: (loop: boolean) => playerSdk?.setLoop(loop),
      setPlaybackRate: (rate: number) => {
        if (isNaN(rate)) throw new Error("Invalid rate");
        playerSdk?.setPlaybackRate(rate);
      },
      setVolume: (volume: number) => {
        if (isNaN(volume)) throw new Error("Invalid volume");
        playerSdk?.setVolume(volume);
      },
      requestPictureInPicture: () => playerSdk?.requestPictureInPicture(),
      exitPictureInPicture: () => playerSdk?.exitPictureInPicture(),
    }));

    useEffect(() => {
      playerSdk?.loadConfig({
        ...props,
        ...props.video,
      });
    }, [
      props.video.id,
      props.video.token,
      props.video.privateSession,
      props.video.live,
    ]);

    useEffect(() => {
      playerSdk?.setChromeless(props.chromeless || false);
    }, [props.chromeless]);

    useEffect(() => {
      playerSdk?.setLoop(props.loop || false);
    }, [props.loop]);

    useEffect(() => {
      playerSdk?.setAutoplay(props.autoplay || false);
    }, [props.autoplay]);

    useEffect(() => {
      playerSdk?.setMinimalQuality(props.minimalQuality || 0);
    }, [props.minimalQuality]);

    useEffect(() => {
      playerSdk?.setMaximalQuality(props.maximalQuality || 0);
    }, [props.maximalQuality]);

    useEffect(() => {
      playerSdk?.setVideoStyleTransform(props.videoStyleTransform || "");
    }, [props.videoStyleTransform]);

    useEffect(() => {
      playerSdk?.setVideoStyleObjectFit(props.videoStyleObjectFit || "none");
    }, [props.videoStyleObjectFit]);

    useEffect(() => {
      if (props.muted !== undefined) {
        props.muted ? playerSdk?.mute() : playerSdk?.unmute();
      }
    }, [props.muted]);

    useEffect(() => {
      if (props.volume !== undefined) {
        playerSdk?.setVolume(props.volume);
      }
    }, [props.volume]);

    useEffect(() => {
      if (props.hideTitle !== undefined) {
        props.hideTitle ? playerSdk?.hideTitle() : playerSdk?.showTitle();
      }
    }, [props.hideTitle]);

    useEffect(() => {
      if (props.hidePoster !== undefined) {
        props.hidePoster ? playerSdk?.hidePoster() : playerSdk?.showPoster();
      }
    }, [props.hidePoster]);

    useEffect(() => {
      if (props.showSubtitles !== undefined) {
        props.showSubtitles
          ? playerSdk?.showSubtitles()
          : playerSdk?.hideSubtitles();
      }
    }, [props.showSubtitles]);

    useEffect(() => {
      if (props.playbackRate !== undefined) {
        playerSdk?.setPlaybackRate(props.playbackRate);
      }
    }, [props.playbackRate]);

    useEffect(() => {
      const allControls = [
        "play",
        "seekBackward",
        "seekForward",
        "playbackRate",
        "volume",
        "fullscreen",
        "subtitles",
        "chapters",
        "pictureInPicture",
        "progressBar",
        "chromecast",
        "download",
        "more",
      ] as ControlName[];

      const oldControls = controls.length > 0 ? controls : allControls;

      const nextControls =
        props.controls != undefined ? props.controls : allControls;

      const added = nextControls.filter((c) => oldControls.indexOf(c) === -1);
      const removed = oldControls.filter((c) => nextControls.indexOf(c) === -1);
      if (added.length > 0) playerSdk?.showControls(added);
      if (removed.length > 0) playerSdk?.hideControls(removed);

      setControls(nextControls);
    }, [props.controls]);

    useEffect(() => {
      if (props.theme) {
        const themeHasChanged = (
          oldTheme: PlayerTheme,
          newTheme: PlayerTheme
        ) => {
          return (
            Object.keys(oldTheme).length !== Object.keys(newTheme).length ||
            Object.keys(oldTheme).filter(
              (k) =>
                oldTheme[k as keyof PlayerTheme] !==
                newTheme[k as keyof PlayerTheme]
            ).length > 0
          );
        };
        if (theme === null || themeHasChanged(theme, props.theme)) {
          playerSdk?.setTheme(props.theme);
          setTheme(props.theme);
        }
      }
    }, [props.theme]);

    const responsiveStyle: React.CSSProperties = {};
    if (props.responsive) {
      if (ratio) {
        responsiveStyle.paddingTop = `${ratio * 100}%`;
      } else {
        responsiveStyle.height = 0;
      }
      responsiveStyle.width = "100%";
    }
    return (
      <div
        style={{
          ...(props.style || {}),
          position: "relative",
          ...responsiveStyle,
        }}
      >
        <iframe
          allowFullScreen={true}
          allow="autoplay; picture-in-picture"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          ref={iframeRef}
        />
        {props.children && (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
            }}
          >
            {props.children}
          </div>
        )}
      </div>
    );
  }
);

export default ApiVideoPlayer;
