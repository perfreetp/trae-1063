import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classnames from 'classnames';
import { safetyPoints } from '@/data/drainage';

type GuideType = 'elder' | 'child' | 'general';

const SafetyRoutePage: React.FC = () => {
  const [guideType, setGuideType] = useState<GuideType>('general');

  const guideTabs = [
    { key: 'general', label: '通用指南' },
    { key: 'elder', label: '老人指引' },
    { key: 'child', label: '儿童指引' }
  ];

  const guideContent: Record<GuideType, { title: string; content: string }[]> = {
    general: [
      { title: '暴雨出行注意事项', content: '尽量减少外出，如需外出请避开积水路段，不要在低洼地带停留。行走时注意观察，防止跌入窨井或坑洞。' },
      { title: '室内避险要点', content: '及时关闭门窗，防止雨水进屋。如屋内进水，立即切断电源，防止触电。将贵重物品转移至高处。' },
      { title: '车辆涉水应对', content: '避免车辆涉水行驶，如已涉水，熄火后不要再次启动。人员及时撤离到安全地带，等待救援。' }
    ],
    elder: [
      { title: '提前做好准备', content: '暴雨来临前，备好充足的食物、饮用水和常用药品。将常用物品放在易取用的地方。' },
      { title: '保持通讯畅通', content: '确保手机电量充足，提前告知家人或社区工作人员自己的位置。紧急情况下及时拨打求助电话。' },
      { title: '不要单独外出', content: '暴雨期间尽量不要单独外出，如需转移请在家人或社区工作人员陪同下进行。' }
    ],
    child: [
      { title: '不要独自玩水', content: '暴雨天气不要在户外玩水，不要靠近积水区域，防止发生意外。' },
      { title: '听从家长安排', content: '暴雨期间听从家长和老师的安排，不要独自行动。上下学路上注意安全。' },
      { title: '学会求助方法', content: '记住紧急求助电话110、119、120。遇到危险及时呼救，寻找安全地点等待救援。' }
    ]
  };

  const typeIconMap: Record<string, string> = {
    shelter: '🏠',
    hospital: '🏥',
    supply: '🎒'
  };

  const typeTextMap: Record<string, string> = {
    shelter: '避护场所',
    hospital: '医疗机构',
    supply: '物资供应'
  };

  const handleNavigate = (point: any) => {
    Taro.showToast({ title: `正在导航到${point.name}`, icon: 'none' });
  };

  return (
    <View className={styles.page}>
      <View className={styles.container}>
        <View className={styles.tipCard}>
          <Text className={styles.title}>
            <Text className={styles.icon}>💡</Text>
            安全提示
          </Text>
          <Text className={styles.content}>
            暴雨期间请尽量减少外出。如需出行，请提前规划路线，避开积水路段，注意人身安全。如遇紧急情况，请立即拨打110或119求助。
          </Text>
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.icon}>🗺️</Text>
            推荐安全路线
          </Text>
          <View className={styles.routeCard}>
            <View className={styles.routeHeader}>
              <View>
                <Text className={styles.routeName}>市中心 → 市第一中学避护所</Text>
                <Text className={styles.routeTime}>预计 25 分钟 · 3.2 公里</Text>
              </View>
              <View className={styles.routeTag}>
                <Text>安全路线</Text>
              </View>
            </View>
            <View className={styles.routePoints}>
              <View className={styles.routePoint}>
                <View className={classnames(styles.dot, styles.start)} />
                <Text className={styles.text}>当前位置</Text>
              </View>
              <View className={styles.routeLine} />
              <View className={styles.routePoint}>
                <View className={styles.dot} />
                <Text className={styles.text}>建设路</Text>
              </View>
              <View className={styles.routeLine} />
              <View className={styles.routePoint}>
                <View className={classnames(styles.dot, styles.end)} />
                <Text className={styles.text}>避护所</Text>
              </View>
            </View>
          </View>
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.icon}>📍</Text>
            附近避险场所
          </Text>
          {safetyPoints.map(point => (
            <View key={point.id} className={styles.safetyPointCard}>
              <View className={classnames(styles.icon, styles[point.type])}>
                <Text>{typeIconMap[point.type]}</Text>
              </View>
              <View className={styles.info}>
                <Text className={styles.name}>{point.name}</Text>
                <Text className={styles.address}>{point.address}</Text>
                <View className={styles.meta}>
                  <Text>{typeTextMap[point.type]}</Text>
                  <Text>{point.distance}</Text>
                  <Text>容纳{point.capacity}人</Text>
                </View>
              </View>
              <View className={styles.action} onClick={() => handleNavigate(point)}>
                <Text>导航</Text>
              </View>
            </View>
          ))}
        </View>

        <View className={styles.guideSection}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.icon}>📖</Text>
            安全避险指南
          </Text>
          <View className={styles.guideTabs}>
            {guideTabs.map(tab => (
              <View
                key={tab.key}
                className={classnames(styles.guideTab, guideType === tab.key && styles.active)}
                onClick={() => setGuideType(tab.key as GuideType)}
              >
                <Text>{tab.label}</Text>
              </View>
            ))}
          </View>
          <View className={styles.guideContent}>
            {guideContent[guideType].map((item, index) => (
              <View key={index} className={styles.guideItem}>
                <View className={styles.itemTitle}>
                  <View className={styles.num}>
                    <Text>{index + 1}</Text>
                  </View>
                  <Text>{item.title}</Text>
                </View>
                <View className={styles.itemContent}>
                  <Text>{item.content}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default SafetyRoutePage;
