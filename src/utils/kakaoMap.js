/**
 * Kakao Maps SDK script를 동적으로 로드합니다.
 * @param {string} appKey Kakao JavaScript API key입니다.
 * @returns {Promise<void>} SDK 로드 완료 promise입니다.
 */
export function loadKakaoMapSdk(appKey) {
  return new Promise((resolve, reject) => {
    if (window.kakao?.maps) {
      resolve();
      return;
    }

    const existingScript = document.querySelector('script[data-kakao-map-sdk="true"]');

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', reject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.dataset.kakaoMapSdk = 'true';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);

    window.setTimeout(() => {
      if (!window.kakao?.maps) {
        reject(new Error('Kakao Maps SDK load timeout'));
      }
    }, 5000);
  });
}
