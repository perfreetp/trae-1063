import { PumpStation, DrainageProgress, SafetyPoint } from '@/types';

export const pumpStations: PumpStation[] = [
  {
    id: '1',
    name: '中山路泵站',
    status: 'running',
    capacity: 500,
    currentFlow: 420,
    updateTime: '2024-06-06 09:10:00'
  },
  {
    id: '2',
    name: '解放路泵站',
    status: 'running',
    capacity: 800,
    currentFlow: 680,
    updateTime: '2024-06-06 09:10:00'
  },
  {
    id: '3',
    name: '滨江泵站',
    status: 'running',
    capacity: 1000,
    currentFlow: 950,
    updateTime: '2024-06-06 09:10:00'
  },
  {
    id: '4',
    name: '和平路泵站',
    status: 'standby',
    capacity: 300,
    currentFlow: 0,
    updateTime: '2024-06-06 09:00:00'
  },
  {
    id: '5',
    name: '新华路泵站',
    status: 'maintenance',
    capacity: 400,
    currentFlow: 0,
    updateTime: '2024-06-06 08:00:00'
  }
];

export const drainageProgressList: DrainageProgress[] = [
  {
    id: '1',
    location: '中山路与人民路交叉口',
    startTime: '2024-06-06 08:30:00',
    expectedTime: '2024-06-06 11:30:00',
    progress: 65,
    workers: 12,
    equipment: ['排水泵车2台', '抢险人员12名'],
    status: 'processing'
  },
  {
    id: '2',
    location: '解放路隧道',
    startTime: '2024-06-06 07:45:00',
    expectedTime: '2024-06-06 14:00:00',
    progress: 40,
    workers: 18,
    equipment: ['大型排水泵3台', '抢险人员18名', '照明设备'],
    status: 'processing'
  },
  {
    id: '3',
    location: '和平广场地下通道',
    startTime: '2024-06-06 08:00:00',
    expectedTime: '2024-06-06 10:00:00',
    progress: 100,
    workers: 6,
    equipment: ['排水泵1台', '抢险人员6名'],
    status: 'completed'
  }
];

export const safetyPoints: SafetyPoint[] = [
  {
    id: '1',
    name: '市第一中学应急避护场所',
    type: 'shelter',
    address: '中山路100号',
    capacity: 2000,
    distance: '0.8公里',
    phone: '0123-4567890'
  },
  {
    id: '2',
    name: '市人民医院',
    type: 'hospital',
    address: '解放路200号',
    capacity: 500,
    distance: '1.2公里',
    phone: '120'
  },
  {
    id: '3',
    name: '和平街道应急物资供应点',
    type: 'supply',
    address: '和平路50号',
    capacity: 1000,
    distance: '0.5公里',
    phone: '0123-4567891'
  },
  {
    id: '4',
    name: '滨江小学避护场所',
    type: 'shelter',
    address: '滨江大道300号',
    capacity: 1500,
    distance: '2.1公里',
    phone: '0123-4567892'
  }
];
