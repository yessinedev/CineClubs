import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        hideCloseButton
        className="!rounded-[8px] sm:!rounded-[8px] bg-gray-900 border-none p-0 sm:max-w-[425px] overflow-hidden"
      >
        <DialogClose className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-700 hover:cursor-pointer transition-colors group">
          <span className="sr-only">Close</span>
          <svg
            className="w-6 h-6 text-gray-400 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </DialogClose>

        <div className="p-4">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-[20px] font-bold text-white pr-6">
              {title}
            </DialogTitle>
          </DialogHeader>

          <div className="h-[1px] bg-gray-800 my-4" />

          <DialogDescription className="text-[15px] text-gray-300 font-normal leading-5">
            {description}
          </DialogDescription>

          <DialogFooter className="flex flex-row justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="min-w-[70px] px-3 py-2 rounded-[6px] font-semibold text-[15px] text-blue-500 hover:bg-gray-700 hover:text-blue-400 transition-colors"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="min-w-[70px] px-3 py-2 rounded-[6px] font-semibold text-[15px] bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              {confirmText}
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
