import React, { useEffect, useRef, useState } from 'react';

const wedding = {
  groom: '강찬혁',
  bride: '김민지',
  date: '2026. 12. 12 SAT',
  time: '오전 11시 20분',
  venue: '여의도 더 파티움',
  address: '서울 영등포구 은행로 30',
  mapQuery: '여의도 더 파티움',
  parents: {
    groom: '강기홍 · 김은이의 장남 강찬혁',
    bride: '김영수 · 윤희자의 장녀 김민지',
  },
  accounts: [
    { label: '신랑측', bank: '국민은행', number: '000000-00-000000', holder: '강찬혁' },
    { label: '신부측', bank: '신한은행', number: '000-000-000000', holder: '김민지' },
  ],
};

const galleryImages = [
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85',
];

const transitGuides = [
  {
    title: '지하철 이용 시',
    items: [
      '9호선 국회의사당역 3번 출구 도보 5분',
      '5호선 여의나루역 1번 출구 셔틀버스 이용',
      '여의나루역 2번 출구 버스정류장(19140)에서 마을버스 10번 승차 후 기계회관 정류장 하차',
      '여의나루역 → 더파티움여의도 무료 셔틀버스 운영',
    ],
  },
  {
    title: '버스 이용 시',
    items: [
      '기계회관 [No.19-320] 일반 10, 마을 영등포10',
      '산업은행본점 [No.19-281] 일반 10, 간선 463, 마을 영등포10',
      '여의도순복음교회 [No.19-303] 일반 10, 간선 463, 지선 5633, 마을 영등포10',
      '여의도 환승센터 [No.19-016] 일반 88, 간선 8600, 8601',
      '여의도 환승센터 [No.19-008] 간선 N16, 160, 260, 360, 600, 662 / 지선 5012, 6623, 6628',
    ],
  },
  {
    title: '자가용 이용 시',
    items: [
      '네비게이션: 더파티움여의도 또는 서울 영등포구 은행로 30',
      '강남방면: 88올림픽대로에서 여의도 63빌딩 방면 진출 후 여의도공원 방면 직진, 중소기업중앙회관 지하 주차장 진입',
      '강북방면: 서강대교를 건너 순복음교회 방면 좌회전 후 두 번째 삼거리 우회전, 중소기업중앙회 지하 주차장 진입',
      '마포대교: 마포대교를 건너자마자 우회전 후 바로 좌회전, 중소기업중앙회관 지하 주차장 진입',
      '제1주차장: 더파티움여의도 본관 주차장(중소기업중앙회)',
      '제2주차장: 이용 시 반드시 본관에 들러 직원 안내를 받은 뒤 주차 등록 및 혜택 적용',
    ],
  },
];

const kakaoMapAppKey = import.meta.env.VITE_KAKAO_MAP_APP_KEY;

/**
 * 모바일 청첩장의 최상위 page component입니다.
 * @returns {JSX.Element} 전체 wedding invitation layout을 반환합니다.
 */
export default function App() {
  const [toastMessage, setToastMessage] = useState('');

  /**
   * Clipboard API를 사용해 사용자가 누른 정보를 복사합니다.
   * @param {string} text 복사할 텍스트입니다.
   * @param {string} successMessage 복사 완료 후 표시할 메시지입니다.
   * @returns {Promise<void>} Clipboard 작업 완료 promise입니다.
   */
  const handleCopy = async (text, successMessage) => {
    await navigator.clipboard.writeText(text);
    setToastMessage(successMessage);
    window.setTimeout(() => setToastMessage(''), 1800);
  };

  return (
    <main className="min-h-screen bg-wedding-ivory text-wedding-ink">
      <div className="mx-auto max-w-[480px] overflow-hidden bg-wedding-ivory">
        <HeroSection />
        <InvitationSection />
        <WeddingInfoSection />
        <LocationSection onCopy={handleCopy} />
        <GallerySection />
        <GiftSection onCopy={handleCopy} />
        <ThanksSection />
      </div>
      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[320px] -translate-x-1/2 rounded-full border border-white/60 bg-white/60 px-5 py-3 text-center text-[13px] text-wedding-ink/75 backdrop-blur-md">
          {toastMessage}
        </div>
      )}
    </main>
  );
}

