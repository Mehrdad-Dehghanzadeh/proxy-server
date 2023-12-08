/** @format */

import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

let cookie
function relayRequestHeaders(proxyReq) {
  if (cookie) {
    proxyReq.setHeader('cookie', cookie)
  }
}

function relayResponseHeaders(proxyRes) {
  let proxyCookie = proxyRes.headers['set-cookie']
  if (proxyCookie) {
    cookie = proxyCookie
  }
}

app.use(
  '/',
  createProxyMiddleware({
    target: 'http://192.168.104.123:8585/api/v1',
    changeOrigin: true,
    onProxyReq: relayRequestHeaders,
    onProxyRes: relayResponseHeaders
  })
)

app.listen(5050, () => {
  console.log('Proxy Server is Run 5050')
})
