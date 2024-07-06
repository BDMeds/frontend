import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getMedicines } from "../services/medicine.service";
import Loader from "@/components/Common/Loaders";
import Modal from "@/components/Common/Modal";
import { useModal } from "../providers/modal-provider";
import Image from "next/image";
import { formatNaira } from "../helpers/numbers";

const useMedPick = () => {
  const [prescriptionNote, setPrescriptionNote] = useState("");
  const [medicines, setMedicines] = useState<string[]>([]);

  const { data, isPending: loading } = useQuery({ queryFn: getMedicines, queryKey: ["medicines"] });

  const renderUI = () => {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            {data && data.length > 0 ? (
              <>
                <div>
                  <div className="flex flex-col space-y-2">
                    <label>Prescription Note</label>
                    <textarea
                      className="border p-2 dark:border-white/10 rounded-md dark:bg-transparent bg-gray-200"
                      value={prescriptionNote}
                      onChange={(e) => setPrescriptionNote(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex flex-col space-y-2">
                    <label>Medicines</label>
                    <div className="flex flex-wrap gap-2">
                      {data.map((medicine, index) => (
                        <div key={index} className="bg-gray-200 p-2 rounded-md">
                          {index}
                          <button
                            onClick={() => {
                              setMedicines((prev) => prev.filter((_, i) => i !== index));
                            }}
                          >
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
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

  return { prescriptionNote, medicines, renderUI };
};

const MedModal = () => {
  const { hideModal } = useModal();
  const { data: medicines, isPending: loading } = useQuery({ queryFn: getMedicines, queryKey: ["medicines"] });

  return (
    <Modal onClose={hideModal} className="min-w-[20rem] bg-white dark:bg-dark rounded-xl shadow-2xl">
      <div>
        {loading ? (
          <Loader />
        ) : (
          <>
            {medicines &&
              medicines.length > 0 &&
              medicines.map((medicine) => (
                <div key={medicine._id} className="py-2 flex items-center justify-between gap-2">
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

                    <p className="text-sm">{medicine.name}</p>
                  </div>

                  <div className="font-medium">{formatNaira(medicine.price)}</div>
                </div>
              ))}
          </>
        )}
      </div>
    </Modal>
  );
};

export default useMedPick;
