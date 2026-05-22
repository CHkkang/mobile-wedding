import { createPortal } from 'react-dom';

/**
 * 앱 전체에서 사용하는 공통 modal shell component입니다.
 * @param {{eyebrow?: string, title: string, ariaLabel: string, children: React.ReactNode, onClose: () => void}} props Modal 표시 정보와 close handler입니다.
 * @returns {JSX.Element} Portal 기반 modal UI를 반환합니다.
 */
export function ModalShell({ eyebrow, title, ariaLabel, children, onClose }) {
  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-[#2b2724]/45 px-4 pb-4 pt-10 sm:items-center sm:py-8"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={onClose}
    >
      <div
        className="modal-panel max-h-[88dvh] w-full max-w-[430px] overflow-hidden rounded-t-[30px] border border-white/75 bg-wedding-ivory shadow-[0_-18px_60px_rgba(68,52,42,0.18)] sm:rounded-[30px] sm:shadow-[0_22px_70px_rgba(68,52,42,0.22)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-wedding-champagne/18 bg-wedding-ivory/96 px-5 pb-4 pt-5">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-wedding-champagne/45 sm:hidden" />
          <div className="flex items-start justify-between gap-4">
            <div>
              {eyebrow && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-wedding-champagne">
                  {eyebrow}
                </p>
              )}
              <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.01em] text-wedding-ink">
                {title}
              </h3>
            </div>
            <button
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-wedding-champagne/35 bg-wedding-white/90 text-[13px] font-semibold text-wedding-ink/62 shadow-[0_8px_20px_rgba(80,64,54,0.06)]"
              type="button"
              aria-label={`${title} 닫기`}
              onClick={onClose}
            >
              닫기
            </button>
          </div>
        </div>
        <div className="max-h-[calc(88dvh-112px)] overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
