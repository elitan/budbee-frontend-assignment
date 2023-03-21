import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { CatAddModal } from "./CatAddModal";

export function CatListAdd() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      {modalIsOpen && (
        <CatAddModal
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          operation="add"
        />
      )}
      <button
        className="flex flex-col items-center justify-center"
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        <div>
          <PlusCircleIcon className="h-6 w-6" />
        </div>
        <div>Add</div>
      </button>
    </>
  );
}
