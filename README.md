<!--<documentation_excluded>-->
[![badge](https://img.shields.io/twitter/follow/api_video?style=social)](https://twitter.com/intent/follow?screen_name=api_video) &nbsp; [![badge](https://img.shields.io/github/stars/apivideo/api.video-react-player?style=social)](https://github.com/apivideo/api.video-react-player) &nbsp; [![badge](https://img.shields.io/discourse/topics?server=https%3A%2F%2Fcommunity.api.video)](https://community.api.video)
![](https://github.com/apivideo/.github/blob/main/assets/apivideo_banner.png)
<h1 align="center">api.video React player component</h1>

![npm](https://img.shields.io/npm/v/@api.video/react-player) ![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)


[api.video](https://api.video) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.

## Table of contents

- [Table of contents](#table-of-contents)
- [Project description](#project-description)
- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Basic usage](#basic-usage)
- [Documentation](#documentation)
  - [Properties](#properties)
    - [Settings](#settings)
      - [Controls](#controls)
      - [Player theme](#player-theme)
      - [Ads](#ads)
      - [Responsiveness](#responsiveness)
    - [Callbacks](#callbacks)
  - [Methods](#methods)
  - [Use cases](#use-cases)
    - [Private videos](#private-videos)
    - [Defining metadata](#defining-metadata)
    - [Define your own controls](#define-your-own-controls)

<!--</documentation_excluded>-->
<!--<documentation_only>
---
title: api.video React Player component
meta:
  description: The official api.video React Player component for api.video. [api.video](https://api.video/) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.
---

# api.video React Player component

[api.video](https://api.video/) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.

</documentation_only>-->

## Project description

The official api.video React Player component.

## Getting started

### Installation

```sh
$ npm install --save @api.video/react-player
```

### Basic usage

You can then use the component in your app:

```tsx
import ApiVideoPlayer from '@api.video/react-player'

// ...

<ApiVideoPlayer video={{id: "vi5fv44Hol1jFrCovyktAJS9"}} style={{ height: '480px' }} />
```

## Documentation

### Properties

#### Settings

The following properties are used to configure the player. The value of each of these properties can be changed at any time during the playback.

| Property            | Mandatory | Type                                                                                             | Description                                                                                                                     | Default   |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | --------- |
| video               | **yes**   | {<br>&nbsp;&nbsp;id: string;<br>&nbsp;&nbsp;live?: boolean; <br>&nbsp;&nbsp;token?: string;<br>} | `id`: id of the video to play<br>`token` (optional): secret video token<br>`live` (optional): true for live videos              |           |
| style               | no        | React.CSSProperties                                                                              | CSS style to apply to the player container                                                                                      | {}        |
| autoplay            | no        | boolean                                                                                          | Define if the video should start playing as soon as it is loaded                                                                | false     |
| muted               | no        | boolean                                                                                          | The video is muted                                                                                                              | false     |
| metadata            | no        | { [key: string]: string }                                                                        | Object containing [metadata](https://api.video/blog/tutorials/dynamic-metadata/) (see **example** below)                        | {}        |
| hidePoster          | no        | boolean                                                                                          | Weither if the poster image displayed before the first play of the video should be hidden                                       | false     |
| chromeless          | no        | boolean                                                                                          | Chromeless mode: all controls are hidden                                                                                        | false     |
| loop                | no        | boolean                                                                                          | Once the video is finished it automatically starts again                                                                        | false     |
| hideTitle           | no        | boolean                                                                                          | The video title is hidden                                                                                                       | false     |
| playbackRate        | no        | number                                                                                           | The playback rate of the video: 1 for normal, 2 for x2, etc.                                                                    | 1         |
| showSubtitles       | no        | boolean                                                                                          | Determine if the video subtitles should be displayed                                                                            | false     |
| volume              | no        | number                                                                                           | The audio volume. From 0 to 1 (0 = muted, 1 = 100%)                                                                             | 1         |
| controls            | no        | ControlName[]                                                                                    | List of controls to display. If not specified and chromeless=false, all controls are displayed, see below [controls](#controls) | undefined |
| theme               | no        | PlayerTheme                                                                                      | Theme to apply to the player, see below [player theme](#player-theme). If not specified, the default theme is used              | undefined |
| responsive          | no        | boolean                                                                                          | Weither if the player shoulb be responsive. See below [responsiveness](#responsiveness)                                         | false     |
| videoStyleObjectFit | no        | "contain" \| "cover" \| "fill" \| "none" \| "scale-down"                                         | The `object-fit` CSS value of the video tag                                                                                     | undefined |
| videoStyleTransform | no        | string                                                                                           | The `transform` CSS value of the video tag (examples: "rotateY(180deg)")                                                        | undefined |
| ads                 | no        | {adTagUrl: string}                                                                               | see below [ads](#ads)                                                                                                           |  |

##### Controls

The `controls` property let you decide wich controls should be displayed on the player. Here is the list of all available controls: `play`, `seekBackward`, `seekForward`, `playbackRate`, `volume`, `fullscreen`, `subtitles`, `chapters`, `pictureInPicture`, `progressBar`, `chromecast`, `download`, `more`.

Examples

```tsx
{/* default: all controls are displayed */}
<ApiVideoPlayer 
 video={{id: "vi5fv44Hol1jFrCovyktAJS9"}} style={{ height: '480px' }} />

{/* all controls hidden (equivalent to chromeless=true) */}
<ApiVideoPlayer 
  video={{id: "vi5fv44Hol1jFrCovyktAJS9"}}
  style={{ height: '480px' }}
  controls={[]} />

{ /* only the play button & the unmute one are displayed */}
<ApiVideoPlayer 
  video={{id: "vi5fv44Hol1jFrCovyktAJS9"}}
  style={{ height: '480px' }}
  controls={["play", "unmute"]}/>
```

 
##### Player theme

The `theme` property let you customize the color of some elements on the player. Here is the list of customizable elements: `text`, `link`, `linkHover`, `trackPlayed`, `trackUnplayed`, `trackBackground`, `backgroundTop`, `backgroundBottom`, `backgroundText`, `linkActive`.

Example
```tsx
{ /* display the text in blue and the progress bar in red */}
<ApiVideoPlayer
  video={{id: "vi5fv44Hol1jFrCovyktAJS9"}}
  style={{ height: '480px' }}
  theme={{
    trackPlayed: "#FF0000",
    text: "blue"
  }}/>
```

##### Ads
Ads can be displayed in the player. To do so, you need to pass the `ads` option to the sdk constructor. In the `ads` object, pass the `adTagUrl` property with the url of the ad tag. The ad tag must be a VAST 2.0 or 3.0 url. For more information about VAST, check the [IAB documentation](https://www.iab.com/guidelines/vast/).

Note: ads are displayed using the [Google IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/quickstart).

##### Responsiveness

With `responsive={true}`, the player height will be automatically set to match the video with/height ratio, depending on the width of player.

Example

```tsx
{ /* the player width is 160px and response is true: if the video in a 16/9 one, the height of the player will be automatically set to 90px (160 / (16/9)) */ }
<ApiVideoPlayer 
  video={{id: "vi5fv44Hol1jFrCovyktAJS9"}}
  style={{width: "160px"}}
  responsive={true} />
```

#### Callbacks

| Property               | Type                                                    | Description                                                                                                 |
| ---------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| onPlay                 | () => void                                              | Called when a `play` event is triggered                                                                     |
| onPause                | () => void                                              | Called when a `pause` event is triggered                                                                    |
| onControlsDisabled     | () => void                                              | Called when a the controls are disabled                                                                     |
| onControlsEnabled      | () => void                                              | Called when a the controls are enabled                                                                      |
| onEnded                | () => void                                              | Called when a `ended` event is triggered                                                                    |
| onError                | () => void                                              | Called when a `error` event is triggered                                                                    |
| onFirstPlay            | () => void                                              | Called when a `firstPlay` event is triggered                                                                |
| onFullscreenChange     | () => void                                              | Called when a `fullscreen` event is triggered                                                               |
| onMouseEnter           | () => void                                              | Called when the mouse enter in the player area                                                              |
| onMouseLeave           | () => void                                              | Called when the mouse leave the player area                                                                 |
| onPlayerResize         | () => void                                              | Called when a `resize` event is triggered                                                                   |
| onQualityChange        | (resolution: { height: number, width: number }) => void | Called when the quality of the video changes. The new quality is provided                                   |
| onVideoSizeRatioChange | (ratio: number) => void                                 | Called when the size ratio of the video changes (ie. when a new video is loaded). The new ratio is provided |
| onRateChange           | () => void                                              | Called when the playback rate changes                                                                       |
| onReady                | () => void                                              | Called when a `ready` event is triggered                                                                    |
| onSeeking              | () => void                                              | Called when a `seek` event is triggered                                                                     |
| onTimeUpdate           | (currentTime: number) => void                           | Called when a `timeupdate` event is triggered. The current time is provided                                 |
| onUserActive           | () => void                                              | Called when a `useractive` event is triggered                                                               |
| onUserInactive         | () => void                                              | Called when a `userinactive` event is triggered                                                             |
| onVolumeChange         | (volume: number) => void                                | Called when the volume changes. The volume is provided.                                                     |
| onDurationChange       | (duration: number) => void                              | Called when the duration of the video change. The duration is provided                                      |

### Methods

| Method                       | Description                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| play()                       | Play the video                                                                                      |
| pause()                      | Pause the video                                                                                     |
| seek(time: number)           | Seek the playback using the specified amount of time (in seconds)                                   |
| setCurrentTime(time: number) | Go to the specified time (in seconds)                                                               |
| requestFullscreen()          | Request fullscreen mode (this may not work in some cases depending on browser restrictions)         |
| exitFullscreen()             | Leave fullscreen mode                                                                               |
| requestPictureInPicture()    | Request picture in picture mode (this may not work in some cases depending on browser restrictions) |
| exitPictureInPicture()       | Leave picture in picture mode                                                                       |

### Use cases

#### Private videos

To play a [private video](https://api.video/blog/tutorials/tutorial-private-videos/), add the video view token in the video attribute:

```tsx
// ...
<ApiVideoPlayer video={{
    id: "vi5fv44Hol1jFrCovyktAJS9",
  token: "e1bdf9a8-da40-421e-87f3-75b15232c531"}}
  style={{ height: '480px' }} />
```

#### Defining metadata

```tsx
// ...
<ApiVideoPlayer
  video={{ id: "vi5fv44Hol1jFrCovyktAJS9" }}
  style={{ height: '480px' }}
  metadata={{"userName": "Alfred"}} />
```

#### Define your own controls

```tsx
const playerRef = useRef<ApiVideoPlayer>(null);

return
<ApiVideoPlayer
  video={{ id: "vi5jC9kQs2I3PdmVBjgcIg45" }}
  style={{ height: '480px' }}
  chromeless={true}
  ref={playerRef}>
  <button onClick={() => playerRef.current?.play()}>play</button>
  <button onClick={() => playerRef.current?.pause()}>pause</button>
</ApiVideoPlayer>
```
