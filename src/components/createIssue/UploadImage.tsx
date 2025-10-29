/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IssueImage } from "@/types";
import { useState } from "react";

interface UploadImageProps {
  setIssue: (images: IssueImage[]) => void;
  currentImages: IssueImage[];
}

const UploadImage = ({ setIssue, currentImages }: UploadImageProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // max 3 images allowed 
    if (currentImages.length + files.length > 3) {
      setUploadError("You can upload a maximum of 3 images per issue.");
      e.target.value = "";
      return;
    }

    setUploading(true);
    setUploadError("");

    try {
      const uploadedImages: IssueImage[] = [...currentImages];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // File size validation (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          setUploadError(`"${file.name}" is too large. Maximum allowed size is 10MB.`);
          continue;
        }

        // File type validation
        if (!file.type.startsWith("image/")) {
          setUploadError(`"${file.name}" is not a valid image format.`);
          continue;
        }

        // Convert to base64
        const base64 = await convertToBase64(file);

        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/uploadImage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64 }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Upload failed: ${response.status}`);
          }

          const result = await response.json();

          if (result.success) {
            uploadedImages.push({
              public_id: `img-${Date.now()}-${i}`,
              url: result.url,
            });
          } else {
            throw new Error(result.message || "Upload failed!");
          }
        } catch (fetchError: any) {
          console.error(`Upload failed for ${file.name}:`, fetchError);
          setUploadError(`"${file.name}" upload failed: ${fetchError.message}`);
        }
      }

      setIssue(uploadedImages);
    } catch (error: any) {
      console.error("Image upload process failed:", error);
      setUploadError(error.message || "Something went wrong.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const removeImage = (index: number) => {
    const newImages = currentImages.filter((_, i) => i !== index);
    setIssue(newImages);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Issue Images *
        <span className="text-xs text-gray-500 ml-2">
          (Maximum 3 images, 10MB each, JPEG, PNG, WebP)
        </span>
      </label>

      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImageUpload}
        disabled={uploading || currentImages.length >= 3}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 
          file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold 
          file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 
          disabled:opacity-50"
      />

      {uploading && (
        <div className="flex items-center space-x-2 text-sm text-blue-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span>Uploading...</span>
        </div>
      )}

      {uploadError && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200">
          {uploadError}
        </div>
      )}

      {/* Image Preview */}
      {currentImages.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">
            Uploaded Images ({currentImages.length}/3)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentImages.map((image, index) => (
              <div
                key={index}
                className="relative group border rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={image.url}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 
                    flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 
                    transition-opacity duration-200"
                >
                  X
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 text-center">
                  Image {index + 1}
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
