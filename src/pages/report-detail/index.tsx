import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classnames from 'classnames';
import { myReports } from '@/data/report';

const statusTextMap: Record<string, string> = {
  pending: '待处理',
  processing: '处理中',
  resolved: '已完成',
  merged: '已合并'
};

const levelTextMap: Record<string, string> = {
  low: '一般',
  medium: '较重',
  high: '严重'
};

const ReportDetailPage: React.FC = () => {
  const report = myReports[0];

  const handleRating = () => {
    Taro.showModal({
      title: '服务评价',
      content: '请对本次处置服务进行评价：',
      editable: true,
      placeholderText: '请输入您的评价...',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '感谢您的评价！', icon: 'success' });
        }
      }
    });
  };

  const handleCancel = () => {
    Taro.showModal({
      title: '取消上报',
      content: '确定要取消此上报吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '已取消', icon: 'success' });
        }
      }
    });
  };

  return (
    <View className={styles.page}>
      <View className={styles.container}>
        <View className={styles.basicInfo}>
          <View className={styles.infoHeader}>
            <View className={styles.infoTitle}>
              <Text className={styles.type}>{report.type}</Text>
              <Text className={styles.time}>上报时间：{report.createTime}</Text>
            </View>
            <View className={classnames(styles.statusBadge, styles[report.status])}>
              <Text>{statusTextMap[report.status]}</Text>
            </View>
          </View>

          {report.mergedCount && report.mergedCount > 0 && (
            <View className={styles.mergedInfo}>
              <Text className={styles.title}>
                <Text className={styles.icon}>🔗</Text>
                线索合并
              </Text>
              <Text className={styles.content}>
                已有 {report.mergedCount} 位市民上报了相同位置的类似险情，已合并处理
              </Text>
            </View>
          )}

          <View className={styles.infoRow}>
            <Text className={styles.label}>危险等级</Text>
            <View className={styles.value}>
              <View className={classnames(styles.levelTag, styles[report.level])}>
                <Text>{levelTextMap[report.level]}</Text>
              </View>
            </View>
          </View>

          <View className={styles.infoRow}>
            <Text className={styles.label}>险情位置</Text>
            <Text className={styles.value}>{report.location}</Text>
          </View>

          <View className={styles.infoRow}>
            <Text className={styles.label}>情况描述</Text>
            <Text className={styles.value}>{report.description}</Text>
          </View>

          {report.images.length > 0 && (
            <View className={styles.infoRow}>
              <Text className={styles.label}>现场图片</Text>
              <View className={styles.value}>
                <View className={styles.imageList}>
                  {report.images.map((img, index) => (
                    <Image key={index} className={styles.imageItem} src={img} mode="aspectFill" />
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.icon}>📊</Text>
            处置进度
          </Text>
          <View className={styles.timeline}>
            {report.progress.map((item, index) => {
              const isLast = index === report.progress.length - 1;
              const isFirst = index === 0;
              return (
                <View
                  key={index}
                  className={classnames(
                    styles.timelineItem,
                    isLast && styles.current,
                    !isLast && !isFirst && styles.completed
                  )}
                >
                  <View className={styles.timelineHeader}>
                    <Text className={styles.timelineStatus}>{item.status}</Text>
                    <Text className={styles.timelineTime}>{item.time}</Text>
                  </View>
                  <Text className={styles.timelineDesc}>{item.description}</Text>
                  {item.operator && (
                    <Text className={styles.timelineOperator}>处理人：{item.operator}</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <View className={styles.bottomBar}>
        {report.status !== 'resolved' ? (
          <>
            <View className={styles.secondaryBtn} onClick={handleCancel}>
              <Text>取消上报</Text>
            </View>
            <View className={styles.primaryBtn} onClick={() => Taro.showToast({ title: '正在联系工作人员', icon: 'none' })}>
              <Text>联系工作人员</Text>
            </View>
          </>
        ) : (
          <>
            <View className={styles.secondaryBtn} onClick={() => Taro.showToast({ title: '功能开发中', icon: 'none' })}>
              <Text>查看详情</Text>
            </View>
            <View className={styles.primaryBtn} onClick={handleRating}>
              <Text>满意度评价</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ReportDetailPage;
