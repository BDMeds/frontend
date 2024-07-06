import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getMedicines } from "../services/medicine.service";
import Loader from "@/components/Common/Loaders";
import Modal from "@/components/Common/Modal";
import { useModal } from "../providers/modal-provider";
import Image from "next/image";
import { formatNaira } from "../helpers/numbers";
import Button from "@/components/Common/Button";
import { create } from "zustand";
import { Medicine } from "../types";

const useIdStore = create<{ ids: string[]; setStore: (ids: string[]) => void }>((set) => ({
  ids: [],
  setStore: (ids) => set((state) => ({ ids })),
}));

export const useSelectedMedicines = create<{
  medicines: Medicine[];
  setStore: (medicines: Medicine[]) => void;
  addMedicine: (medicine: Medicine) => void;
}>((set) => ({
  medicines: [],
  setStore: (medicines) => set((state) => ({ medicines })),
  addMedicine: (medicine) =>
    set((state) => {
      const exists = state.medicines.find((m) => m._id === medicine._id);

      if (exists) {
        return { medicines: state.medicines.filter((m) => m._id !== medicine._id) };
      }

      return { medicines: [...state.medicines, medicine] };
    }),
}));

const useMedPick = () => {
  const [prescriptionNote, setPrescriptionNote] = useState("");

  const { ids, setStore } = useIdStore();

  const { data, isPending: loading } = useQuery({ queryFn: getMedicines, queryKey: ["medicines"] });

  const addMedicine = (id: string) => {
    if (!data) return;

    const exists = ids.includes(id);

    if (exists) {
      setStore(ids.filter((m) => m !== id));
    }

    const expected = [...ids, id];

    setStore(expected);
  };

  const { showModal } = useModal();

  const renderUI = () => {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            {data && data.length > 0 ? (
              <>
                <div className="space-y-1">
                  <div className="flex flex-col space-y-2">
                    <label>Prescription Note</label>
                    <textarea
                      className="border p-2 dark:border-white/10 rounded-md dark:bg-transparent bg-gray-200"
                      value={prescriptionNote}
                      onChange={(e) => setPrescriptionNote(e.target.value)}
                    />
                  </div>
                  <Button
                    text="Pick Medicine"
                    size="extra-small"
                    variant="filled"
                    onClick={() => showModal(<MedModal addMedicine={addMedicine} ids={ids} />)}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </>
    );
  };

  return { prescriptionNote, medicines: ids, renderUI };
};

const MedModal = ({ addMedicine }: { addMedicine: (id: string) => void; ids: string[] }) => {
  const { hideModal } = useModal();

  const { data: medicines, isPending: loading } = useQuery({ queryFn: getMedicines, queryKey: ["medicines"] });

  return (
    <Modal
      onClose={hideModal}
      isAutomatic={false}
      className="min-w-[20rem] bg-white dark:bg-dark rounded-xl shadow-2xl p-4"
    >
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className="space-y-4">
            {medicines && medicines.length > 0 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="font-semibold">Search</p>

                  <input
                    type="text"
                    className="w-full bg-transparent border-b dark:border-white/10 py-2"
                    placeholder="e.g Paracetamol"
                  />
                </div>

                {medicines.map((medicine) => (
                  <Sing key={medicine._id} medicine={medicine} addMedicine={addMedicine} />
                ))}
              </div>
            )}

            {!medicines && <p className="text-center">No medicines found.</p>}

            <Button text="Done" variant="success" fullWidth onClick={hideModal} />
          </div>
        )}
      </div>
    </Modal>
  );
};

const Sing = ({ medicine }: { medicine: Medicine; addMedicine(id: string): void }) => {
  const [check, setCheck] = useState(false);

  const { ids } = useIdStore();

  const { medicines, addMedicine } = useSelectedMedicines();

  useEffect(() => {
    const exists = medicines.find((m) => m._id === medicine._id);

    setCheck(Boolean(exists));
  }, [medicines]);

  return (
    <div className="py-2 flex items-center justify-between gap-2 group">
      <div className="flex items-center gap-2">
        <div className="size-10 rounded-full overflow-hidden relative">
          <Image
            src={medicine.image}
            alt={medicine.name}
            width={100}
            height={100}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm">{medicine.name}</p>
          <p className="text-xs">{formatNaira(medicine.price)}</p>
        </div>
      </div>

      <Button
        text={check ? "Deselect" : "Select"}
        size="extra-small"
        variant={check ? "filled" : "outline"}
        onClick={() => addMedicine(medicine)}
      />
    </div>
  );
};

export default useMedPick;
