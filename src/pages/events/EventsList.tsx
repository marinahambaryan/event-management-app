import { Fragment } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { useAuthenticator } from "@aws-amplify/ui-react";

import EventContainer from "./event/EventContainer";
import { modalAtom } from "../../atoms/modalAtom";
import { removeEvent } from "../../api/eventsApi";
import { notificationAtom } from "../../atoms/notificationAtom";
import { eventsAtom } from "../../atoms/eventsAtom";

type EventsListProps = { retrieveEvents: () => void };

const EventsList = ({ retrieveEvents }: EventsListProps) => {
  const setModal = useSetAtom(modalAtom);
  const setNotification = useSetAtom(notificationAtom);
  const events = useAtomValue(eventsAtom);
  const { user } = useAuthenticator((context) => [context.user]);

  function onEditEventClick() {
    setModal({ isOpen: true, mode: "edit" });
  }

  async function handleDelete(id: string) {
    try {
      await removeEvent({ id });
      await retrieveEvents();
      setNotification({
        isOpen: true,
        message: "Successfully Created",
        status: "success",
      });
    } catch (error) {
      setNotification({
        isOpen: true,
        message: "Failed to Created",
        status: "error",
      });
    }
  }

  return (
    <>
      {events.map(
        (event) =>
          event && (
            <Fragment key={event.id}>
              <EventContainer
                event={event}
                handleDelete={() => handleDelete(event.id)}
                onEditEventClick={() => onEditEventClick()}
                isMine={event.userId === user.userId}
                retrieveEvents={retrieveEvents}
              />
            </Fragment>
          )
      )}
    </>
  );
};

export default EventsList;
