import { Upload } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Camera } from "lucide-react";
import { handleImageUpload } from "@/lib/utils";
import { updateProfilePicture } from "@/services/userService";
import { showToast } from "@/lib/toast";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfilePictureModal({
  modalTitle,
  isProfile = false,
  id,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isProfile && selectedFile) {
      try {
        const imgUrl = await handleImageUpload(selectedFile);

        await showToast.promise(
          updateProfilePicture(id, imgUrl).then(() => {
            queryClient.invalidateQueries(["users"]);
            setIsOpen(false);
            setSelectedFile(null);
            setPreview(null);
          }),
          {
            loading: "Updating your profile image...",
            success: "Profile image updated successfully!",
            error: "Failed to update image",
          }
        );
      } catch (error) {
        console.error("Error occurred during submission:", error);
        throw error;
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="p-1.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
          <Camera className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex items-center justify-center text-white">
          <DialogTitle>{modalTitle}</DialogTitle>
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
              <span className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors inline-block">
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
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update Picture
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
