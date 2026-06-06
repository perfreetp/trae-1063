import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classnames from 'classnames';
import { messageList, subscribeOptions } from '@/data/message';
import { MessageItem } from '@/types';

type TabType = 'all' | 'warning' | 'system' | 'subscribe';

const typeIconMap: Record<string, string> = {
  warning: '⚠️',
  system: '📢',
  rumor: '🛡️',
  progress: '✅'
};

const MessagePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [subscribes, setSubscribes] = useState(subscribeOptions);

  const tabs = [
    { key: 'all', label: '全部' },
    { key: 'warning', label: '预警' },
    { key: 'system', label: '通知' },
    { key: 'subscribe', label: '订阅' }
  ];

  const getFilteredMessages = () => {
    if (activeTab === 'all') return messageList;
    if (activeTab === 'warning') return messageList.filter(m => m.type === 'warning' || m.type === 'rumor');
    if (activeTab === 'system') return messageList.filter(m => m.type === 'system' || m.type === 'progress');
    return [];
  };

  const unreadCount = messageList.filter(m => !m.read).length;
  const warningUnread = messageList.filter(m => !m.read && (m.type === 'warning' || m.type === 'rumor')).length;
  const systemUnread = messageList.filter(m => !m.read && (m.type === 'system' || m.type === 'progress')).length;

  const getBadgeCount = (tab: string) => {
    if (tab === 'all') return unreadCount;
    if (tab === 'warning') return warningUnread;
    if (tab === 'system') return systemUnread;
    return 0;
  };

  const toggleSubscribe = (id: string) => {
    setSubscribes(subscribes.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const handleMessageClick = (msg: MessageItem) => {
    Taro.showModal({
      title: msg.title,
      content: msg.content,
      showCancel: false,
      confirmText: '知道了'
    });
  };

  const filteredMessages = getFilteredMessages();

  return (
    <View className={styles.page}>
      <View className={styles.tabs}>
        {tabs.map(tab => (
        <View
          key={tab.key}
          className={classnames(styles.tabItem, activeTab === tab.key && styles.active)}
          onClick={() => setActiveTab(tab.key as TabType)}
        >
          <Text>{tab.label}</Text>
          {getBadgeCount(tab.key) > 0 && (
            <View className={styles.badge}>
              <Text>{getBadgeCount(tab.key)}</Text>
            </View>
          )}
        </View>
      ))}
      </View>

      <ScrollView scrollY>
        <View className={styles.container}>
          {activeTab === 'subscribe' ? (
            <View className={styles.subscribeSection}>
              <Text className={styles.sectionTitle}>消息订阅设置</Text>
              {subscribes.map(item => (
                <View key={item.id} className={styles.subscribeItem}>
                  <View className={styles.subscribeInfo}>
                    <Text className={styles.subscribeName}>{item.name}</Text>
                    <Text className={styles.subscribeDesc}>{item.desc}</Text>
                  </View>
                  <View
                    className={classnames(styles.switch, item.enabled && styles.active)}
                    onClick={() => toggleSubscribe(item.id)}
                  />
                </View>
              ))}
            </View>
          ) : (
            <>
              {filteredMessages.length > 0 ? (
                filteredMessages.map(msg => (
                  <View
                    key={msg.id}
                    className={classnames(styles.messageCard, !msg.read && styles.unread)}
                    onClick={() => handleMessageClick(msg)}
                  >
                    <View className={styles.messageHeader}>
                      <View className={classnames(styles.messageIcon, styles[msg.type])}>
                        <Text>{typeIconMap[msg.type]}</Text>
                      </View>
                      <View className={styles.messageInfo}>
                        <Text className={styles.messageTitle}>{msg.title}</Text>
                        <Text className={styles.messageTime}>{msg.time}</Text>
                      </View>
                      {!msg.read && <View className={styles.unreadDot} />}
                    </View>
                    <Text className={styles.messageContent}>{msg.content}</Text>
                  </View>
                ))
              ) : (
                <View className={styles.emptyState}>
                  <Text className={styles.icon}>📭</Text>
                  <Text className={styles.text}>暂无消息</Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MessagePage;
