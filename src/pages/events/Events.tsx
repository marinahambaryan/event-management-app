import { useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useSetAtom, useAtom } from "jotai";

import { getEvents, addEvent } from "../../api/eventsApi";
import AddEventComponent from "./AddEventComponent";
import { CreateEventInput } from "../../API";
import ModalContainer from "../modal/ModalContainer";
import { notificationAtom } from "../../atoms/notificationAtom";
import { modalAtom, modalInitialState } from "../../atoms/modalAtom";
import EventsList from "./EventsList";
import { eventsAtom } from "../../atoms/eventsAtom";

const Events = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const setNotification = useSetAtom(notificationAtom);
  const setEvents = useSetAtom(eventsAtom);
  const [modal, setModal] = useAtom(modalAtom);

  useEffect(() => {
    (async () => {
      await retrieveEvents();
    })();
  }, []);

  function onAddEventClick() {
    setModal({ isOpen: true, mode: "create" });
  }

  function handleCloseModal() {
    setModal(modalInitialState);
  }

  async function retrieveEvents() {
    try {
      const events = await getEvents();
      setEvents(events);
    } catch (error) {
      setNotification({
        isOpen: true,
        message: "Failed to Retrieve Data",
        status: "error",
      });
    }
  }

  async function handleEventCreation({
    name,
    description,
    date,
  }: CreateEventInput) {
    try {
      if (user) {
        await addEvent({ name, description, date, userId: user.userId });
        await retrieveEvents();
        setNotification({
          isOpen: true,
          message: "Successfully Created",
          status: "success",
        });
      }
    } catch (error) {
      setNotification({
        isOpen: true,
        message: "Failed to Create",
        status: "error",
      });
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
      {modal.isOpen && modal.mode === "create" && (
        <ModalContainer>
          {<AddEventComponent handleEventCreation={handleEventCreation} />}
        </ModalContainer>
      )}
      <EventsList retrieveEvents={retrieveEvents} />
    </div>
  );
};

export default Events;
