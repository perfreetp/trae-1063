import { WarningInfo } from '@/types';

export const warningList: WarningInfo[] = [
  {
    id: '1',
    title: '暴雨红色预警信号',
    level: 'red',
    content: '预计未来3小时内，我市大部分地区将出现100毫米以上降水，请注意防范城市内涝，尽量减少外出。',
    publishTime: '2024-06-06 08:30:00',
    source: '市气象局'
  },
  {
    id: '2',
    title: '暴雨橙色预警信号',
    level: 'orange',
    content: '预计未来6小时内，我市将出现50毫米以上降水，并伴有短时强降水和雷电活动。',
    publishTime: '2024-06-06 06:00:00',
    source: '市气象局'
  },
  {
    id: '3',
    title: '城市内涝风险提示',
    level: 'yellow',
    content: '受强降雨影响，我市部分低洼路段可能出现积水，请广大市民注意出行安全，避开易积水区域。',
    publishTime: '2024-06-06 05:30:00',
    source: '市应急管理局'
  }
];

export const rumorList = [
  {
    id: '1',
    title: '辟谣：某水库溃坝系谣言',
    content: '近日网传"某某水库溃坝"信息不实，目前全市水库运行正常，请广大市民不信谣不传谣。',
    publishTime: '2024-06-06 09:00:00',
    source: '市委网信办'
  },
  {
    id: '2',
    title: '辟谣：地铁全线停运不实',
    content: '网传"地铁全线停运"为不实信息，目前地铁各线路正常运行，部分站点加强了防汛措施。',
    publishTime: '2024-06-06 08:00:00',
    source: '市地铁集团'
  }
];
