import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy =  (app: any) =>{
  console.log('set-proxy-....');
  app.use(
    createProxyMiddleware('/api1', {
      target: 'http://mysite.io',
      changeOrigin: true,
      pathRewrite: {
        '^/api1': '/api1',
      },
    }),
  );
}

export default proxy;