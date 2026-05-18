import { useEffect, useRef, useState } from 'react';
import { loadKakaoMapSdk } from '../../utils/kakaoMap';

/**
 * Kakao map을 청첩장 안에 렌더링하고 key가 없으면 preview를 표시합니다.
 * @param {{address: string, appKey?: string, mapQuery: string, venue: string}} props 지도 정보입니다.
 * @returns {JSX.Element} Kakao map 또는 fallback preview UI를 반환합니다.
 */
export function KakaoMapPreview({ address, appKey, mapQuery, venue }) {
  const mapRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [shouldShowFallback, setShouldShowFallback] = useState(!appKey);

  useEffect(() => {
    if (!appKey || !mapRef.current) {
      return undefined;
    }

    let isMounted = true;
    setShouldShowFallback(false);

    loadKakaoMapSdk(appKey)
      .then(() => {
        window.kakao.maps.load(() => {
          if (!isMounted || !mapRef.current) {
            return;
          }

          const defaultPosition = new window.kakao.maps.LatLng(37.5302, 126.9217);
          const map = new window.kakao.maps.Map(mapRef.current, {
            center: defaultPosition,
            level: 3,
          });
          const marker = new window.kakao.maps.Marker({
            map,
            position: defaultPosition,
          });
          const places = new window.kakao.maps.services.Places();

          places.keywordSearch(mapQuery, (result, status) => {
            if (status !== window.kakao.maps.services.Status.OK || !result[0]) {
              setIsMapReady(true);
              return;
            }

            const placePosition = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            map.setCenter(placePosition);
            marker.setPosition(placePosition);
            setIsMapReady(true);
          });
        });
      })
      .catch(() => {
        setIsMapReady(false);
        setShouldShowFallback(true);
      });

    return () => {
      isMounted = false;
    };
  }, [appKey, mapQuery]);

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-wedding-accent/25 bg-wedding-mist">
      {appKey && !shouldShowFallback ? (
        <div className="relative h-56">
          {!isMapReady && (
            <div className="absolute inset-0 z-10 grid place-items-center bg-wedding-mist text-[13px] text-wedding-ink/55">
              카카오맵을 불러오는 중
            </div>
          )}
          <div ref={mapRef} className="h-full w-full" aria-label={`${venue} 카카오맵`} />
        </div>
      ) : (
        <div className="map-preview relative h-56">
          <div className="absolute left-[52%] top-[42%] -translate-x-1/2 -translate-y-full">
            <div className="h-5 w-5 rounded-full border-[5px] border-wedding-accent bg-wedding-white" />
            <div className="mx-auto h-5 w-[2px] bg-wedding-accent" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/55 bg-white/45 px-4 py-3 text-center backdrop-blur-md">
            <p className="text-[14px] font-semibold text-wedding-ink">{venue}</p>
            <p className="mt-1 text-[12px] text-wedding-ink/60">{address}</p>
          </div>
        </div>
      )}
    </div>
  );
}
