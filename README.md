[![badge](https://img.shields.io/twitter/follow/api_video?style=social)](https://twitter.com/intent/follow?screen_name=api_video) &nbsp; [![badge](https://img.shields.io/github/stars/apivideo/api.video-react-player?style=social)](https://github.com/apivideo/api.video-react-player) &nbsp; [![badge](https://img.shields.io/discourse/topics?server=https%3A%2F%2Fcommunity.api.video)](https://community.api.video)
![](https://github.com/apivideo/API_OAS_file/blob/master/apivideo_banner.png)
<h1 align="center">api.video React player component</h1>

![npm](https://img.shields.io/npm/v/@api.video/react-player) ![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)


[api.video](https://api.video) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.

# Table of contents

- [Table of contents](#table-of-contents)
- [Project description](#project-description)
- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Basic usage](#basic-usage)
  - [Define your own controls](#define-your-own-controls)
- [Documentation](#documentation)
  - [Properties](#properties)
    - [Settings](#settings)
    - [Callbacks](#callbacks)
  - [Methods](#methods)

# Project description


# Getting started

A React component for playing api.video videos.

## Installation

```sh
$ npm install --save @api.video/react-player
```

## Basic usage

You can then use the component in your app: 

```typescript
import ApiVideoPlayer from '@api.video/react-player'

// ...

<ApiVideoPlayer video={{id: "vi5fv44Hol1jFrCovyktAJS9"}} />
```


## Define your own controls

```typescript

const playerRef = useRef<ApiVideoPlayer>(null);

return
<ApiVideoPlayer      
  video={{ id: "vi5jC9kQs2I3PdmVBjgcIg45" }}
  chromeless={true}
  ref={playerRef}>
    <button onClick={() => playerRef.current?.play()}>play</button>
    <button onClick={() => playerRef.current?.pause()}>pause</button>
</ApiVideoPlayer>
```

# Documentation

## Properties

### Settings

The following properties are used to configure the player. The value of each of these properties can be changed at any time during the playback.

| Property      | Mandatory | Type                                                                                             | Description | Default   |
| ------------- | --------- | ------------------------------------------------------------------------------------------------ | ----------- | --------- |
| video         | **yes**   | {<br>&nbsp;&nbsp;id: string;<br>&nbsp;&nbsp;live?: boolean; <br>&nbsp;&nbsp;token?: string;<br>} |             |           |
| style         | no        | React.CSSProperties                                                                              |             | {}        |
| autoplay      | no        | boolean                                                                                          |             | false     |
| muted         | no        | boolean                                                                                          |             | false     |
| metadata      | no        | { [key: string]: string }                                                                        |             | {}        |
| hideControls  | no        | boolean                                                                                          |             | false     |
| hidePoster    | no        | boolean                                                                                          |             | false     |
| chromeless    | no        | boolean                                                                                          |             | false     |
| loop          | no        | boolean                                                                                          |             | false     |
| hideTitle     | no        | boolean                                                                                          |             | false     |
| playbackRate  | no        | number                                                                                           |             | 1         |
| showSubtitles | no        | boolean                                                                                          |             | false     |
| volume        | no        | number                                                                                           |             | 1         |
| controls      | no        | ControlName[]                                                                                    |             | undefined |
| theme         | no        | PlayerTheme                                                                                      |             | undefined |
| responsive    | no        | boolean                                                                                          |             | false     |

### Callbacks

| Property               | Type                                                    | Description |
| ---------------------- | ------------------------------------------------------- | ----------- |
| onPlay                 | () => void                                              |             |
| onPause                | () => void                                              |             |
| onControlsDisabled     | () => void                                              |             |
| onControlsEnabled      | () => void                                              |             |
| onEnded                | () => void                                              |             |
| onError                | () => void                                              |             |
| onFirstPlay            | () => void                                              |             |
| onFullscreenChange     | () => void                                              |             |
| onMouseEnter           | () => void                                              |             |
| onMouseLeave           | () => void                                              |             |
| onPlayerResize         | () => void                                              |             |
| onQualityChange        | (resolution: { height: number, width: number }) => void |             |
| onVideoSizeRatioChange | (ratio: number) => void                                 |             |
| onRateChange           | () => void                                              |             |
| onReady                | () => void                                              |             |
| onResize               | () => void                                              |             |
| onSeeking              | () => void                                              |             |
| onTimeUpdate           | (currentTime: number) => void                           |             |
| onUserActive           | () => void                                              |             |
| onUserInactive         | () => void                                              |             |
| onVolumeChange         | (volume: number) => void                                |             |
| onDurationChange       | (duration: number) => void                              |             |

## Methods

| Method                       | Description |
| ---------------------------- | ----------- |
| play()                       |             |
| pause()                      |             |
| seek(time: number)           |             |
| setCurrentTime(time: number) |             |