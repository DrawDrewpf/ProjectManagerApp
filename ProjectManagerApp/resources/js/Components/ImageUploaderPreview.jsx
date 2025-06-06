import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { 
    PhotoIcon, 
    XMarkIcon, 
    ArrowUpTrayIcon,
    EyeIcon,
    TrashIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

/**
 * ImageUploaderPreview Component
 * 
 * A comprehensive image uploader with preview functionality that supports:
 * - Drag and drop image upload
 * - Click to select image files
 * - Image preview with zoom functionality
 * - Current image display for edit forms
 * - File validation and error handling
 * - Responsive design with dark mode support
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Input ID
 * @param {string} props.name - Input name
 * @param {File|null} props.value - Current file value
 * @param {Function} props.onChange - Change handler function
 * @param {string} props.currentImageUrl - URL of existing image (for edit forms)
 * @param {string} props.currentImageAlt - Alt text for current image
 * @param {string} props.label - Input label
 * @param {string} props.description - Helper description text
 * @param {Array} props.acceptedTypes - Accepted file types (default: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
 * @param {number} props.maxSizeInMB - Maximum file size in MB (default: 5)
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.required - Whether the field is required
 * @param {string} props.error - Error message
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.showZoom - Show zoom functionality (default: true)
 * @param {string} props.aspectRatio - Preview aspect ratio ('square', 'landscape', 'portrait', 'auto')
 */

export default forwardRef(function ImageUploaderPreview({
    id,
    name,
    value,
    onChange,
    currentImageUrl = null,
    currentImageAlt = 'Current image',
    label = 'Upload Image',
    description = 'Upload an image file',
    acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxSizeInMB = 5,
    placeholder = 'Click to upload or drag and drop',
    required = false,
    error = null,
    className = '',
    showZoom = true,
    aspectRatio = 'auto', // 'square', 'landscape', 'portrait', 'auto'
    ...props
}, ref) {    const [isDragOver, setIsDragOver] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [isUploading, setIsUploading] = useState(false);    // Clear validation error and manage upload state based on backend error
    useEffect(() => {
        if (error) {
            setValidationError('');
            setIsUploading(false);
        }
    }, [error]);
    
    // Reset upload state when no errors and value changes (successful upload)
    useEffect(() => {
        if (!error && !validationError && value) {
            setIsUploading(false);
        }
    }, [error, validationError, value]);
    
    const fileInputRef = useRef(null);
    const dropZoneRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => fileInputRef.current?.focus(),
        click: () => fileInputRef.current?.click(),
        clear: () => handleClear(),
    }));    // Get aspect ratio classes
    const getAspectRatioClass = () => {
        switch (aspectRatio) {
            case 'square': return 'aspect-square max-h-40';
            case 'landscape': return 'aspect-video max-h-36';
            case 'portrait': return 'aspect-[3/4] max-h-44';
            default: return 'h-36';
        }
    };    // Validate file
    const validateFile = (file) => {
        if (!file) return { isValid: false, error: 'No file selected' };

        // Check file type
        if (!acceptedTypes.includes(file.type)) {
            const supportedTypes = acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ');
            return { 
                isValid: false, 
                error: `File type not supported. Please select a ${supportedTypes} image.` 
            };
        }

        // Check file size
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
            const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(1);
            return { 
                isValid: false, 
                error: `File size (${fileSizeInMB}MB) exceeds the ${maxSizeInMB}MB limit. Please choose a smaller image.` 
            };
        }

        return { isValid: true, error: null };
    };    // Handle file selection
    const handleFileSelect = async (file) => {
        setIsUploading(true);
        
        const validation = validateFile(file);
        
        if (!validation.isValid) {
            setValidationError(validation.error);
            setIsUploading(false);
            return;
        }

        setValidationError('');
        
        try {
            // Create preview URL
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            
            // Call onChange with the file
            onChange({
                target: {
                    name,
                    files: [file],
                    value: file
                }
            });
            
            // Note: isUploading will be set to false when backend response is received
            // or when a backend error occurs via the useEffect hook
        } catch (error) {
            setValidationError('Error processing the image. Please try again.');
            setIsUploading(false);
            console.error('Error handling file:', error);
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    // Handle drag events
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        
        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find(file => file.type.startsWith('image/'));
        
        if (imageFile) {
            handleFileSelect(imageFile);
        }
    };    // Handle clear
    const handleClear = () => {
        setPreviewUrl(null);
        setValidationError('');
        setIsUploading(false);
        
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        
        onChange({
            target: {
                name,
                files: [],
                value: null
            }
        });
    };    // Handle click to select
    const handleClick = () => {
        if (!isUploading) {
            fileInputRef.current?.click();
        }
    };

    // Get display image URL
    const displayImageUrl = previewUrl || currentImageUrl;
    const hasImage = !!displayImageUrl;
    const hasNewImage = !!previewUrl;

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Label */}
            {label && (
                <InputLabel htmlFor={id} value={label} required={required} />
            )}
            
            {/* Description */}
            {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {description}
                </p>
            )}            {/* Upload Area */}
            <div
                ref={dropZoneRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
                className={`
                    relative border-2 border-dashed rounded-2xl transition-all duration-200 
                    ${isUploading ? 'cursor-wait' : 'cursor-pointer'}
                    ${isDragOver 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : hasImage
                            ? 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                    }
                    ${hasImage ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'}
                    ${!isUploading && 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                    focus:outline-none focus:ring-4 focus:ring-blue-500/20
                `}
            >
                {hasImage ? (
                    // Image Preview
                    <div className={`relative ${getAspectRatioClass()} w-full overflow-hidden rounded-xl`}>
                        <img
                            src={displayImageUrl}
                            alt={currentImageAlt}
                            className="w-full h-full object-cover"
                        />
                          {/* Image Overlay */}
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                            <div className="flex items-center space-x-3">
                                {showZoom && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsZoomed(true);
                                        }}
                                        disabled={isUploading}
                                        className="p-2 bg-white/90 hover:bg-white text-gray-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="View full size"
                                    >
                                        <EyeIcon className="w-5 h-5" />
                                    </button>
                                )}
                                
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClick();
                                    }}
                                    disabled={isUploading}
                                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Change image"
                                >
                                    {isUploading ? (
                                        <ArrowPathIcon className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <ArrowUpTrayIcon className="w-5 h-5" />
                                    )}
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClear();
                                    }}
                                    disabled={isUploading}
                                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Remove image"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>                        {/* New Image Badge */}
                        {hasNewImage && (
                            <div className="absolute top-3 right-3">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    New
                                </span>
                            </div>
                        )}

                        {/* Loading Overlay */}
                        {isUploading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
                                    <ArrowPathIcon className="w-5 h-5 text-blue-500 animate-spin" />
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        Processing...
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>) : (
                    // Upload Placeholder
                    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                        <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                            {isUploading ? (
                                <ArrowPathIcon className="w-7 h-7 text-blue-500 animate-spin" />
                            ) : (
                                <PhotoIcon className="w-7 h-7 text-gray-400 dark:text-gray-500" />
                            )}
                        </div>
                        
                        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                            {isUploading ? 'Processing image...' : placeholder}
                        </h3>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {isUploading 
                                ? 'Please wait while we process your image'
                                : 'Drag and drop your image here, or click to browse'
                            }
                        </p>
                        
                        {!isUploading && (
                            <div className="flex items-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
                                <span>Supported: {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}</span>
                                <span>•</span>
                                <span>Max: {maxSizeInMB}MB</span>
                            </div>
                        )}
                    </div>
                )}{/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    id={id}
                    name={name}
                    type="file"
                    accept={acceptedTypes.join(',')}
                    onChange={handleInputChange}
                    className="hidden"
                />
            </div>            {/* Error Display Section */}
            {(error || validationError) && (
                <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                                Error al subir la imagen
                            </h4>
                            <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                                {error || validationError}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Zoom Modal */}
            {isZoomed && displayImageUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
                        <img
                            src={displayImageUrl}
                            alt={currentImageAlt}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        />
                        
                        <button
                            type="button"
                            onClick={() => setIsZoomed(false)}
                            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});
