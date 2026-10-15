/**
 * @file src/components/sections/CropPhotoSection.tsx
 * Crop Photo Upload & Vision Analysis Shell
 * Prepares validation (max 5MB, JPEG/PNG) and previews for Stage 3
 */

import React, { useState } from 'react';
import { useI18n } from '../../i18n/index.tsx';
import { useFarm } from '../../context/FarmContext.tsx';
import { 
  Camera, 
  Upload, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Image as ImageIcon,
  Sparkles,
  Info,
  Trash2
} from 'lucide-react';

export const CropPhotoSection: React.FC = () => {
  const { language, t } = useI18n();
  const { activeCrop, showToast } = useFarm();
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSizeMb, setFileSizeMb] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    setValidationError(null);

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setValidationError(
        language === 'te'
          ? 'దయచేసి JPEG లేదా PNG ఫోటోలను మాత్రమే ఎంచుకోండి.'
          : 'Invalid file format. Please upload JPEG, PNG, or WEBP only.'
      );
      return;
    }

    // Validate size (max 5 MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setValidationError(
        language === 'te'
          ? `ఫోటో పరిమాణం ${(file.size / (1024 * 1024)).toFixed(2)} MB ఉంది. గరిష్ట పరిమితి 5 MB మాత్రమే.`
          : `File size is ${(file.size / (1024 * 1024)).toFixed(2)} MB. Maximum allowed size is 5 MB.`
      );
      return;
    }

    // Read and create preview
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setFileName(file.name);
      setFileSizeMb((file.size / (1024 * 1024)).toFixed(2));
      showToast(
        language === 'te' 
          ? `ఫోటో విజయవంతంగా లోడ్ అయింది (${file.name})`
          : `Photo loaded successfully (${file.name})`
      );
    };
    reader.readAsDataURL(file);
  };

  const handleSampleSelect = (sampleName: string, descEn: string, descTe: string) => {
    setValidationError(null);
    setFileName(sampleName);
    setFileSizeMb('1.2');
    // Generate clean SVG data URL preview for instant testing
    const sampleSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23064e3b"/><circle cx="200" cy="150" r="80" fill="%23047857"/><path d="M160 170 Q 200 100 240 170" stroke="%2334d399" stroke-width="8" fill="none"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="16" font-weight="bold">${sampleName}</text><text x="50%25" y="65%25" dominant-baseline="middle" text-anchor="middle" fill="%23a7f3d0" font-family="sans-serif" font-size="12">Telangana Crop Specimen</text></svg>`;
    setSelectedImage(sampleSvg);
    showToast(language === 'te' ? `${descTe} నమూనా ఎంపిక చేయబడింది` : `${descEn} sample loaded`);
  };

  const clearSelection = () => {
    setSelectedImage(null);
    setFileName('');
    setFileSizeMb('');
    setValidationError(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Camera size={20} />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
              {t.sections.cropPhoto.title}
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {t.sections.cropPhoto.badge}
            </span>
          </div>
          <p className="text-sm text-stone-600">
            {t.sections.cropPhoto.description}
          </p>
        </div>

        <div className="text-xs font-medium px-3 py-1.5 bg-stone-100 text-stone-700 rounded-xl border border-stone-200 self-start sm:self-center">
          {t.sections.cropPhoto.validationRule}
        </div>
      </div>

      {/* Validation Error Alert */}
      {validationError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 animate-in fade-in">
          <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
          <div className="text-sm text-red-800">
            <strong>{language === 'te' ? 'చెల్లుబాటు లోపం:' : 'Validation Alert:'}</strong> {validationError}
          </div>
        </div>
      )}

      {/* Photo Upload & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Upload Box */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-stone-900 text-sm mb-2">
              {language === 'te' ? 'పంట ఫోటోను ఎంచుకోండి / తీయండి' : 'Upload or Capture Crop Photo'}
            </h3>
            
            <label
              htmlFor="crop-photo-input"
              className="mt-2 border-2 border-dashed border-stone-300 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer text-center group min-h-[200px]"
            >
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 group-hover:bg-emerald-100 transition-colors mb-3">
                <Upload size={28} />
              </div>
              <span className="text-sm font-semibold text-stone-800 group-hover:text-emerald-900">
                {t.sections.cropPhoto.dragDropText}
              </span>
              <span className="text-xs text-stone-500 mt-1">
                JPEG, PNG, WEBP (Max 5 MB)
              </span>
              <input
                id="crop-photo-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Preset Telangana Crop Samples */}
          <div className="mt-6 pt-4 border-t border-stone-200">
            <div className="text-xs font-semibold text-stone-500 mb-2 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" />
              <span>{language === 'te' ? 'లేదా పరీక్ష కోసం నమూనా ఎంచుకోండి:' : 'Or test with Telangana field specimens:'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSampleSelect('Cotton-Leaf-Curl.jpg', 'Cotton leaf curl virus symptom', 'పత్తి ఆకు ముడుత లక్షణం')}
                className="touch-target p-2 rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200 text-[11px] font-semibold text-stone-700 text-left"
              >
                🌱 {language === 'te' ? 'పత్తి ఆకు ముడుత' : 'Cotton Curl'}
              </button>
              <button
                type="button"
                onClick={() => handleSampleSelect('Paddy-Blast-Neck.jpg', 'Paddy blast fungal symptom', 'వరి అగ్గి తెగులు లక్షణం')}
                className="touch-target p-2 rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200 text-[11px] font-semibold text-stone-700 text-left"
              >
                🌾 {language === 'te' ? 'వరి అగ్గి తెగులు' : 'Paddy Blast'}
              </button>
              <button
                type="button"
                onClick={() => handleSampleSelect('Maize-Fall-Armyworm.jpg', 'Maize fall armyworm leaf damage', 'మొక్కజొన్న కత్తెర పురుగు')}
                className="touch-target p-2 rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200 text-[11px] font-semibold text-stone-700 text-left"
              >
                🌽 {language === 'te' ? 'మక్క కత్తెర పురుగు' : 'Maize FAW'}
              </button>
            </div>
          </div>
        </div>

        {/* Preview & Diagnostic Report Shell */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between min-h-[340px]">
          {selectedImage ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span className="text-xs font-bold text-stone-800 truncate max-w-xs">{fileName}</span>
                  <span className="text-[11px] text-stone-500">({fileSizeMb} MB)</span>
                </div>
                <button
                  onClick={clearSelection}
                  className="touch-target p-2 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Remove photo"
                  aria-label="Remove photo"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Image Thumbnail */}
              <div className="relative rounded-xl overflow-hidden border border-stone-200 bg-stone-900 max-h-56 flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Crop preview"
                  className="max-h-56 w-auto object-contain mx-auto"
                />
              </div>

              {/* Stage 3 Vision Diagnostic Preview */}
              <div className="p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950">
                    {language === 'te' ? 'విజన్ మోడల్ విశ్లేషణ పద్ధతి (Stage 3 Preview)' : 'Vision Diagnostic Framework (Stage 3)'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    Uncertainty: Medium
                  </span>
                </div>
                <p className="text-stone-700 leading-relaxed text-[11px]">
                  {language === 'te'
                    ? 'దశ 3 లో జెమినీ విజన్ API నేరుగా ఆకుల రంగు మార్పు, కణజాల నష్టం మరియు తెగుళ్ళ నమూనాను పరిశీలిస్తుంది. ఖచ్చితమైన రోగనిర్ధారణకు బదులుగా సంభావ్య కారణాలు మరియు నివారణ సూచనలు మాత్రమే అందిస్తుంది.'
                    : 'In Stage 3, the Gemini Vision pipeline analyzes foliar chlorosis, lesions, and pest damage patterns, strictly stating uncertainty and suggesting follow-up observations.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 text-stone-400">
              <div className="p-4 rounded-full bg-stone-100 text-stone-400 mb-3">
                <ImageIcon size={32} />
              </div>
              <h4 className="font-bold text-stone-700 text-sm">
                {language === 'te' ? 'ఫోటో ఎంపిక కాలేదు' : 'No Photo Selected'}
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mt-1">
                {language === 'te'
                  ? 'ఎడమ వైపు నుండి ఫోటోను అప్‌లోడ్ చేయండి లేదా నమూనా క్లిక్ చేసి పరీక్షించండి.'
                  : 'Select or drop a photo on the left to preview validation and prepare for Stage 3 Vision.'}
              </p>
            </div>
          )}

          {/* Stage 3 Footer Note */}
          <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-emerald-700" />
              <span>{t.sections.cropPhoto.stage3Note}</span>
            </span>
            <span className="font-bold text-emerald-800">Stage 3 Queued</span>
          </div>
        </div>

      </div>

    </div>
  );
};
