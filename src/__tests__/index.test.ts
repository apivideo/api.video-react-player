import { PlayerSdk } from '@api.video/player-sdk';
import ApiVideoPlayer, { ApiVideoPlayerProps } from '../index';

jest.mock('@api.video/player-sdk');

const createIframe = (id: string) => {
  const iframe = document.createElement('iframe') as HTMLIFrameElement;
  iframe.id = id;
  document.body.appendChild(iframe);
  return iframe;
}

const createPlayerWithMockedSdk = (props: Partial<ApiVideoPlayerProps> = {}) => {
  const iframe = createIframe("iframe-id")
  const player = new ApiVideoPlayer({ video: { id: "123" }, ...props });
  const playerSdk = new PlayerSdk("#" + iframe.id, { id: "123" });;
  player['playerSdk'] = playerSdk;
  return { player, playerSdk };
}

const updateProps = (player: ApiVideoPlayer, props: Partial<ApiVideoPlayerProps>) => {
  player.componentWillReceiveProps({
    ...player.props,
    ...props
  });
}

describe("<ApiVideoPlayer />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("autoplay prop update is properly handled", async () => {
    const { player, playerSdk } = createPlayerWithMockedSdk();

    updateProps(player, { autoplay: true });

    expect(playerSdk.setAutoplay).toHaveBeenCalledWith(true);
    expect(playerSdk.setAutoplay).not.toHaveBeenCalledWith(false);

    updateProps(player, { autoplay: false });

    expect(playerSdk.setAutoplay).toHaveBeenCalledWith(false);
  });

  test("controls prop update is properly handled", async () => {
    const { player, playerSdk } = createPlayerWithMockedSdk();

    updateProps(player, { controls: ['seekBackward'] });

    expect(playerSdk.hideControls).toHaveBeenCalledWith(['play', 'seekForward', 'playbackRate', 'volume', 'fullscreen', 'subtitles', 'chapters', 'pictureInPicture', 'progressBar', 'chromecast', 'download', 'more']);
  });

  test("controls prop update is properly handled with initial value", async () => {
    const { player, playerSdk } = createPlayerWithMockedSdk({controls: ['play']});

    updateProps(player, { controls: ['seekBackward'] });

    expect(playerSdk.hideControls).toHaveBeenCalledWith(['play']);
    expect(playerSdk.showControls).toHaveBeenCalledWith(['seekBackward']);
  });
});   