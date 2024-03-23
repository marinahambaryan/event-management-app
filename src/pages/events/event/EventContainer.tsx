import { useAtom, useSetAtom } from "jotai";
import { useAuthenticator } from "@aws-amplify/ui-react";

import { Event as EventType, UpdateEventInput } from "../../../API";
import { modalAtom, modalInitialState } from "../../../atoms/modalAtom";
import ModalContainer from "../../modal/ModalContainer";
import EditEventComponent from "../EditEventComponent";
import Event from "./Event";
import { editEvent } from "../../../api/eventsApi";
import { notificationAtom } from "../../../atoms/notificationAtom";

type EventContainerProps = {
  event: EventType;
  handleDelete: () => void;
  onEditEventClick: () => void;
  isMine: boolean;
  retrieveEvents: () => void;
};

const EventContainer = ({
  event,
  handleDelete,
  onEditEventClick,
  isMine,
  retrieveEvents,
}: EventContainerProps) => {
  const { name, description, date } = event;
  const [modal, setModal] = useAtom(modalAtom);
  const setNotification = useSetAtom(notificationAtom);
  const { user } = useAuthenticator((context) => [context.user]);

  function handleCloseModal() {
    setModal(modalInitialState);
  }
  async function handleEdit(data: UpdateEventInput) {
    try {
      await editEvent({ ...data, userId: user.userId });
      await retrieveEvents();
      setNotification({
        isOpen: true,
        message: "Successfully Edited",
        status: "success",
      });
    } catch (error) {
      setNotification({
        isOpen: true,
        message: "Failed to Update",
        status: "error",
      });
    } finally {
      handleCloseModal();
    }
  }

  return (
    <>
      {modal.isOpen && modal.mode === "edit" && (
        <ModalContainer>
          {
            <EditEventComponent
              handleEdit={handleEdit}
              iName={name}
              iDescription={description}
              iDate={date}
            />
          }
        </ModalContainer>
      )}
      <Event
        isMine={isMine}
        handleDelete={handleDelete}
        onEditEventClick={onEditEventClick}
        event={event}
      />
    </>
  );
};

export default EventContainer;
