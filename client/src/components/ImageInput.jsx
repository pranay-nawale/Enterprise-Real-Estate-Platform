import React, { useState, useRef } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * ImageInput — dual-mode image field for the CMS.
 * Props:
 *   name        — field name (passed through to onChange event simulation)
 *   value       — current imageUrl string
 *   onChange    — called with a synthetic-like event: { target: { name, value } }
 *   token       — JWT auth token for the upload API
 *   required    — whether the field is required
 */
function ImageInput({ name, value, onChange, token, required }) {
  // Determine initial tab: if value looks like a local upload path use 'upload', else 'url'
  const [tab, setTab] = useState('upload');
  const [uploadError, setUploadError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Derive the full preview URL — resolve server-relative upload paths
  const previewSrc = value
    ? value.startsWith('/uploads/')
      ? `${API_BASE}${value}`
      : value
    : null;

  const emitChange = (url) => {
    onChange({ target: { name, value: url } });
  };

  const validateAndUpload = async (file) => {
    setUploadError('');

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError('Invalid file type. Please upload a JPG, JPEG, PNG, or WebP image.');
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setUploadError(`File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum allowed size is 5 MB.`);
      return;
    }

    setUploading(true);
    try {
      const form = new FormData();
      form.append('image', file);
      const res = await axios.post(`${API_BASE}/api/upload`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      emitChange(res.data.url);
    } catch (err) {
      setUploadError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) validateAndUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndUpload(file);
  };

  const handleUrlChange = (e) => {
    setUploadError('');
    emitChange(e.target.value);
  };

  const switchTab = (t) => {
    setTab(t);
    setUploadError('');
  };

  return (
    <div className="space-y-2">
      {/* Tab switcher */}
      <div className="flex border border-accent/25 divide-x divide-accent/25 rounded-sm overflow-hidden w-fit">
        <button
          type="button"
          onClick={() => switchTab('upload')}
          className={`px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider transition-colors ${
            tab === 'upload'
              ? 'bg-primary text-white'
              : 'bg-beige-light text-primary/60 hover:text-primary'
          }`}
        >
          ↑ Upload File
        </button>
        <button
          type="button"
          onClick={() => switchTab('url')}
          className={`px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider transition-colors ${
            tab === 'url'
              ? 'bg-primary text-white'
              : 'bg-beige-light text-primary/60 hover:text-primary'
          }`}
        >
          🔗 Image URL
        </button>
      </div>

      {/* Upload tab */}
      {tab === 'upload' && (
        <div>
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-sm px-6 py-6 cursor-pointer transition-colors ${
              dragOver
                ? 'border-primary bg-primary/5'
                : 'border-accent/30 bg-beige-light hover:border-primary/50 hover:bg-primary/5'
            }`}
          >
            {uploading ? (
              <>
                <svg className="animate-spin h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-[10px] text-primary/60 uppercase tracking-wider font-bold">Uploading...</span>
              </>
            ) : (
              <>
                <svg className="h-7 w-7 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <p className="text-[10px] text-primary/60 text-center">
                  <span className="font-bold text-primary">Click to browse</span> or drag & drop
                </p>
                <p className="text-[9px] text-primary/40 uppercase tracking-wider">JPG · PNG · WebP · Max 5 MB</p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Hidden text input — keeps formData in sync; NOT marked required to avoid blocking HTML5 validation */}
          <input
            type="text"
            name={name}
            value={value || ''}
            readOnly
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>
      )}

      {/* URL tab */}
      {tab === 'url' && (
        <input
          type="text"
          name={name}
          required={required}
          value={value || ''}
          onChange={handleUrlChange}
          placeholder="https://example.com/image.jpg"
          className="w-full bg-beige-light border border-accent/25 px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
        />
      )}

      {/* Validation error */}
      {uploadError && (
        <div className="flex items-start gap-2 p-2.5 bg-red-50 border-l-2 border-red-500 text-red-700 text-[10px] rounded-sm">
          <svg className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {uploadError}
        </div>
      )}

      {/* Image preview */}
      {previewSrc && !uploading && (
        <div className="mt-2 relative group w-fit">
          <img
            src={previewSrc}
            alt="Preview"
            className="h-28 w-48 object-cover border border-accent/25 rounded-sm shadow-sm"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <button
            type="button"
            onClick={() => { emitChange(''); setUploadError(''); }}
            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold"
            title="Remove image"
          >
            ✕
          </button>
          <p className="text-[9px] text-primary/40 mt-1 uppercase tracking-wider">Current preview</p>
        </div>
      )}
    </div>
  );
}

export default ImageInput;
