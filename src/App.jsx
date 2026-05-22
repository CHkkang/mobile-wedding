import { useState } from 'react';
import { BgmToggle } from './components/common/BgmToggle';
import { IntroVideoOverlay } from './components/common/IntroVideoOverlay';
import { Toast } from './components/common/Toast';
import { ContactSection } from './components/sections/ContactSection';
import { GallerySection } from './components/sections/GallerySection';
import { GiftSection } from './components/sections/GiftSection';
import { HeroSection } from './components/sections/HeroSection';
import { InvitationSection } from './components/sections/InvitationSection';
import { LocationSection } from './components/sections/LocationSection';
import { ThanksSection } from './components/sections/ThanksSection';
import { WeddingInfoSection } from './components/sections/WeddingInfoSection';
import { wedding } from './data/wedding';
import { createWeddingIcs, downloadTextFile } from './utils/calendar';

/**
 * 모바일 청첩장의 최상위 page component입니다.
 * @returns {JSX.Element} 전체 wedding invitation layout을 반환합니다.
 */
export default function App() {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
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

  /**
   * 예식 정보를 iCalendar 파일로 내려받습니다.
   * @returns {void}
   */
  const handleCalendarDownload = () => {
    const calendar = createWeddingIcs({
      ...wedding.calendar,
      venue: wedding.venue,
      hall: wedding.hall,
      address: wedding.address,
    });

    downloadTextFile(calendar, wedding.calendar.filename, 'text/calendar;charset=utf-8');
  };

  /**
   * Web Share API를 사용해 청첩장 링크를 공유하고, 미지원 시 URL을 복사합니다.
   * @returns {Promise<void>} 공유 또는 복사 작업 완료 promise입니다.
   */
  const handleShare = async () => {
    const shareData = {
      title: wedding.calendar.title,
      text: `${wedding.groom} & ${wedding.bride} 결혼식에 초대합니다.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      return;
    }

    await handleCopy(window.location.href, '청첩장 링크가 복사되었습니다.');
  };

  return (
    <main className="min-h-screen bg-wedding-ivory text-wedding-ink">
      {isIntroVisible && (
        <IntroVideoOverlay
          videoId={wedding.introVideo.youtubeId}
          greeting={wedding.introVideo.greeting}
          durationMs={wedding.introVideo.durationMs}
          onFinish={() => setIsIntroVisible(false)}
        />
      )}
      <div className="mx-auto max-w-[480px] overflow-hidden bg-wedding-ivory shadow-[0_0_70px_rgba(43,43,43,0.08)]">
        <HeroSection wedding={wedding} nextId="invitation" />
        <InvitationSection parents={wedding.parents} nextId="info" />
        <WeddingInfoSection
          wedding={wedding}
          nextId="location"
          onCalendarDownload={handleCalendarDownload}
        />
        <LocationSection wedding={wedding} nextId="gallery" onCopy={handleCopy} />
        <GallerySection nextId="gift" />
        <GiftSection accounts={wedding.accounts} nextId="contact" onCopy={handleCopy} />
        <ContactSection contacts={wedding.contacts} nextId="thanks" />
        <ThanksSection wedding={wedding} onShare={handleShare} />
      </div>
      {!isIntroVisible && <BgmToggle src={wedding.bgm.src} title={wedding.bgm.title} />}
      <Toast message={toastMessage} />
    </main>
  );
}