/**
 * 큰 세로사진과 핵심 wedding identity를 보여주는 hero section입니다.
 * @returns {JSX.Element} Hero UI를 반환합니다.
 */
function HeroSection() {
  return (
    <section className="snap-section relative min-h-screen px-5 pb-10 pt-5">
      <div className="relative h-[72vh] min-h-[560px] overflow-hidden rounded-b-[220px] rounded-t-[28px]">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1100&q=88"
          alt="겨울 감성 웨딩 세로 사진"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/35" />
        <div className="absolute inset-0 bg-wedding-frost/15 mix-blend-screen" />
        <div className="absolute bottom-8 left-1/2 w-[86%] -translate-x-1/2 rounded-2xl border border-white/35 bg-white/20 px-6 py-7 text-center text-white backdrop-blur-md">
          <p className="font-display text-[34px] leading-none tracking-[0.12em]">
            {wedding.groom} &amp; {wedding.bride}
          </p>
          <p className="mt-4 text-[13px] tracking-[0.26em]">{wedding.date}</p>
        </div>
      </div>
      <ScrollCue />
    </section>
  );
}

/**
 * 다음 section으로 이어지는 visual cue입니다.
 * @returns {JSX.Element} 아래 방향 indicator를 반환합니다.
 */
function ScrollCue() {
  return (
    <div className="mt-8 flex justify-center text-wedding-accent" aria-hidden="true">
      <span className="text-3xl leading-none">↓</span>
    </div>
  );
}

/**
 * Viewport 진입 여부를 감지해 section reveal animation을 제어합니다.
 * @returns {[React.RefObject<HTMLElement>, boolean]} 관찰 대상 ref와 노출 여부입니다.
 */
function useRevealOnScroll() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const target = sectionRef.current;

    if (!target) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px 0px -18% 0px',
        threshold: 0.22,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return [sectionRef, isVisible];
}

/**
 * 초대 문구를 담는 invitation section입니다.
 * @returns {JSX.Element} Invitation UI를 반환합니다.
 */
function InvitationSection() {
  return (
    <Section id="invitation" eyebrow="Invitation" title="초대합니다">
      <div className="space-y-5 text-center text-[15px] leading-8 text-wedding-ink/80">
        <p>
          서로의 계절을 따뜻하게 채워 온 두 사람이
          <br />
          이제 하나의 겨울을 함께 맞이하려 합니다.
        </p>
        <p>
          소중한 걸음으로 축복해 주시면
          <br />
          오래도록 깊이 간직하겠습니다.
        </p>
        <p className="pt-3 text-[14px] text-wedding-ink/65">
          {wedding.parents.groom}
          <br />
          {wedding.parents.bride}
        </p>
      </div>
    </Section>
  );
}

/**
 * 예식 일시와 장소 정보를 제공하는 section입니다.
 * @returns {JSX.Element} Wedding info UI를 반환합니다.
 */
function WeddingInfoSection() {
  return (
    <Section id="info" eyebrow="Wedding Day" title="예식정보">
      <BlurCard>
        <InfoRow label="날짜" value={wedding.date} />
        <InfoRow label="시간" value={wedding.time} />
        <InfoRow label="장소" value={wedding.venue} />
      </BlurCard>
    </Section>
  );
}

/**
 * 오시는 길과 지도 placeholder를 제공하는 section입니다.
 * @param {{onCopy: (text: string, successMessage: string) => Promise<void>}} props Location action props입니다.
 * @returns {JSX.Element} Location UI를 반환합니다.
 */
