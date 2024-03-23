import { useSetAtom } from "jotai";
import { modalAtom, modalInitialState } from "../../atoms/modalAtom";

type ModalContainerProps = {
  children: React.ReactNode;
};

const ModalContainer = ({ children }: ModalContainerProps) => {
  const setModal = useSetAtom(modalAtom);

  function handleCloseModal() {
    setModal(modalInitialState);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={handleCloseModal}
      ></div>
      <div className="relative bg-white rounded-md shadow-md p-6 z-10">
        <button
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
          onClick={handleCloseModal}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-2">Add Event</h2>
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
