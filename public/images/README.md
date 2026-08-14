# Image Replacement Guide

사진을 바꿀 때는 이 폴더에 파일을 넣고 `src/data/images.js`만 수정하면 됩니다.

추천 파일명:

- `hero.jpg`: 첫 화면 메인 사진
- `gallery-01.jpg`: 갤러리 1번
- `gallery-02.jpg`: 갤러리 2번
- `gallery-03.jpg`: 갤러리 3번
- `gallery-04.jpg`: 갤러리 4번
- `og-image.jpg`: 카카오톡/문자 공유 미리보기 이미지

`src/data/images.js` 예시:

```js
export const weddingImages = {
  hero: '/images/hero.jpg',
  gallery: [
    '/images/gallery-01.jpg',
    '/images/gallery-02.jpg',
    '/images/gallery-03.jpg',
    '/images/gallery-04.jpg',
  ],
};
```

공유 미리보기 이미지는 `index.html`의 `og:image`, `twitter:image`도 배포 URL 기준으로 맞춰야 합니다.
Cloudflare에 올린 뒤에는 카카오 공유 캐시가 남을 수 있으니 캐시 초기화가 필요할 수 있습니다.

동영상 파일은 `public/video` 폴더에 넣고 `src/data/video.js`에서 경로를 설정합니다.
