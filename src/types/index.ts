export interface WarningInfo {
  id: string;
  title: string;
  level: 'blue' | 'yellow' | 'orange' | 'red';
  content: string;
  publishTime: string;
  source: string;
}

export interface WaterPoint {
  id: string;
  name: string;
  address: string;
  depth: number;
  level: 'low' | 'medium' | 'high';
  lat: number;
  lng: number;
  updateTime: string;
  status: 'active' | 'cleared';
  isRoadClosed?: boolean;
}

export interface ReportItem {
  id: string;
  type: string;
  level: 'low' | 'medium' | 'high';
  description: string;
  images: string[];
  location: string;
  lat: number;
  lng: number;
  status: 'pending' | 'processing' | 'resolved' | 'merged';
  createTime: string;
  progress: ReportProgress[];
  mergedCount?: number;
}

export interface ReportProgress {
  time: string;
  status: string;
  description: string;
  operator?: string;
}

export interface MessageItem {
  id: string;
  type: 'warning' | 'system' | 'rumor' | 'progress';
  title: string;
  content: string;
  time: string;
  read: boolean;
}

export interface PumpStation {
  id: string;
  name: string;
  status: 'running' | 'standby' | 'maintenance';
  capacity: number;
  currentFlow: number;
  updateTime: string;
}

export interface DrainageProgress {
  id: string;
  location: string;
  startTime: string;
  expectedTime: string;
  progress: number;
  workers: number;
  equipment: string[];
  status: 'processing' | 'completed';
}

export interface SafetyPoint {
  id: string;
  name: string;
  type: 'shelter' | 'hospital' | 'supply';
  address: string;
  capacity: number;
  distance: string;
  phone: string;
}

export interface FavoriteLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: 'home' | 'work' | 'other';
}

export interface UserInfo {
  id: string;
  nickname: string;
  avatar: string;
  phone: string;
  isVolunteer: boolean;
  reportCount: number;
  favoriteLocations: FavoriteLocation[];
}
