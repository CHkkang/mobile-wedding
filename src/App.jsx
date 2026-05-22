import { useState } from 'react';
import { BgmToggle } from './components/common/BgmToggle';
import { Toast } from './components/common/Toast';
import { GallerySection } from './components/sections/GallerySection';
import { GiftSection } from './components/sections/GiftSection';
import { HeroSection } from './components/sections/HeroSection';
import { InvitationSection } from './components/sections/InvitationSection';
import { LocationSection } from './components/sections/LocationSection';
import { ThanksSection } from './components/sections/ThanksSection';
import { WeddingInfoSection } from './components/sections/WeddingInfoSection';
import { wedding } from './data/wedding';

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
        <HeroSection wedding={wedding} />
        <InvitationSection parents={wedding.parents} />
        <WeddingInfoSection wedding={wedding} />
        <LocationSection wedding={wedding} onCopy={handleCopy} />
        <GallerySection />
        <GiftSection accounts={wedding.accounts} onCopy={handleCopy} />
        <ThanksSection wedding={wedding} />
      </div>
      <BgmToggle src={wedding.bgm.src} title={wedding.bgm.title} />
      <Toast message={toastMessage} />
    </main>
  );
}
