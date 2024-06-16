import Modal from "@/components/Common/Modal";
import { useModal } from "@/lib/providers/modal-provider";

const UserEditModal = () => {
  const { hideModal } = useModal();

  return (
    <Modal onClose={hideModal} className="bg-white shadow-lg rounded-lg">
      <div className="p-4">
        <h1 className="text-xl font-semibold">Edit User</h1>
        <div className="mt-4 space-y-4">
          <div className="space-y-1">
            <label className="font-semibold">First Name</label>
            <input type="text" className="input-box" />
          </div>

          <div className="space-y-1">
            <label className="font-semibold">Last Name</label>
            <input type="text" className="input-box" />
          </div>

          <div className="space-y-1">
            <label className="font-semibold">Email</label>
            <input type="email" className="input-box" />
          </div>

          <div className="space-y-1">
            <label className="font-semibold">Role</label>
            <select className="input-box">
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold">Status</label>
            <select className="input-box">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold">Phone</label>
            <input type="text" className="input-box" />
          </div>

          <div className="space-y-1">
            <label className="font-semibold">Address</label>
            <input type="text" className="input-box" />
          </div>

          <div className="space-y-1">
            <label className="font-semibold">City</label>
            <input type="text" className="input-box" />
          </div>

          <div className="space-y-1">
            <label className="font-semibold">Country</label>
            <input type="text" className="input-box" />
          </div>
        </div>
      </div>

      <div className="flex justify-end p-4 border-t border-gray-200 gap-4">
        <button className="btn-secondary" onClick={hideModal}>
          Cancel
        </button>
        <button className="btn-primary">Save</button>
      </div>
    </Modal>
  );
};

export default UserEditModal;
