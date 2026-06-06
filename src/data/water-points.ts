import { WaterPoint } from '@/types';

export const waterPoints: WaterPoint[] = [
  {
    id: '1',
    name: '中山路与人民路交叉口',
    address: '中山路与人民路交叉口东北角',
    depth: 45,
    level: 'high',
    lat: 31.2304,
    lng: 121.4737,
    updateTime: '2024-06-06 09:15:00',
    status: 'active',
    isRoadClosed: true
  },
  {
    id: '2',
    name: '解放路隧道入口',
    address: '解放路隧道南口',
    depth: 30,
    level: 'medium',
    lat: 31.2354,
    lng: 121.4787,
    updateTime: '2024-06-06 09:10:00',
    status: 'active',
    isRoadClosed: true
  },
  {
    id: '3',
    name: '和平广场地下通道',
    address: '和平广场北侧地下通道',
    depth: 20,
    level: 'medium',
    lat: 31.2254,
    lng: 121.4687,
    updateTime: '2024-06-06 09:05:00',
    status: 'active',
    isRoadClosed: false
  },
  {
    id: '4',
    name: '建设大道与新华路口',
    address: '建设大道与新华路交叉口',
    depth: 12,
    level: 'low',
    lat: 31.2404,
    lng: 121.4637,
    updateTime: '2024-06-06 09:00:00',
    status: 'active',
    isRoadClosed: false
  },
  {
    id: '5',
    name: '滨江大道积水点',
    address: '滨江大道200号前',
    depth: 8,
    level: 'low',
    lat: 31.2324,
    lng: 121.4837,
    updateTime: '2024-06-06 08:55:00',
    status: 'cleared',
    isRoadClosed: false
  }
];

export const closedRoads = [
  { id: '1', name: '中山路（人民路至解放路段）', reason: '严重积水', closedTime: '2024-06-06 07:30:00' },
  { id: '2', name: '解放路隧道双向', reason: '隧道积水', closedTime: '2024-06-06 07:00:00' },
  { id: '3', name: '滨江大道下穿立交', reason: '积水过深', closedTime: '2024-06-06 06:45:00' }
];
