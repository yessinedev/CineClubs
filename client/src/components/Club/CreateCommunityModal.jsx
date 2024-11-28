import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { createClub } from "@/services/clubService";
import { handleImageUpload } from "@/lib/utils";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  name: z.string().min(3, "Community name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z
    .custom()
    .refine((files) => files?.length === 1, "Image is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 5MB"
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

export default function CreateCommunityModal() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { mutate: createCommunityMutation } = useMutation({
    mutationFn: ({ userId, club }) => createClub(userId, club),
    onSuccess: () => {
      queryClient.invalidateQueries(["clubs", user.id]);
    },
    onError: (error) => {
      console.error("Failed to create the post:", error);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    await handleImageUpload(data.imageUrl[0])
      .then((res) => {
        const club = {
          name: data.name,
          description: data.description,
          imageUrl: res,
        };
        createCommunityMutation({ userId: user.id, club: club })
      })
      .then((error) => {
        throw error;
      })
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors">
          <Plus />
          Create Community
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create a New Community
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Create a space for people to discuss and share their ideas and news
            about tech & programming
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Community Name
            </Label>
            <Input
              id="name"
              {...register("name")}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="e.g., Javascript Enthusiasts"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
              placeholder="Describe what your community is about..."
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-white">
              Banner Image URL
            </Label>
            <div className="relative">
              <Input type="file" accept="image/*" {...register("imageUrl")} />
            </div>
            {errors.imageUrl && (
              <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                Cancel
              </Button>
            </DialogTrigger>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Create Community
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
