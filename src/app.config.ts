export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/map/index',
    'pages/report/index',
    'pages/message/index',
    'pages/mine/index',
    'pages/safety-route/index',
    'pages/drainage/index',
    'pages/report-detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#1E88E5',
    navigationBarTitleText: '城市内涝服务',
    navigationBarTextStyle: 'white',
    backgroundColor: '#F5F9FF'
  },
  tabBar: {
    color: '#A0AEC0',
    selectedColor: '#1E88E5',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/map/index',
        text: '积水地图'
      },
      {
        pagePath: 'pages/report/index',
        text: '我要上报'
      },
      {
        pagePath: 'pages/message/index',
        text: '消息'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
