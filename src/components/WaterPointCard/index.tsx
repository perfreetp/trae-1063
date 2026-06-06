import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import classnames from 'classnames';
import { WaterPoint } from '@/types';
import StatusTag from '@/components/StatusTag';

interface WaterPointCardProps {
  data: WaterPoint;
  onClick?: () => void;
}

const levelTextMap = {
  low: '轻度积水',
  medium: '中度积水',
  high: '严重积水'
};

const WaterPointCard: React.FC<WaterPointCardProps> = ({ data, onClick }) => {
  return (
    <View className={styles.card} onClick={onClick}>
      <View className={styles.header}>
        <Text className={styles.title}>{data.name}</Text>
        <View className={styles.depthInfo}>
          <Text className={classnames(styles.depthValue, styles[data.level])}>
            {data.depth}
          </Text>
          <Text className={styles.depthUnit}>厘米</Text>
        </View>
      </View>
      <View className={styles.address}>
        <Text className={styles.icon}>📍</Text>
        <Text>{data.address}</Text>
      </View>
      <View className={styles.footer}>
        <View className={styles.tags}>
          <StatusTag text={levelTextMap[data.level]} type={`water${data.level.charAt(0).toUpperCase() + data.level.slice(1)}` as any} />
          {data.isRoadClosed && <StatusTag text="道路封闭" type="red" />}
          {data.status === 'cleared' && <StatusTag text="已排清" type="green" />}
        </View>
        <Text className={styles.time}>{data.updateTime}</Text>
      </View>
    </View>
  );
};

export default WaterPointCard;
