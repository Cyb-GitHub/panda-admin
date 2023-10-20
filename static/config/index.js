/**
 * 开发环境
 */
;(function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
  //window.SITE_CONFIG['baseUrl'] = 'http://47.92.248.108:8080/renren-fast';
  //window.SITE_CONFIG['ws'] = 'ws://47.92.248.108:8080/renren-fast';
  window.SITE_CONFIG['baseUrl'] = 'https://api.lpgcom.net/renren-fast';
  window.SITE_CONFIG['ws'] = 'wss://api.lpgcom.net/renren-fast';
   //window.SITE_CONFIG['baseUrl'] = 'http://localhost:9090/renren-fast';
   //window.SITE_CONFIG['ws'] = 'ws://localhost:9090/renren-fast';

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})();
