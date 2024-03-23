import { useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";

import Input from "../../components/Input";
import { UpdateEventInput } from "../../API";

type AddEventComponentProps = {
  handleEdit: (data: UpdateEventInput) => void;
  iName: string;
  iDescription: string;
  iDate: string;
};
const AddEventComponent = ({
  handleEdit,
  iName,
  iDescription,
  iDate,
}: AddEventComponentProps) => {
  const [name, setName] = useState(iName);
  const [description, setDescription] = useState(iDescription);
  const [date, setDate] = useState(iDate);

  const { user } = useAuthenticator((context) => [context.user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleEdit({
      id: name,
      description,
      date,
      userId: user.userId,
    });
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
        Edit Event
      </button>
    </form>
  );
};

export default AddEventComponent;
