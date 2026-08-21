const introVideoUrl = 'https://youtu.be/vhpQPqpw3b4?si=Iot2-m-XIVz82zbJ';
const introVideoFile = '/video/intro.mov';

/**
 * YouTube URL 또는 video id에서 embed에 사용할 video id를 추출합니다.
 * @param {string} urlOrId YouTube URL 또는 video id입니다.
 * @returns {string} YouTube video id입니다.
 */
export function getYouTubeVideoId(urlOrId) {
  if (!urlOrId) {
    return '';
  }

  try {
    const url = new URL(urlOrId);

    if (url.hostname.includes('youtu.be')) {
      return url.pathname.replace('/', '');
    }

    if (url.pathname.includes('/shorts/')) {
      return url.pathname.split('/shorts/')[1]?.split('/')[0] ?? '';
    }

    if (url.pathname.includes('/embed/')) {
      return url.pathname.split('/embed/')[1]?.split('/')[0] ?? '';
    }

    return url.searchParams.get('v') ?? '';
  } catch {
    return urlOrId;
  }
}

/**
 * 첫 진입 intro video 설정입니다.
 *
 * YouTube 영상을 쓰려면 introVideoUrl에 링크를 붙여넣으면 됩니다.
 * 직접 올린 파일을 쓰려면 public/video에 파일을 넣고 introVideoFile을 설정합니다.
 * 예: const introVideoFile = '/video/intro.mp4';
 */
export const introVideo = {
  videoSrc: introVideoFile,
  youtubeUrl: introVideoUrl,
  youtubeId: introVideoFile ? '' : getYouTubeVideoId(introVideoUrl),
  greeting: '우리 결혼해요',
  durationMs: 5200,
};
