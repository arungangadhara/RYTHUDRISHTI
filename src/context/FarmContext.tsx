/**
 * @file src/context/FarmContext.tsx
 * Global Farm State & Navigation Management for RythuDrishti AI
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CropType, DashboardSection, DistrictInfo, FarmProfile } from '../types/index.ts';

export const TELANGANA_DISTRICTS: DistrictInfo[] = [
  { id: 'warangal', nameEn: 'Warangal', nameTe: 'వరంగల్', lat: 17.9689, lon: 79.5941 },
  { id: 'karimnagar', nameEn: 'Karimnagar', nameTe: 'కరీంనగర్', lat: 18.4386, lon: 79.1288 },
  { id: 'nalgonda', nameEn: 'Nalgonda', nameTe: 'నల్గొండ', lat: 17.0575, lon: 79.2684 },
  { id: 'khammam', nameEn: 'Khammam', nameTe: 'ఖమ్మం', lat: 17.2473, lon: 80.1514 },
  { id: 'mahabubnagar', nameEn: 'Mahabubnagar', nameTe: 'మహబూబ్ నగర్', lat: 16.7488, lon: 77.9856 },
  { id: 'nizamabad', nameEn: 'Nizamabad', nameTe: 'నిజామాబాద్', lat: 18.6725, lon: 78.0941 },
  { id: 'adilabad', nameEn: 'Adilabad', nameTe: 'ఆదిలాబాద్', lat: 19.6641, lon: 78.5320 },
  { id: 'siddipet', nameEn: 'Siddipet', nameTe: 'సిద్దిపేట', lat: 18.1018, lon: 78.8520 },
  { id: 'medak', nameEn: 'Medak', nameTe: 'మెదక్', lat: 18.0478, lon: 78.2619 },
  { id: 'suryapet', nameEn: 'Suryapet', nameTe: 'సూర్యాపేట', lat: 17.1439, lon: 79.6239 },
  { id: 'rangareddy', nameEn: 'Rangareddy', nameTe: 'రంగారెడ్డి', lat: 17.4325, lon: 78.4071 },
];

interface FarmContextType {
  activeCrop: CropType;
  setActiveCrop: (crop: CropType) => void;
  activeDistrict: DistrictInfo;
  setActiveDistrict: (districtId: string) => void;
  activeSection: DashboardSection;
  setActiveSection: (section: DashboardSection) => void;
  farmProfile: FarmProfile;
  updateFarmProfile: (profile: Partial<FarmProfile>) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeCrop, setActiveCropState] = useState<CropType>(() => {
    try {
      const saved = localStorage.getItem('rythu_active_crop') as CropType;
      if (saved === 'cotton' || saved === 'paddy' || saved === 'maize') return saved;
    } catch {
      // ignore
    }
    return 'cotton'; // Primary crop in Telangana
  });

  const [activeDistrictId, setActiveDistrictId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('rythu_active_district');
      if (saved && TELANGANA_DISTRICTS.some(d => d.id === saved)) return saved;
    } catch {
      // ignore
    }
    return 'warangal';
  });

  const [activeSection, setActiveSectionState] = useState<DashboardSection>(() => {
    // Read from window location hash if present
    const hash = window.location.hash.replace('#', '') as DashboardSection;
    const validSections: DashboardSection[] = [
      'assistant', 'crop_photo', 'weather', 'farm', 'diary', 'expenses', 'settings'
    ];
    if (validSections.includes(hash)) return hash;
    return 'assistant';
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [farmProfile, setFarmProfile] = useState<FarmProfile>({
    farmerName: 'రామయ్య (Ramayya)',
    phone: '9848012345',
    district: 'Warangal',
    village: 'Georai (గీసుకొండ)',
    totalAcres: 4.5,
    activeCrop: 'cotton',
    sowingDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 45 days ago (vegetative stage)
    soilType: 'black_cotton',
    irrigationType: 'borewell',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const setActiveCrop = (crop: CropType) => {
    setActiveCropState(crop);
    try {
      localStorage.setItem('rythu_active_crop', crop);
    } catch {
      // ignore
    }
    showToast(`Active crop switched to ${crop.toUpperCase()}`);
  };

  const setActiveDistrict = (districtId: string) => {
    setActiveDistrictId(districtId);
    try {
      localStorage.setItem('rythu_active_district', districtId);
    } catch {
      // ignore
    }
  };

  const setActiveSection = (section: DashboardSection) => {
    setActiveSectionState(section);
    window.location.hash = section;
    setIsMobileMenuOpen(false);
  };

  const updateFarmProfile = (updated: Partial<FarmProfile>) => {
    setFarmProfile(prev => ({ ...prev, ...updated }));
  };

  // Keep hash in sync with browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as DashboardSection;
      const validSections: DashboardSection[] = [
        'assistant', 'crop_photo', 'weather', 'farm', 'diary', 'expenses', 'settings'
      ];
      if (validSections.includes(hash)) {
        setActiveSectionState(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const activeDistrict = TELANGANA_DISTRICTS.find(d => d.id === activeDistrictId) || TELANGANA_DISTRICTS[0];

  return (
    <FarmContext.Provider
      value={{
        activeCrop,
        setActiveCrop,
        activeDistrict,
        setActiveDistrict,
        activeSection,
        setActiveSection,
        farmProfile,
        updateFarmProfile,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = (): FarmContextType => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
