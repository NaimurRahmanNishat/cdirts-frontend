/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IssueImage } from "@/types";
import { useState } from "react";

interface UploadImageProps {
  setIssue: (images: IssueImage[]) => void;
  currentImages: IssueImage[];
}

const UploadImage = ({ setIssue, currentImages }: UploadImageProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadError('');

    try {
      const uploadedImages: IssueImage[] = [...currentImages];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // File validation
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          setUploadError(`ফাইল "${file.name}" এর সাইজ খুব বড়। সর্বোচ্চ 10MB সাইজের ফাইল আপলোড করতে পারবেন।`);
          continue;
        }

        if (!file.type.startsWith('image/')) {
          setUploadError(`ফাইল "${file.name}" একটি ভ্যালিড ইমেজ ফাইল নয়।`);
          continue;
        }

        // Convert file to base64
        const base64 = await convertToBase64(file);
        
        try {
          // Upload to backend
          const response = await fetch('http://localhost:5000/uploadImage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64 }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `আপলোড ব্যর্থ: ${response.status}`);
          }

          const result = await response.json();

          if (result.success) {
            uploadedImages.push({
              public_id: `img-${Date.now()}-${i}`,
              url: result.url
            });
          } else {
            throw new Error(result.message || "আপলোড ব্যর্থ");
          }
          
        } catch (fetchError: any) {
          console.error(`Upload failed for ${file.name}:`, fetchError);
          setUploadError(`"${file.name}" আপলোড করতে সমস্যা: ${fetchError.message}`);
        }
      }

      setIssue(uploadedImages);
      
      // Success message
      if (uploadedImages.length > currentImages.length) {
        const newCount = uploadedImages.length - currentImages.length;
        alert(`${newCount}টি ইমেজ সফলভাবে আপলোড হয়েছে!`);
      }
      
    } catch (error: any) {
      console.error('Image upload process failed:', error);
      setUploadError(error.message || 'ইমেজ আপলোড করতে সমস্যা হয়েছে।');
    } finally {
      setUploading(false);
      // Clear file input
      e.target.value = '';
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = error => reject(error);
    });
  };

  const removeImage = (index: number) => {
    const newImages = currentImages.filter((_, i) => i !== index);
    setIssue(newImages);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        ইসুর ছবি আপলোড করুন *
        <span className="text-xs text-gray-500 ml-2">(সর্বোচ্চ 10MB প্রতি ইমেজ, JPEG, PNG, WebP)</span>
      </label>
      
      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImageUpload}
        disabled={uploading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-50"
      />
      
      {uploading && (
        <div className="flex items-center space-x-2 text-sm text-blue-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span>ইমেজ আপলোড হচ্ছে...</span>
        </div>
      )}
      
      {uploadError && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200">
          ⚠️ {uploadError}
        </div>
      )}
      
      {/* Image Preview */}
      {currentImages.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">
            আপলোডকৃত ইমেজসমূহ ({currentImages.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentImages.map((image, index) => (
              <div key={index} className="relative group border rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={image.url} 
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  ×
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 text-center">
                  ইমেজ {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;