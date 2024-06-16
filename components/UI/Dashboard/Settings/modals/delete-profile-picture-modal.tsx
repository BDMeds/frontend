import Button from "@/components/Common/Button";
import Modal from "@/components/Common/Modal";
import { queryClient } from "@/lib/providers";
import { useModal } from "@/lib/providers/modal-provider";
import { deleteProfilePicture } from "@/lib/services/user.service";
import { useMutation } from "@tanstack/react-query";

const DeleteProfilePictureModal = () => {
  const { hideModal } = useModal();

  const { mutate, isPending: loading } = useMutation({ mutationFn: deleteProfilePicture });

  return (
    <Modal onClose={hideModal} className="bg-white rounded-lg shadow-lg space-y-4 max-w-sm p-4">
      <p className="font-bold text-lg">Profile Picture Removal</p>

      <p className="text-gray-500">
        Are you sure you want to remove your profile picture? This action cannot be undone.
      </p>

      <div className="grid grid-cols-2 gap-2">
        <Button text="Cancel" fullWidth onClick={hideModal} />
        <Button
          text="Delete"
          variant="destructive"
          fullWidth
          loading={loading}
          onClick={() =>
            mutate(undefined, {
              onSuccess: () => (
                queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes("info") }), hideModal()
              ),
            })
          }
        />
      </div>
    </Modal>
  );
};

export default DeleteProfilePictureModal;
