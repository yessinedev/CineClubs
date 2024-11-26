import { X, Upload } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Camera } from "lucide-react";

export default function ProfilePictureModal() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Camera className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex items-center justify-center text-white">
          <DialogTitle> Update Profile Picture</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-xl object-cover mb-4"
              />
            ) : (
              <div className="w-32 h-32 rounded-xl bg-gray-800 flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
            )}

            <label className="cursor-pointer">
              <span className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors inline-block">
                Choose Image
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="flex items-center justify-center space-x-3">
            <button
              type="submit"
              disabled={!selectedFile}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update Picture
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
