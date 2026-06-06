import React, { useState } from 'react';
import { View, Text, Textarea, Input, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classnames from 'classnames';
import { reportTypes, dangerLevels } from '@/data/report';

const typeIcons: Record<string, string> = {
  water_logging: '🌊',
  manhole_cover: '⚠️',
  tree_fall: '🌳',
  building_damage: '🏠',
  power_outage: '⚡',
  traffic_accident: '🚗',
  other: '📋'
};

const ReportPage: React.FC = () => {
  const [type, setType] = useState('');
  const [level, setLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [contact, setContact] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const getCurrentLocation = () => {
    Taro.showLoading({ title: '定位中...' });
    Taro.getLocation({
      type: 'gcj02',
      success: () => {
        Taro.hideLoading();
        setLocation('中山路与人民路交叉口');
        Taro.showToast({ title: '定位成功', icon: 'success' });
      },
      fail: () => {
        Taro.hideLoading();
        Taro.showToast({ title: '定位失败，请手动选择', icon: 'none' });
      }
    });
  };

  const chooseImage = () => {
    Taro.chooseImage({
      count: 9 - images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setImages([...images, ...res.tempFilePaths]);
      }
    });
  };

  const deleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const canSubmit = type && location && description;

  const handleSubmit = () => {
    if (!canSubmit) {
      Taro.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      Taro.showModal({
        title: '提交成功',
        content: '感谢您的上报！我们会尽快处理，您可在"我的记录"中查看处理进度。',
        showCancel: false,
        confirmText: '知道了',
        success: () => {
          setType('');
          setLevel('medium');
          setLocation('');
          setDescription('');
          setImages([]);
        }
      });
    }, 1500);
  };

  const handleSaveDraft = () => {
    Taro.showToast({ title: '已保存到草稿箱', icon: 'success' });
  };

  return (
    <View className={styles.page}>
      <View className={styles.container}>
        <View className={styles.tipCard}>
          <Text className={styles.title}>
            <Text className={styles.icon}>💡</Text>
            上报须知
          </Text>
          <Text className={styles.content}>
            请准确描述险情位置和情况，上传清晰的现场图片，有助于工作人员快速处置。虚假上报需承担相应法律责任。
          </Text>
        </View>

        <View className={styles.formCard}>
          <View className={styles.formSection}>
            <Text className={styles.sectionTitle}>
              <Text className={styles.required}>*</Text>
              险情类型
            </Text>
            <View className={styles.typeGrid}>
              {reportTypes.map(item => (
                <View
                  key={item.value}
                  className={classnames(styles.typeItem, type === item.value && styles.active)}
                  onClick={() => setType(item.value)}
                >
                  <Text className={styles.icon}>{typeIcons[item.value]}</Text>
                  <Text className={classnames(styles.label, type === item.value && styles.active)}>
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className={styles.formSection}>
            <Text className={styles.sectionTitle}>
              <Text className={styles.required}>*</Text>
              危险等级
            </Text>
            <View className={styles.levelSelector}>
              {dangerLevels.map(item => (
                <View
                  key={item.value}
                  className={classnames(styles.levelItem, styles[item.value], level === item.value && styles.active)}
                  onClick={() => setLevel(item.value as any)}
                >
                  <Text className={styles.label}>{item.label}</Text>
                  <Text className={styles.desc}>{item.desc}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className={styles.formSection}>
            <Text className={styles.sectionTitle}>
              <Text className={styles.required}>*</Text>
              险情位置
            </Text>
            <View className={styles.locationInput} onClick={getCurrentLocation}>
              <Text className={styles.icon}>📍</Text>
              <Text className={classnames(styles.text, !location && styles.placeholder)}>
                {location || '点击获取当前位置'}
              </Text>
              <Text className={styles.action}>选择</Text>
            </View>
          </View>

          <View className={styles.formSection}>
            <Text className={styles.sectionTitle}>
              <Text className={styles.required}>*</Text>
              情况描述
            </Text>
            <View className={styles.textareaWrapper}>
              <Textarea
                className={styles.textarea}
                placeholder="请详细描述险情情况，如积水深度、影响范围等..."
                value={description}
                onInput={(e) => setDescription(e.detail.value)}
                maxlength={500}
              />
              <Text className={styles.charCount}>{description.length}/500</Text>
            </View>
          </View>

          <View className={styles.formSection}>
            <Text className={styles.sectionTitle}>现场图片/视频</Text>
            <View className={styles.imageUploader}>
              {images.map((img, index) => (
                <View key={index} className={styles.imageItem}>
                  <Image className={styles.image} src={img} mode="aspectFill" />
                  <View className={styles.delete} onClick={() => deleteImage(index)}>
                    <Text>×</Text>
                  </View>
                </View>
              ))}
              {images.length < 9 && (
                <View className={styles.uploadBtn} onClick={chooseImage}>
                  <Text className={styles.icon}>📷</Text>
                  <Text className={styles.text}>上传图片</Text>
                </View>
              )}
            </View>
          </View>

          <View className={styles.formSection}>
            <Text className={styles.sectionTitle}>联系方式（选填）</Text>
            <View className={styles.contactInput}>
              <Text className={styles.label}>手机号</Text>
              <Input
                className={styles.input}
                type="number"
                placeholder="方便工作人员联系您"
                value={contact}
                onInput={(e) => setContact(e.detail.value)}
              />
            </View>
          </View>
        </View>
      </View>

      <View className={styles.bottomBar}>
        <View className={styles.draftBtn} onClick={handleSaveDraft}>
          <Text>存草稿</Text>
        </View>
        <View
          className={classnames(styles.submitBtn, !canSubmit && styles.disabled)}
          onClick={handleSubmit}
        >
          <Text>{submitting ? '提交中...' : '提交上报'}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReportPage;
