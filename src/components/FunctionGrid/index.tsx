import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classnames from 'classnames';

interface FunctionItem {
  key: string;
  label: string;
  icon: string;
  color: 'blue' | 'green' | 'orange' | 'red' | 'teal';
  path?: string;
}

const defaultFunctions: FunctionItem[][] = [
  [
    { key: 'map', label: '积水地图', icon: '🗺️', color: 'blue', path: '/pages/map/index' },
    { key: 'report', label: '我要上报', icon: '📝', color: 'orange', path: '/pages/report/index' },
    { key: 'route', label: '避险路线', icon: '🛡️', color: 'green', path: '/pages/safety-route/index' },
    { key: 'drainage', label: '排水进展', icon: '🚰', color: 'teal', path: '/pages/drainage/index' }
  ],
  [
    { key: 'subscribe', label: '消息订阅', icon: '🔔', color: 'blue', path: '/pages/message/index' },
    { key: 'records', label: '我的记录', icon: '📋', color: 'blue', path: '/pages/mine/index' },
    { key: 'volunteer', label: '志愿者', icon: '🤝', color: 'green', path: '/pages/mine/index' },
    { key: 'help', label: '帮助中心', icon: '❓', color: 'orange', path: '/pages/mine/index' }
  ]
];

interface FunctionGridProps {
  functions?: FunctionItem[][];
}

const FunctionGrid: React.FC<FunctionGridProps> = ({ functions = defaultFunctions }) => {
  const handleItemClick = (item: FunctionItem) => {
    if (item.path) {
      Taro.navigateTo({ url: item.path }).catch(() => {
        Taro.switchTab({ url: item.path }).catch((err) => {
          console.error('[FunctionGrid] 导航失败', err);
        });
      });
    }
  };

  return (
    <View className={styles.grid}>
      {functions.map((row, rowIndex) => (
        <View className={styles.row} key={rowIndex}>
          {row.map((item) => (
            <View
              key={item.key}
              className={styles.item}
              onClick={() => handleItemClick(item)}
            >
              <View className={classnames(styles.icon, styles[item.color])}>
                <Text>{item.icon}</Text>
              </View>
              <Text className={styles.label}>{item.label}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default FunctionGrid;
