import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classnames from 'classnames';
import WaterPointCard from '@/components/WaterPointCard';
import { waterPoints, closedRoads } from '@/data/water-points';

type FilterType = 'all' | 'active' | 'cleared' | 'closed';

const MapPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  const filters = [
    { key: 'all', label: '全部' },
    { key: 'active', label: '积水中' },
    { key: 'cleared', label: '已排清' },
    { key: 'closed', label: '道路封闭' }
  ];

  const getFilteredPoints = () => {
    switch (filter) {
      case 'active':
        return waterPoints.filter(p => p.status === 'active');
      case 'cleared':
        return waterPoints.filter(p => p.status === 'cleared');
      case 'closed':
        return waterPoints.filter(p => p.isRoadClosed);
      default:
        return waterPoints;
    }
  };

  const filteredPoints = getFilteredPoints();

  const markerPositions = [
    { top: '25%', left: '30%' },
    { top: '35%', left: '60%' },
    { top: '50%', left: '25%' },
    { top: '60%', left: '70%' },
    { top: '45%', left: '50%' }
  ];

  const handleLocate = () => {
    Taro.showToast({ title: '定位中...', icon: 'loading' });
    setTimeout(() => {
      Taro.showToast({ title: '定位成功', icon: 'success' });
    }, 1000);
  };

  const handleZoomIn = () => {
    Taro.showToast({ title: '放大地图', icon: 'none' });
  };

  const handleZoomOut = () => {
    Taro.showToast({ title: '缩小地图', icon: 'none' });
  };

  return (
    <View className={styles.page}>
      <View className={styles.filterBar}>
        {filters.map(f => (
          <View
            key={f.key}
            className={classnames(styles.filterItem, filter === f.key && styles.active)}
            onClick={() => setFilter(f.key as FilterType)}
          >
            <Text>{f.label}</Text>
          </View>
        ))}
      </View>

      <View className={styles.mapContainer}>
        <View className={styles.mapPlaceholder}>
          <Text className={styles.icon}>🗺️</Text>
          <Text className={styles.text}>地图加载中...</Text>
        </View>

        <View className={styles.mapMarkers}>
          {filteredPoints.slice(0, 5).map((point, index) => {
            const pos = markerPositions[index % markerPositions.length];
            return (
              <View
                key={point.id}
                className={styles.marker}
                style={{ top: pos.top, left: pos.left }}
              >
                <View className={classnames(styles.pin, styles[point.level])}>
                  <Text>{point.depth}</Text>
                </View>
                <View className={styles.label}>
                  <Text>{point.name.slice(0, 6)}...</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View className={styles.currentLocation} />

        <View className={styles.legend}>
          <Text className={styles.legendTitle}>图例</Text>
          <View className={styles.legendItem}>
            <View className={classnames(styles.dot, styles.low)} />
            <Text className={styles.text}>轻度积水 {'<'}20cm</Text>
          </View>
          <View className={styles.legendItem}>
            <View className={classnames(styles.dot, styles.medium)} />
            <Text className={styles.text}>中度积水 20-40cm</Text>
          </View>
          <View className={styles.legendItem}>
            <View className={classnames(styles.dot, styles.high)} />
            <Text className={styles.text}>严重积水 {'>'}40cm</Text>
          </View>
          <View className={styles.legendItem}>
            <View className={classnames(styles.dot, styles.closed)} />
            <Text className={styles.text}>道路封闭</Text>
          </View>
        </View>

        <View className={styles.mapControls}>
          <View className={styles.controlBtn} onClick={handleLocate}>
            <Text>📍</Text>
          </View>
          <View className={styles.controlBtn} onClick={handleZoomIn}>
            <Text>➕</Text>
          </View>
          <View className={styles.controlBtn} onClick={handleZoomOut}>
            <Text>➖</Text>
          </View>
        </View>
      </View>

      <View className={styles.pointList}>
        <View className={styles.listHeader}>
          <Text className={styles.title}>积水点列表</Text>
          <Text className={styles.count}>共 {filteredPoints.length} 个</Text>
        </View>
        <ScrollView className={styles.listContent} scrollY>
          {filteredPoints.map(point => (
            <WaterPointCard
              key={point.id}
              data={point}
              onClick={() => Taro.showToast({ title: point.name, icon: 'none' })}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MapPage;
