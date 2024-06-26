import { useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";

import Input from "../../components/Input";
import { CreateEventInput } from "../../API";

type AddEventComponentProps = {
  handleEventCreation: ({ name, description, date }: CreateEventInput) => void;
};
const AddEventComponent = ({ handleEventCreation }: AddEventComponentProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const { user } = useAuthenticator((context) => [context.user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleEventCreation({ name, description, date, userId: user.userId });
    setName("");
    setDescription("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto m-4">
      <Input
        type="text"
        label={"Event Name"}
        name={"name"}
        value={name}
        handleChange={(e) => setName(e.target.value)}
      />
      <Input
        type="textarea"
        label={"Description"}
        name={"description"}
        value={description}
        handleChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="date"
        label={"Date"}
        name={"date"}
        value={date}
        handleChange={(e) => setDate(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Event
      </button>
    </form>
  );
};

export default AddEventComponent;
