import { ControlName as SdkControlName, PlayerSdk, PlayerTheme as SdkPlayerTheme } from "@api.video/player-sdk";
import * as React from "react";

export interface ApiVideoPlayerVideo {
    id: string;
    live?: boolean;
    token?: string;
};

export type ControlName = SdkControlName;
export type PlayerTheme = SdkPlayerTheme;

export interface ApiVideoPlayerProps {
    style?: React.CSSProperties;
    autoplay?: boolean;
    muted?: boolean;
    metadata?: {
        [key: string]: string;
    };
    hideControls?: boolean;
    hidePoster?: boolean;
    chromeless?: boolean;
    loop?: boolean;
    hideTitle?: boolean;
    iframeUrl?: string;
    playbackRate?: number;
    showSubtitles?: boolean;
    video: ApiVideoPlayerVideo,
    volume?: number;
    controls?: ControlName[],
    theme?: PlayerTheme;
    videoStyleObjectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"; 
    videoStyleTransform?: string;



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
    onQualityChange?: (resolution: { height: number, width: number }) => void;
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

    children?:
    | JSX.Element
    | JSX.Element[]
};

interface ApiVideoPlayerState {
    videoSizeRatio?: number;
}

export default class ApiVideoPlayer extends React.Component<ApiVideoPlayerProps, ApiVideoPlayerState> {
    private playerSdk: PlayerSdk;
    private iframe: React.RefObject<HTMLIFrameElement>;

    constructor(props: ApiVideoPlayerProps) {
        super(props);
        this.iframe = React.createRef();
        this.state = {};
    }

    play() {
        this.playerSdk.play();
    }

    pause() {
        this.playerSdk.pause();
    }

    seek(time: number) {
        this.playerSdk.seek(time)
    }

    setCurrentTime(time: number) {
        this.playerSdk.setCurrentTime(time);
    }

    requestFullscreen() {
        this.playerSdk.requestFullscreen();
    }

    exitFullscreen() {
        this.playerSdk.exitFullscreen();
    }

    requestPictureInPicture() {
        this.playerSdk.requestPictureInPicture();
    }

    exitPictureInPicture() {
        this.playerSdk.exitPictureInPicture();
    }

    componentDidMount() {
        this.playerSdk = new PlayerSdk(this.iframe.current!, {
            ...(this.props),
            ...(this.props.video)
        });

        this.playerSdk.addEventListener("play", () => this.props.onPlay && this.props.onPlay());
        this.playerSdk.addEventListener("pause", () => this.props.onPause && this.props.onPause());
        this.playerSdk.addEventListener("controlsdisabled", () => this.props.onControlsDisabled && this.props.onControlsDisabled());
        this.playerSdk.addEventListener("controlsenabled", () => this.props.onControlsEnabled && this.props.onControlsEnabled());
        this.playerSdk.addEventListener("ended", () => this.props.onEnded && this.props.onEnded());
        this.playerSdk.addEventListener("error", () => this.props.onError && this.props.onError());
        this.playerSdk.addEventListener("firstplay", () => this.props.onFirstPlay && this.props.onFirstPlay());
        this.playerSdk.addEventListener("fullscreenchange", () => this.props.onFullscreenChange && this.props.onFullscreenChange());
        this.playerSdk.addEventListener("mouseenter", () => this.props.onMouseEnter && this.props.onMouseEnter());
        this.playerSdk.addEventListener("mouseleave", () => this.props.onMouseLeave && this.props.onMouseLeave());
        this.playerSdk.addEventListener("playerresize", () => this.props.onPlayerResize && this.props.onPlayerResize());
        this.playerSdk.addEventListener("qualitychange", (v) => this.props.onQualityChange && this.props.onQualityChange(v.resolution));
        this.playerSdk.addEventListener("ratechange", () => this.props.onRateChange && this.props.onRateChange());
        this.playerSdk.addEventListener("ready", () => this.props.onReady && this.props.onReady());
        this.playerSdk.addEventListener("resize", () => this.props.onResize && this.props.onResize());
        this.playerSdk.addEventListener("seeking", () => this.props.onSeeking && this.props.onSeeking());
        this.playerSdk.addEventListener("timeupdate", (v) => this.props.onTimeUpdate && this.props.onTimeUpdate(v.currentTime));
        this.playerSdk.addEventListener("useractive", () => this.props.onUserActive && this.props.onUserActive());
        this.playerSdk.addEventListener("userinactive", () => this.props.onUserInactive && this.props.onUserInactive());
        this.playerSdk.addEventListener("volumechange", (v) => this.props.onVolumeChange && this.props.onVolumeChange(v.volume));

        if(this.props.videoStyleObjectFit) {
            this.playerSdk.setVideoStyleObjectFit(this.props.videoStyleObjectFit);
        }

        if(this.props.videoStyleTransform) {
            this.playerSdk.setVideoStyleTransform(this.props.videoStyleTransform);
        }

        this.playerSdk.addEventListener("ready", () => {
            this.playerSdk.getVolume().then(d => this.props.onVolumeChange && this.props.onVolumeChange(d));
            this.playerSdk.getDuration().then(d => this.props.onDurationChange && this.props.onDurationChange(d));
            this.playerSdk.getVideoSize().then((size: { width: number, height: number }) => {
                const videoSizeRatio = size.height / size.width;
                if (this.props.onVideoSizeRatioChange) {
                    this.props.onVideoSizeRatioChange(videoSizeRatio);
                }
                this.setState((state) => {
                    return {
                        ...state,
                        videoSizeRatio,
                    }
                });
            });

            if (this.props.controls) {
                this.playerSdk.hideControls();
                this.playerSdk.showControls(this.props.controls);
            }

            if (this.props.theme) {
                this.playerSdk.setTheme(this.props.theme);
            }
        });
    }


