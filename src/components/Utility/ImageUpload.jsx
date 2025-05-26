import { useState, useEffect } from "react";

export default function ImageUpload({ label, value, onChange }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (value && value instanceof File) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(value);
    } else if (typeof value === "string") {
      setPreview(value); // for existing image URL
    }
  }, [value]);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file); // updates form value
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file); // updates form value
    }
  };

  return (
    <>
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <div
        className="w-[400px] mb-3 relative border-2 border-gray-300 border-dashed rounded-lg p-6"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="text-center">
          <img
            className="mx-auto h-12 w-12"
            src="https://www.svgrepo.com/show/357902/image-upload.svg"
            alt="Upload"
          />
          <label className="cursor-pointer text-sm font-medium">
            <span className="font-bold underline hover:no-underline hover:text-[#b0b0a5]">Browse</span> or drag & drop
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
          <p className="mt-1 text-xs text-white/60">PNG, JPG, GIF up to 10MB</p>
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 mx-auto max-h-40 rounded"
          />
        )}
      </div>
    </>
  );
}
