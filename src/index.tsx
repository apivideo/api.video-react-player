import * as React from "react";

interface Props {
    videoId: string
}

export default class ApiVideoReactPlayer extends React.Component<Props> {
    render() {
        return <iframe
            src={`https://embed.api.video/vod/${this.props.videoId}`}
            width="100%"
            height="100%"
            scrolling="no"
            allow="fullscreen"
            style={{ border: 0 }}
        ></iframe>;
    }
}
