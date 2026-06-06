import { MessageItem } from '@/types';

export const messageList: MessageItem[] = [
  {
    id: '1',
    type: 'warning',
    title: '暴雨红色预警',
    content: '预计未来3小时内将有100毫米以上降水，请做好防范准备。',
    time: '2024-06-06 08:30:00',
    read: false
  },
  {
    id: '2',
    type: 'progress',
    title: '您上报的险情有新进展',
    content: '您上报的"中山路积水"案件，工作人员已到达现场处置。',
    time: '2024-06-06 08:45:00',
    read: false
  },
  {
    id: '3',
    type: 'rumor',
    title: '官方辟谣：水库溃坝系谣言',
    content: '近日网传"某某水库溃坝"信息不实，请不信谣不传谣。',
    time: '2024-06-06 09:00:00',
    read: true
  },
  {
    id: '4',
    type: 'system',
    title: '欢迎使用城市内涝服务',
    content: '感谢您注册使用，您可以通过小程序上报险情、查看积水信息。',
    time: '2024-06-05 10:00:00',
    read: true
  },
  {
    id: '5',
    type: 'warning',
    title: '道路封闭提醒',
    content: '中山路（人民路至解放路段）因积水严重已临时封闭，请绕行。',
    time: '2024-06-06 07:30:00',
    read: true
  }
];

export const subscribeOptions = [
  { id: '1', name: '暴雨预警推送', desc: '及时接收暴雨预警信息', enabled: true },
  { id: '2', name: '周边积水提醒', desc: '关注地点发生积水时推送', enabled: true },
  { id: '3', name: '上报进度通知', desc: '您上报的险情有新进展时通知', enabled: true },
  { id: '4', name: '官方辟谣推送', desc: '接收官方辟谣信息', enabled: false },
  { id: '5', name: '避险指引推送', desc: '暴雨天安全避险知识', enabled: false }
];
