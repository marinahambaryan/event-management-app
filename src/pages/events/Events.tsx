import { useEffect, useState } from "react";
import { getEvents, addEvent, removeEvent } from "../../api/eventsApi";

import AddEventComponent from "./AddEventComponent";
import { CreateEventInput, Event } from "../../API";
import EventComponent from "./EventComponent";
import ModalContainer from "../modal/ModalContainer";

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      await retrieveEvents();
    })();
  }, []);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function retrieveEvents() {
    try {
      const events = await getEvents();
      setEvents(events);
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleEventCreation({
    name,
    description,
    date,
  }: CreateEventInput) {
    try {
      await addEvent({ name, description, date });
      handleCloseModal();
      await retrieveEvents();
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleDelete(id: string) {
    try {
      await removeEvent({ id });
      await retrieveEvents();
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
        >
          Add Event
        </button>
      </div>
      {isModalOpen && (
        <ModalContainer handleCloseModal={handleCloseModal}>
          <AddEventComponent handleEventCreation={handleEventCreation} />
        </ModalContainer>
      )}
      {events.map((event) => (
        <EventComponent
          event={event}
          key={event.id}
          handleDelete={() => handleDelete(event.id)}
        />
      ))}
    </div>
  );
};

export default Events;
