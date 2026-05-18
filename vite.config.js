import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Vite 개발/빌드 설정입니다.
 * React plugin으로 JSX automatic runtime과 Fast Refresh를 활성화합니다.
 */
export default defineConfig({
  plugins: [react()],
});
