import { Event } from "../../API";

type EventComponentProps = {
  event: Event;
  handleDelete: () => void;
  handleEdit: () => void;
  isMine: boolean;
};

const EventComponent = ({
  event,
  handleDelete,
  handleEdit,
  isMine,
}: EventComponentProps) => {
  const { name, description, date } = event;

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-md shadow-md p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <p className="text-gray-700 mb-2">{description}</p>
          <p className="text-gray-600">{new Date(date).toLocaleDateString()}</p>
        </div>
        {isMine && (
          <>
            <button
              onClick={handleDelete}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              disabled
              onClick={handleEdit}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:bg-green-500 disabled:hover:bg-green-500 cursor-not-allowed"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventComponent;
