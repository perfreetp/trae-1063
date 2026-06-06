import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import WarningCard from '@/components/WarningCard';
import FunctionGrid from '@/components/FunctionGrid';
import WaterPointCard from '@/components/WaterPointCard';
import { warningList, rumorList } from '@/data/warning';
import { waterPoints } from '@/data/water-points';

const HomePage: React.FC = () => {
  const [location, setLocation] = useState('正在定位...');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    Taro.getLocation({
      type: 'gcj02',
      success: () => {
        setLocation('当前位置：市中心');
      },
      fail: () => {
        setLocation('定位失败，请手动选择');
      }
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Taro.showToast({ title: '刷新成功', icon: 'success' });
    }, 1000);
  };

  const activeWaterPoints = waterPoints.filter(p => p.status === 'active');
  const topWarning = warningList[0];
  const topRumor = rumorList[0];

  return (
    <ScrollView
      className={styles.page}
      scrollY
      refresherEnabled
      refresherTriggered={refreshing}
      onRefresherRefresh={handleRefresh}
    >
      <View className={styles.container}>
        <View className={styles.header}>
          <View className={styles.locationBar}>
            <Text className={styles.icon}>📍</Text>
            <Text className={styles.text}>{location}</Text>
            <Text className={styles.refresh} onClick={getLocation}>刷新</Text>
          </View>

          <View className={styles.weatherCard}>
            <View className={styles.weatherTop}>
              <View className={styles.weatherInfo}>
                <Text className={styles.temperature}>26°</Text>
                <Text className={styles.weatherDesc}>中雨转大雨</Text>
                <Text className={styles.rainInfo}>今日累计降雨量：85mm</Text>
              </View>
              <Text className={styles.weatherIcon}>🌧️</Text>
            </View>
            <View className={styles.weatherStats}>
              <View className={styles.statItem}>
                <Text className={styles.label}>风力</Text>
                <Text className={styles.value}>3-4级</Text>
              </View>
              <View className={styles.statItem}>
                <Text className={styles.label}>湿度</Text>
                <Text className={styles.value}>92%</Text>
              </View>
              <View className={styles.statItem}>
                <Text className={styles.label}>预警</Text>
                <Text className={styles.value}>红色</Text>
              </View>
            </View>
          </View>
        </View>

        {topWarning && <WarningCard data={topWarning} />}

        <FunctionGrid />

        {topRumor && (
          <View className={styles.rumorBanner} onClick={() => Taro.navigateTo({ url: '/pages/message/index' })}>
            <Text className={styles.icon}>📢</Text>
            <View className={styles.content}>
              <Text className={styles.title}>官方辟谣</Text>
              <Text className={styles.desc}>{topRumor.title}</Text>
            </View>
            <Text className={styles.arrow}>›</Text>
          </View>
        )}

        <View className={styles.sectionHeader}>
          <Text className={styles.title}>周边积水点</Text>
          <Text className={styles.more} onClick={() => Taro.switchTab({ url: '/pages/map/index' })}>查看地图 ›</Text>
        </View>

        <View className={styles.nearbyList}>
          {activeWaterPoints.length > 0 ? (
            activeWaterPoints.slice(0, 3).map(point => (
              <WaterPointCard
                key={point.id}
                data={point}
                onClick={() => Taro.switchTab({ url: '/pages/map/index' })}
              />
            ))
          ) : (
            <View className={styles.emptyState}>
              <Text>暂无积水点信息</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;
