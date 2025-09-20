const PROXY_CONFIG = [
  {
    context: '/api', // This is the path your Angular app will use
    target: 'http://localhost:3000', // This is your backend API's address
    secure: false, // Set to true if your backend uses HTTPS
    changeOrigin: true, // This is important for virtual hosting
    logLevel: 'debug', // 'debug', 'info', 'warn', 'error'
  }
];

module.exports = PROXY_CONFIG;