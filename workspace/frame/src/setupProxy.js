const {
  createProxyMiddleware,
  responseInterceptor,
} = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/client',
    createProxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true,
      followRedirects: true,
      onProxyReq: (proxyReq, req, res) => {
        console.log('request')
      },
      selfHandleResponse: true,
      onProxyRes: responseInterceptor(
        async (responseBuffer, proxyRes, req, res) => {
          return responseBuffer
        },
      ),
    }),
  )
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5002',
      changeOrigin: true,
    }),
  )
  app.use(
    '/flow.access.AccessAPI',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    }),
  )
}
