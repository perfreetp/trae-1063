import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import classnames from 'classnames';
import { WarningInfo } from '@/types';

interface WarningCardProps {
  data: WarningInfo;
  onClick?: () => void;
}

const levelTextMap = {
  blue: '蓝色预警',
  yellow: '黄色预警',
  orange: '橙色预警',
  red: '红色预警'
};

const WarningCard: React.FC<WarningCardProps> = ({ data, onClick }) => {
  return (
    <View className={classnames(styles.card, styles[data.level])} onClick={onClick}>
      <View className={styles.header}>
        <Text className={styles.title}>{data.title}</Text>
        <View className={classnames(styles.levelTag, styles[data.level])}>
          <Text>{levelTextMap[data.level]}</Text>
        </View>
      </View>
      <Text className={styles.content}>{data.content}</Text>
      <View className={styles.footer}>
        <Text className={styles.time}>{data.publishTime}</Text>
        <Text className={styles.source}>{data.source}</Text>
      </View>
    </View>
  );
};

export default WarningCard;
