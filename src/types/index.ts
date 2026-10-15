/**
 * @file src/types/index.ts
 * @description Core TypeScript domain types for RythuDrishti AI
 * B.Tech CSE Final Year Project - Smart Farming Copilot for Telangana
 */

export type Language = 'en' | 'te';

export type CropType = 'cotton' | 'paddy' | 'maize';

export type DashboardSection = 
  | 'assistant' 
  | 'crop_photo' 
  | 'weather' 
  | 'farm' 
  | 'diary' 
  | 'expenses' 
  | 'settings';

export interface DistrictInfo {
  id: string;
  nameEn: string;
  nameTe: string;
  lat: number;
  lon: number;
}

export interface FarmProfile {
  farmerName: string;
  phone: string;
  district: string;
  village: string;
  totalAcres: number;
  activeCrop: CropType;
  sowingDate: string; // ISO date
  soilType: 'black_cotton' | 'red_loamy' | 'alluvial' | 'sandy_clay';
  irrigationType: 'borewell' | 'canal' | 'drip' | 'rainfed';
}

export interface DiaryEntry {
  id: string;
  date: string;
  stage: string;
  activity: string;
  notes?: string;
  cost?: number;
  photoUrl?: string;
  createdAt: number;
}

export interface ExpenseItem {
  id: string;
  date: string;
  category: 'seed' | 'fertilizer' | 'labour' | 'irrigation' | 'transport' | 'other';
  description: string;
  amount: number;
  recordedBy: string;
}

export interface RiskAlert {
  id: string;
  severity: 'low' | 'medium' | 'high';
  titleEn: string;
  titleTe: string;
  triggerCondition: string;
  dataSource: string;
  precautionEn: string;
  precautionTe: string;
  cropApplicable: CropType[];
  timestamp: string;
}
