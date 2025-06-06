import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { 
    PhotoIcon, 
    XMarkIcon, 
    ArrowUpTrayIcon,
    EyeIcon,
    TrashIcon
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
}, ref) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [validationError, setValidationError] = useState('');
    
    const fileInputRef = useRef(null);
    const dropZoneRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => fileInputRef.current?.focus(),
        click: () => fileInputRef.current?.click(),
        clear: () => handleClear(),
    }));

    // Get aspect ratio classes
    const getAspectRatioClass = () => {
        switch (aspectRatio) {
            case 'square': return 'aspect-square';
            case 'landscape': return 'aspect-video';
            case 'portrait': return 'aspect-[3/4]';
            default: return 'min-h-48';
        }
    };

    // Validate file
    const validateFile = (file) => {
        if (!file) return { isValid: false, error: 'No file selected' };

        // Check file type
        if (!acceptedTypes.includes(file.type)) {
            return { 
                isValid: false, 
                error: `File type not supported. Accepted types: ${acceptedTypes.join(', ')}` 
            };
        }

        // Check file size
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
            return { 
                isValid: false, 
                error: `File size too large. Maximum size: ${maxSizeInMB}MB` 
            };
        }

        return { isValid: true, error: null };
    };

    // Handle file selection
    const handleFileSelect = (file) => {
        const validation = validateFile(file);
        
        if (!validation.isValid) {
            setValidationError(validation.error);
            return;
        }

        setValidationError('');
        
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
    };

    // Handle clear
    const handleClear = () => {
        setPreviewUrl(null);
        setValidationError('');
        
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
    };

    // Handle click to select
    const handleClick = () => {
        fileInputRef.current?.click();
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
            )}

            {/* Upload Area */}
            <div
                ref={dropZoneRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
                className={`
                    relative border-2 border-dashed rounded-2xl transition-all duration-200 cursor-pointer
                    ${isDragOver 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : hasImage
                            ? 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                    }
                    ${hasImage ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'}
                    hover:bg-gray-100 dark:hover:bg-gray-700
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
                                        className="p-2 bg-white/90 hover:bg-white text-gray-700 rounded-full transition-colors"
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
                                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                                    title="Change image"
                                >
                                    <ArrowUpTrayIcon className="w-5 h-5" />
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClear();
                                    }}
                                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                                    title="Remove image"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* New Image Badge */}
                        {hasNewImage && (
                            <div className="absolute top-3 right-3">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    New
                                </span>
                            </div>
                        )}
                    </div>
                ) : (
                    // Upload Placeholder
                    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                            <PhotoIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                        </div>
                        
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            {placeholder}
                        </h3>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Drag and drop your image here, or click to browse
                        </p>
                        
                        <div className="flex items-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
                            <span>Supported: {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}</span>
                            <span>•</span>
                            <span>Max: {maxSizeInMB}MB</span>
                        </div>
                    </div>
                )}

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    id={id}
                    name={name}
                    type="file"
                    accept={acceptedTypes.join(',')}
                    onChange={handleInputChange}
                    className="hidden"
                    {...props}
                />
            </div>

            {/* Error Display */}
            {(error || validationError) && (
                <InputError className="mt-2">
                    {error || validationError}
                </InputError>
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
