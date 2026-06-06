import { ReportItem } from '@/types';

export const reportTypes = [
  { value: 'water_logging', label: '道路积水' },
  { value: 'manhole_cover', label: '井盖缺失/移位' },
  { value: 'tree_fall', label: '树木倒伏' },
  { value: 'building_damage', label: '房屋受损' },
  { value: 'power_outage', label: '电力故障' },
  { value: 'traffic_accident', label: '交通事故' },
  { value: 'other', label: '其他险情' }
];

export const dangerLevels = [
  { value: 'low', label: '一般', color: '#66BB6A', desc: '轻度积水/轻微险情' },
  { value: 'medium', label: '较重', color: '#FFA726', desc: '中度积水/需关注' },
  { value: 'high', label: '严重', color: '#EF5350', desc: '重度积水/紧急危险' }
];

export const myReports: ReportItem[] = [
  {
    id: '1',
    type: '道路积水',
    level: 'high',
    description: '中山路与人民路交叉口积水严重，已经没过膝盖，车辆无法通行。',
    images: [],
    location: '中山路与人民路交叉口',
    lat: 31.2304,
    lng: 121.4737,
    status: 'processing',
    createTime: '2024-06-06 08:15:00',
    progress: [
      { time: '2024-06-06 08:15:00', status: '已提交', description: '您的上报已成功提交，等待审核' },
      { time: '2024-06-06 08:20:00', status: '已受理', description: '案件已受理，已派发给排水部门处理', operator: '市防汛指挥中心' },
      { time: '2024-06-06 08:45:00', status: '处置中', description: '排水工作人员已到达现场开展排水作业', operator: '市排水公司' }
    ],
    mergedCount: 5
  },
  {
    id: '2',
    type: '树木倒伏',
    level: 'medium',
    description: '解放公园门口有大树倒伏，影响行人通行。',
    images: [],
    location: '解放公园正门',
    lat: 31.2404,
    lng: 121.4707,
    status: 'resolved',
    createTime: '2024-06-06 07:30:00',
    progress: [
      { time: '2024-06-06 07:30:00', status: '已提交', description: '您的上报已成功提交' },
      { time: '2024-06-06 07:40:00', status: '已受理', description: '已派发给园林部门处理' },
      { time: '2024-06-06 08:30:00', status: '处置中', description: '园林工作人员正在清理' },
      { time: '2024-06-06 09:00:00', status: '已完成', description: '倒伏树木已清理完毕，道路恢复通行' }
    ]
  },
  {
    id: '3',
    type: '井盖缺失',
    level: 'low',
    description: '和平路小学门口井盖缺失，存在安全隐患。',
    images: [],
    location: '和平路小学门口',
    lat: 31.2284,
    lng: 121.4657,
    status: 'merged',
    createTime: '2024-06-06 07:00:00',
    progress: [
      { time: '2024-06-06 07:00:00', status: '已提交', description: '您的上报已成功提交' },
      { time: '2024-06-06 07:05:00', status: '线索合并', description: '该线索与其他市民上报的同位置信息合并处理' }
    ],
    mergedCount: 3
  }
];
