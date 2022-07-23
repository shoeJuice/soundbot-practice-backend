export default {
    port: process.env.PORT || 80,
    host: process.env.HOST || 'localhost',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
}