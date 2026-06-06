import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classnames from 'classnames';
import { pumpStations, drainageProgressList } from '@/data/drainage';

const statusTextMap: Record<string, string> = {
  running: '运行中',
  standby: '待机',
  maintenance: '维护中'
};

const DrainagePage: React.FC = () => {
  const runningPumps = pumpStations.filter(p => p.status === 'running').length;
  const totalCapacity = pumpStations.reduce((sum, p) => sum + p.currentFlow, 0);

  const stats = [
    { value: pumpStations.length, label: '泵站总数', className: '' },
    { value: runningPumps, label: '运行中', className: 'success' },
    { value: `${totalCapacity}m³/h`, label: '总排量', className: 'warning' }
  ];

  return (
    <View className={styles.page}>
      <View className={styles.container}>
        <View className={styles.statsRow}>
          {stats.map((stat, index) => (
            <View key={index} className={classnames(styles.statCard, styles[stat.className])}>
              <Text className={styles.value}>{stat.value}</Text>
              <Text className={styles.label}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.icon}>🚰</Text>
            泵站运行状态
            <Text className={styles.more}>查看全部 ›</Text>
          </Text>
          {pumpStations.map(pump => (
            <View key={pump.id} className={styles.pumpCard}>
              <View className={classnames(styles.icon, styles[pump.status])}>
                <Text>⚙️</Text>
              </View>
              <View className={styles.info}>
                <Text className={styles.name}>{pump.name}</Text>
                <View className={styles.meta}>
                  <Text>流量 {pump.currentFlow}/{pump.capacity} m³/h</Text>
                  <Text>更新于 {pump.updateTime.slice(11, 16)}</Text>
                </View>
              </View>
              <View className={classnames(styles.status, styles[pump.status])}>
                <Text>{statusTextMap[pump.status]}</Text>
              </View>
            </View>
          ))}
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.icon}>🔧</Text>
            排水处置进展
          </Text>
          {drainageProgressList.map(item => (
            <View key={item.id} className={styles.progressCard}>
              <View className={styles.header}>
                <Text className={styles.location}>{item.location}</Text>
                <View className={classnames(styles.statusTag, styles[item.status])}>
                  <Text>{item.status === 'processing' ? '处置中' : '已完成'}</Text>
                </View>
              </View>
              <View className={styles.progressBar}>
                <View className={styles.progressFill} style={{ width: `${item.progress}%` }} />
              </View>
              <View className={styles.infoRow}>
                <Text>进度 {item.progress}%</Text>
                <Text>工作人员 {item.workers} 人</Text>
              </View>
              <View className={styles.equipment}>
                <Text>设备：{item.equipment.join('、')}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default DrainagePage;
