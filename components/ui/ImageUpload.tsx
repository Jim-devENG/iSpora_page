import React, { useState, useRef } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from './utils';

interface ImageUploadProps {
  value?: string;
  onChange: (imageUrl: string | null) => void;
  type?: 'blog' | 'event';
  label?: string;
  className?: string;
  required?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  type = 'blog',
  label = 'Image',
  className,
  required = false
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Image must be less than 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Convert file to base64
      const base64 = await fileToBase64(file);
      
      // Upload to API
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64,
          type: type,
          fileName: file.name
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');

      if (!response.ok) {
        let errorMessage = 'Failed to upload image';
        if (isJson) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorData.message || errorMessage;
          } catch (e) {
            // If JSON parsing fails, use status text
            errorMessage = `Upload failed: ${response.status} ${response.statusText}`;
          }
        } else {
          // If response is HTML (like a 404 page), provide a helpful error
          errorMessage = `API endpoint not found. Please check that /api/upload-image is configured correctly.`;
        }
        throw new Error(errorMessage);
      }

      if (!isJson) {
        const text = await response.text();
        console.error('Non-JSON response:', text.substring(0, 200));
        throw new Error('Server returned invalid response format. Please check that the API endpoint is configured correctly.');
      }

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Failed to parse server response. Please try again.');
      }
      
      if (!data.imageUrl) {
        throw new Error('Server response missing imageUrl');
      }
      
      // Set preview and call onChange
      setPreview(data.imageUrl);
      onChange(data.imageUrl);
    } catch (err: any) {
      console.error('Upload error:', err);
      let errorMessage = err.message || 'Failed to upload image. Please try again.';
      
      // Provide helpful error message for local development
      if (errorMessage.includes('API endpoint not found') || errorMessage.includes('Failed to fetch')) {
        errorMessage = 'API endpoint not available. If testing locally, please use Vercel CLI (vercel dev) or deploy to Vercel.';
      }
      
      setError(errorMessage);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor="image-upload">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      
      <div className="space-y-2">
        {/* Preview */}
        {preview && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Upload Area */}
        <div
          onClick={handleClick}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors",
            preview ? "border-border" : "border-primary/30 hover:border-primary/50",
            uploading && "opacity-50 cursor-not-allowed"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="image-upload"
            disabled={uploading}
          />
          
          <div className="flex flex-col items-center justify-center space-y-2">
            {uploading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </>
            ) : preview ? (
              <>
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to change image</p>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium">Click to upload image</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {/* Help Text */}
        {!error && !preview && (
          <p className="text-xs text-muted-foreground">
            Recommended: 1200x630px for blog posts, 800x450px for events
          </p>
        )}
      </div>
    </div>
  );
}


