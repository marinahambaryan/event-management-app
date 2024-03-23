import { useEffect, useState } from "react";
import {
  getEvents,
  addEvent,
  removeEvent,
  editEvent,
} from "../../api/eventsApi";
import { useAuthenticator } from "@aws-amplify/ui-react";

import AddEventComponent from "./AddEventComponent";
import EditEventComponent from "./EditEventComponent";
import { CreateEventInput, Event, UpdateEventInput } from "../../API";
import EventComponent from "./EventComponent";
import ModalContainer from "../modal/ModalContainer";

const modalInitialState = { isOpen: false, mode: null };

const Events = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [events, setEvents] = useState<Event[]>([]);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit" | null;
  }>(modalInitialState);
  useEffect(() => {
    (async () => {
      await retrieveEvents();
    })();
  }, []);

  function onAddEventClick() {
    setModal({ isOpen: true, mode: "create" });
  }

  function onEditEventClick() {
    setModal({ isOpen: true, mode: "edit" });
  }

  function handleCloseModal() {
    setModal(modalInitialState);
  }

  async function retrieveEvents() {
    try {
      const events = await getEvents();
      console.log({ events });
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
      if (user)
        await addEvent({ name, description, date, userId: user.userId });
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

  async function handleEdit(data: UpdateEventInput) {
    try {
      await editEvent(data);
      await retrieveEvents();
    } catch (error) {
      console.log({ error });
    } finally {
      handleCloseModal();
    }
  }

  return (
    <div>
      <div className="flex justify-center mt-8">
        <button
          onClick={onAddEventClick}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
        >
          Add Event
        </button>
      </div>
      {modal.isOpen && (
        <ModalContainer handleCloseModal={handleCloseModal}>
          {modal.mode === "create" && (
            <AddEventComponent handleEventCreation={handleEventCreation} />
          )}
        </ModalContainer>
      )}
      {events.map(
        (event) =>
          event && (
            <>
              <EventComponent
                event={event}
                key={event.id}
                handleDelete={() => handleDelete(event.id)}
                handleEdit={() => onEditEventClick()}
                isMine={event.userId === user.userId}
              />
              {modal.isOpen && (
                <ModalContainer handleCloseModal={handleCloseModal}>
                  {modal.mode === "edit" && (
                    <EditEventComponent
                      handleEdit={handleEdit}
                      iName={event.name}
                      iDescription={event.description}
                      iDate={event.date}
                    />
                  )}
                </ModalContainer>
              )}
            </>
          )
      )}
    </div>
  );
};

export default Events;
