# Media Settings

청첩장 미디어는 아래 파일에서 관리합니다.

- `images.js`: 첫 화면 사진과 갤러리 사진
- `video.js`: 첫 진입 intro YouTube 영상
- `wedding.js`: BGM, 연락처, 계좌, 예식 정보

## 동영상 바꾸기

`video.js`에서 YouTube 링크 또는 직접 올린 파일을 선택할 수 있습니다.

### YouTube 링크 사용

```js
const introVideoUrl = 'https://youtu.be/vhpQPqpw3b4?si=Iot2-m-XIVz82zbJ';
const introVideoFile = '';
```

지원 형태:

- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`
- `VIDEO_ID`

### 직접 올린 영상 파일 사용

영상 파일을 `public/video`에 넣고 `introVideoFile`을 설정하면 됩니다.

```js
const introVideoUrl = '';
const introVideoFile = '/video/intro.mp4';
```

추천:

- 모바일 용량 때문에 5-10초 내외
- `mp4` 권장
- 세로형이면 첫 화면에 가장 자연스럽게 맞음
- 소리 있는 영상이어도 첫 진입 자동재생 정책 때문에 muted로 재생됨

## 사진 바꾸기

사진 파일은 `public/images`에 넣고 `images.js`에서 경로만 바꾸면 됩니다.

```js
export const weddingImages = {
  hero: '/images/hero.jpg',
  gallery: [
    '/images/gallery-01.jpg',
    '/images/gallery-02.jpg',
  ],
};
```
