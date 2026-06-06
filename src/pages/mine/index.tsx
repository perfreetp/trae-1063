import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { myReports } from '@/data/report';

const MinePage: React.FC = () => {
  const [userInfo] = useState({
    nickname: '市民用户',
    phone: '138****8888',
    isVolunteer: true
  });

  const [favoriteLocations] = useState([
    { id: '1', name: '家', address: '中山路100号阳光花园', type: 'home' },
    { id: '2', name: '公司', address: '科技园区A座10层', type: 'work' },
    { id: '3', name: '学校', address: '第一中学', type: 'other' }
  ]);

  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'records':
        Taro.navigateTo({ url: '/pages/report-detail?id=1' });
        break;
      case 'favorites':
        Taro.showToast({ title: '常用地点管理', icon: 'none' });
        break;
      case 'volunteer':
        Taro.showModal({
          title: '志愿者申请',
          content: '成为防汛志愿者，参与城市内涝救援工作，是否确认申请？',
          success: (res) => {
            if (res.confirm) {
              Taro.showToast({ title: '申请已提交', icon: 'success' });
            }
          }
        });
        break;
      case 'rating':
        showRatingModal();
        break;
      case 'settings':
        Taro.showToast({ title: '设置', icon: 'none' });
        break;
      case 'about':
        Taro.showToast({ title: '关于我们', icon: 'none' });
        break;
      default:
        break;
    }
  };

  const showRatingModal = () => {
    Taro.showModal({
      title: '满意度评价',
      content: '您对我们的服务满意吗？请在下方评分：',
      editable: true,
      placeholderText: '请留下您的宝贵意见...',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '感谢您的评价！', icon: 'success' });
        }
      }
    });
  };

  const stats = [
    { value: myReports.length, label: '上报次数' },
    { value: myReports.filter(r => r.status === 'resolved').length, label: '已处理' },
    { value: 2, label: '获得勋章' }
  ];

  const menuItems1 = [
    { key: 'records', icon: '📋', text: '我的记录', badge: myReports.filter(r => r.status === 'processing').length },
    { key: 'favorites', icon: '⭐', text: '常用地点' },
    { key: 'subscribe', icon: '🔔', text: '消息订阅', path: '/pages/message/index' }
  ];

  const menuItems2 = [
    { key: 'volunteer', icon: '🤝', text: '志愿者申请' },
    { key: 'rating', icon: '⭐', text: '满意度评价' },
    { key: 'feedback', icon: '💬', text: '意见反馈' },
    { key: 'about', icon: 'ℹ️', text: '关于我们' }
  ];

  const typeIconMap: Record<string, string> = {
    home: '🏠',
    work: '🏢',
    other: '📍'
  };

  const typeTextMap: Record<string, string> = {
    home: '家',
    work: '公司',
    other: '其他'
  };

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <View className={styles.userInfo}>
          <View className={styles.avatar}>
            <Text>👤</Text>
          </View>
          <View className={styles.userDetail}>
            <Text className={styles.nickname}>{userInfo.nickname}</Text>
            <Text className={styles.phone}>{userInfo.phone}</Text>
            {userInfo.isVolunteer && (
              <View className={styles.volunteerBadge}>
                <Text className={styles.icon}>🤝</Text>
                <Text>防汛志愿者</Text>
              </View>
            )}
          </View>
        </View>

        <View className={styles.statsRow}>
          {stats.map((stat, index) => (
            <View key={index} className={styles.statItem}>
              <Text className={styles.value}>{stat.value}</Text>
              <Text className={styles.label}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.container}>
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>常用地点</Text>
          {favoriteLocations.map(loc => (
            <View key={loc.id} className={styles.favoriteCard}>
              <View className={styles.icon}>
                <Text>{typeIconMap[loc.type]}</Text>
              </View>
              <View className={styles.info}>
                <Text className={styles.name}>{loc.name}</Text>
                <Text className={styles.address}>{loc.address}</Text>
              </View>
              <View className={styles.typeTag}>
                <Text>{typeTextMap[loc.type]}</Text>
              </View>
            </View>
          ))}
          <View className={styles.addFavorite} onClick={() => Taro.showToast({ title: '添加常用地点', icon: 'none' })}>
            <Text className={styles.icon}>➕</Text>
            <Text>添加常用地点</Text>
          </View>
        </View>

        <View className={styles.section}>
          <View className={styles.menuList}>
            {menuItems1.map(item => (
              <View
                key={item.key}
                className={styles.menuItem}
                onClick={() => {
                  if (item.path) {
                    Taro.switchTab({ url: item.path });
                  } else {
                    handleMenuClick(item.key);
                  }
                }}
              >
                <View className={styles.icon}>
                  <Text>{item.icon}</Text>
                </View>
                <Text className={styles.text}>{item.text}</Text>
                {item.badge && item.badge > 0 && (
                  <View className={styles.badge}>
                    <Text>{item.badge}</Text>
                  </View>
                )}
                <Text className={styles.arrow}>›</Text>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.section}>
          <View className={styles.menuList}>
            {menuItems2.map(item => (
              <View
                key={item.key}
                className={styles.menuItem}
                onClick={() => handleMenuClick(item.key)}
              >
                <View className={styles.icon}>
                  <Text>{item.icon}</Text>
                </View>
                <Text className={styles.text}>{item.text}</Text>
                <Text className={styles.arrow}>›</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default MinePage;