function LocationSection({ onCopy }) {
  return (
    <Section id="location" eyebrow="Location" title="오시는 길">
      <BlurCard>
        <p className="text-center text-[16px] font-medium">{wedding.venue}</p>
        <p className="mt-2 text-center text-[14px] text-wedding-ink/65">{wedding.address}</p>
        <KakaoMapPreview
          address={wedding.address}
          appKey={kakaoMapAppKey}
          mapQuery={wedding.mapQuery}
          venue={wedding.venue}
        />
        <div className="mt-5 grid grid-cols-2 gap-3">
          <ActionButton
            label="카카오맵"
            onClick={() =>
              window.open(
                `https://map.kakao.com/link/search/${encodeURIComponent(wedding.mapQuery)}`,
                '_blank',
              )
            }
          />
          <ActionButton
            label="주소 복사"
            onClick={() => onCopy(wedding.address, '주소가 복사되었습니다.')}
          />
        </div>
        <TransitGuideList guides={transitGuides} />
      </BlurCard>
    </Section>
  );
}

/**
 * Kakao Maps SDK script를 동적으로 로드합니다.
 * @param {string} appKey Kakao JavaScript API key입니다.
 * @returns {Promise<void>} SDK 로드 완료 promise입니다.
 */
function loadKakaoMapSdk(appKey) {
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

/**
 * Kakao map을 청첩장 안에 렌더링하고 key가 없으면 preview를 표시합니다.
 * @param {{address: string, appKey?: string, mapQuery: string, venue: string}} props 지도 정보입니다.
 * @returns {JSX.Element} Kakao map 또는 fallback preview UI를 반환합니다.
 */
function KakaoMapPreview({ address, appKey, mapQuery, venue }) {
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

/**
 * 교통수단별 오시는 길 안내를 카드 목록으로 표시합니다.
 * @param {{guides: Array<{title: string, items: string[]}>}} props 교통 안내 데이터입니다.
 * @returns {JSX.Element} Transit guide list UI를 반환합니다.
 */
function TransitGuideList({ guides }) {
  return (
    <div className="mt-7 space-y-4 text-left">
      {guides.map((guide) => (
        <article key={guide.title} className="rounded-xl bg-wedding-white/45 p-4">
          <h3 className="text-[14px] font-semibold text-wedding-ink">{guide.title}</h3>
          <ul className="mt-3 space-y-2">
            {guide.items.map((item) => (
              <li key={item} className="flex gap-2 text-[13px] leading-6 text-wedding-ink/65">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-wedding-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

/**
 * 웨딩 사진을 2열 grid로 보여주는 gallery section입니다.
 * @returns {JSX.Element} Gallery UI를 반환합니다.
 */
function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Section id="gallery" eyebrow="Gallery" title="Gallery">
      <div className="grid grid-cols-2 gap-3">
        {galleryImages.map((image, index) => (
          <button
            key={image}
            className="aspect-[3/4] overflow-hidden rounded-2xl bg-wedding-mist"
            onClick={() => setSelectedImage({ src: image, index })}
            aria-label={`웨딩 갤러리 사진 ${index + 1} 크게 보기`}
          >
            <img
              className="h-full w-full object-cover"
              src={image}
              alt={`웨딩 갤러리 사진 ${index + 1}`}
            />
          </button>
        ))}
      </div>
      {selectedImage && (
        <GalleryModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </Section>
  );
}

/**
 * 갤러리 이미지를 큰 화면으로 보여주는 modal component입니다.
 * @param {{image: {src: string, index: number}, onClose: () => void}} props Modal image와 close handler입니다.
 * @returns {JSX.Element} Gallery modal UI를 반환합니다.
 */
function GalleryModal({ image, onClose }) {
  return (
    <div
      className="fixed inset-0 z-40 grid place-items-center bg-wedding-ink/55 px-5 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`웨딩 갤러리 사진 ${image.index + 1} 크게 보기`}
    >
      <div className="relative w-full max-w-[420px]" onClick={(event) => event.stopPropagation()}>
        <button
          className="absolute -right-1 -top-12 rounded-full border border-white/50 bg-white/25 px-4 py-2 text-[13px] text-white backdrop-blur"
          onClick={onClose}
          aria-label="큰 사진 닫기"
        >
          닫기
        </button>
        <img
          className="gallery-spin-in max-h-[78vh] w-full rounded-2xl object-contain"
          src={image.src}
          alt={`웨딩 갤러리 큰 사진 ${image.index + 1}`}
        />
      </div>
    </div>
  );
}

/**
 * 축의금 계좌 정보를 표시하는 section입니다.
 * @param {{onCopy: (text: string, successMessage: string) => Promise<void>}} props Gift action props입니다.
 * @returns {JSX.Element} Gift account UI를 반환합니다.
 */
function GiftSection({ onCopy }) {
  return (
    <Section id="gift" eyebrow="With Heart" title="마음 전하실 곳">
      <div className="space-y-3">
        {wedding.accounts.map((account) => (
          <BlurCard key={account.label}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] text-wedding-accent">{account.label}</p>
                <p className="mt-2 text-[15px] font-medium">
                  {account.bank} {account.number}
                </p>
                <p className="mt-1 text-[13px] text-wedding-ink/60">예금주 {account.holder}</p>
              </div>
              <button
                className="shrink-0 rounded-full border border-wedding-accent/35 px-4 py-2 text-[12px] text-wedding-ink/70"
                onClick={() =>
                  onCopy(
                    `${account.bank} ${account.number} ${account.holder}`,
                    `${account.label} 계좌가 복사되었습니다.`,
                  )
                }
              >
                복사
              </button>
            </div>
          </BlurCard>
        ))}
      </div>
    </Section>
  );
}

/**
 * 마지막 감사 인사를 담는 closing section입니다.
 * @returns {JSX.Element} Thanks UI를 반환합니다.
 */
function ThanksSection() {
  return (
    <section className="snap-section px-6 pb-20 pt-14 text-center">
      <p className="font-display text-3xl tracking-[0.08em]">Thank You</p>
      <p className="mt-6 text-[14px] leading-7 text-wedding-ink/65">
        저희의 시작을 함께해 주셔서 감사합니다.
        <br />
        따뜻한 마음 오래 간직하겠습니다.
      </p>
      <p className="mt-10 font-display text-2xl tracking-[0.12em]">
        {wedding.groom} &amp; {wedding.bride}
      </p>
    </section>
  );
}

/**
 * 청첩장 본문 section의 공통 layout component입니다.
 * @param {{id: string, eyebrow: string, title: string, children: React.ReactNode}} props Section props입니다.
 * @returns {JSX.Element} 공통 section layout을 반환합니다.
 */
function Section({ id, eyebrow, title, children }) {
  const [sectionRef, isVisible] = useRevealOnScroll();

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`snap-section reveal-section px-6 py-16 ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="mb-9 text-center">
        <p className="text-[11px] uppercase tracking-[0.32em] text-wedding-accent">{eyebrow}</p>
        <h2 className="mt-3 font-display text-[32px] font-normal tracking-[0.04em]">{title}</h2>
      </div>
      {children}
      <ScrollCue />
    </section>
  );
}

/**
 * 반투명 blur card style을 재사용하는 presentational component입니다.
 * @param {{children: React.ReactNode}} props Card content입니다.
 * @returns {JSX.Element} Blur card layout을 반환합니다.
 */
function BlurCard({ children }) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/35 p-5 backdrop-blur-md">
      {children}
    </div>
  );
}

/**
 * label/value 형태의 wedding detail row입니다.
 * @param {{label: string, value: string}} props Row props입니다.
 * @returns {JSX.Element} Detail row UI를 반환합니다.
 */
function InfoRow({ label, value }) {
  return (
    <div className="flex border-b border-wedding-accent/15 py-4 last:border-b-0">
      <dt className="w-16 shrink-0 text-[13px] text-wedding-accent">{label}</dt>
      <dd className="text-[15px] leading-6 text-wedding-ink/80">{value}</dd>
    </div>
  );
}

/**
 * 지도와 주소 관련 command button입니다.
 * @param {{label: string, onClick: () => void}} props Button label과 click handler입니다.
 * @returns {JSX.Element} Action button UI를 반환합니다.
 */
function ActionButton({ label, onClick }) {
  return (
    <button
      className="rounded-full border border-wedding-accent/35 bg-wedding-white/50 px-4 py-3 text-[13px] text-wedding-ink/75 backdrop-blur"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
