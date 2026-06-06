import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import classnames from 'classnames';

interface StatusTagProps {
  text: string;
  type?: 'blue' | 'yellow' | 'orange' | 'red' | 'green' | 'gray' | 'waterLow' | 'waterMedium' | 'waterHigh';
}

const StatusTag: React.FC<StatusTagProps> = ({ text, type = 'blue' }) => {
  return (
    <View className={classnames(styles.tag, styles[type])}>
      <Text>{text}</Text>
    </View>
  );
};

export default StatusTag;