    componentWillReceiveProps(nextProps: ApiVideoPlayerProps) {


        if (nextProps.video.id !== this.props.video.id
            || nextProps.video.token !== this.props.video.token
            || nextProps.video.live !== this.props.video.live) {
            this.playerSdk.loadConfig({
                ...(this.props),
                ...nextProps.video
            });
        }

        if (nextProps.chromeless !== this.props.chromeless) {
            this.playerSdk.setChromeless(nextProps.chromeless || false);
        }
        if (nextProps.muted !== this.props.muted) {
            nextProps.muted ? this.playerSdk.mute() : this.playerSdk.unmute();
        }
        if (nextProps.volume !== undefined && nextProps.volume !== this.props.volume) {
            this.playerSdk.setVolume(nextProps.volume);
        }
        if (nextProps.loop !== this.props.loop) {
            this.playerSdk.setLoop(nextProps.loop || false);
        }
        if (nextProps.hideTitle !== this.props.hideTitle) {
            nextProps.hideTitle ? this.playerSdk.hideTitle() : this.playerSdk.showTitle();
        }
        if (nextProps.hidePoster !== this.props.hidePoster) {
            nextProps.hidePoster ? this.playerSdk.hidePoster() : this.playerSdk.showPoster();
        }
        if (nextProps.showSubtitles !== undefined && nextProps.showSubtitles !== this.props.showSubtitles) {
            nextProps.showSubtitles ? this.playerSdk.showSubtitles() : this.playerSdk.hideSubtitles();
        }
        if (nextProps.autoplay !== this.props.autoplay) {
            this.playerSdk.setAutoplay(nextProps.autoplay || false);
        }
        if (nextProps.playbackRate !== undefined && nextProps.playbackRate !== this.props.playbackRate) {
            this.playerSdk.setPlaybackRate(nextProps.playbackRate);
        }
        if (nextProps.videoStyleObjectFit !== this.props.videoStyleObjectFit) {
            this.playerSdk.setVideoStyleObjectFit(nextProps.videoStyleObjectFit || "none");
        }
        if (nextProps.videoStyleTransform !== this.props.videoStyleTransform) {
            this.playerSdk.setVideoStyleTransform(nextProps.videoStyleTransform || "");
        }

        if (nextProps.controls !== undefined) {
            const allControls = ["play", "seekBackward", "seekForward", "playbackRate"
            , "volume", "fullscreen", "subtitles", "chapters"
            , "pictureInPicture", "progressBar", "chromecast", "download", "more"] as ControlName[];

            const oldControls = this.props.controls != undefined 
                ? this.props.controls || []
                : allControls;

            const nextControls = nextProps.controls != undefined
                ? nextProps.controls
                : allControls;

            const added = nextControls.filter(c => oldControls.indexOf(c) === -1);
            const removed = oldControls.filter(c => nextControls.indexOf(c) === -1);
            if (added.length > 0) this.playerSdk.showControls(added);
            if (removed.length > 0) this.playerSdk.hideControls(removed);
        }

        if (nextProps.theme !== undefined) {
            const themeHasChanged = (oldTheme: PlayerTheme, newTheme: PlayerTheme) => {
                return (Object.keys(oldTheme).length !== Object.keys(newTheme).length) || Object.keys(oldTheme).filter(k => oldTheme[k] !== newTheme[k]).length > 0;
            }
            if (this.props.theme === undefined || themeHasChanged(this.props.theme, nextProps.theme)) {
                this.playerSdk.setTheme(nextProps.theme);
            }
        }
    }

    render() {
        const responsiveStyle: React.CSSProperties = {};
        if (this.props.responsive) {
            if (this.state.videoSizeRatio) {
                responsiveStyle.paddingTop = `${this.state.videoSizeRatio * 100}%`;
            } else {
                responsiveStyle.height = 0;
            }
            responsiveStyle.width = "100%";
        }
        return <div style={{ ...(this.props.style || {}), ...responsiveStyle }}>
            <iframe allowFullScreen={true} allow="autoplay; picture-in-picture" style={{ width: "100%", height: "100%", border: "none", position: "absolute", top: 0, left: 0 }} ref={this.iframe} />
            {this.props.children && <div style={{ width: "100%", height: "100%", position: "absolute", top: 0 }}>{this.props.children}</div>}
        </div>;
    }
}
