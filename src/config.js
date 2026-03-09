const config = {
  basename: '',
  defaultPath: '/dashboard',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 4,

  // environment
  env: import.meta.env.VITE_REACT_APP_ENV || 'development',

  // ✅ BACKEND API BASE URL
  ip: import.meta.env.VITE_REACT_APP_API_ENDPOINT || 'http://localhost:7000',

  // ✅ TOKEN MUST COME FROM STORAGE (NOT .env)
  token: localStorage.getItem('token'),

  // image server
  imgServerip:
    import.meta.env.VITE_REACT_APP_IMG_API_ENDPOINT ||
    'http://localhost:7000/uploads'
};

export default config;
