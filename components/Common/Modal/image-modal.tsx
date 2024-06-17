"use client";
import { useModal } from "@/lib/providers/modal-provider";
import Modal from ".";
import { FC } from "react";
import Image from "next/image";

type Props = { image: string };

const ImageModal: FC<Props> = ({ image }) => {
  const { hideModal } = useModal();

  return (
    <Modal onClose={hideModal}>
      <Image src={image} alt="image" width={400} height={400} />
    </Modal>
  );
};

export default ImageModal;
