/** Cấu hình Tailwind (dựng sẵn css/tailwind.css thay cho bản CDN chạy trong trình duyệt).
 *  Dựng lại sau khi đổi class: npm run build:css */
module.exports = {
  content: ['./index.html', './404.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        heritage: {
          red: '#8B1E1E',
          redDark: '#6F1515',
          gold: '#C59B27',
          goldDark: '#A67C18',
          ivory: '#FAF6EE',
          warm: '#F5EFE6',
          border: '#EADECF',
          text: '#2A2521',
          muted: '#5C5248'
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'Merriweather Fallback', 'Georgia', 'serif'],
        sans: ['Be Vietnam Pro', 'Be Vietnam Pro Fallback', 'Inter', 'sans-serif']
      }
    }
  }
};
