import { generateClient } from "aws-amplify/api";
import { listEvents } from "../graphql/queries";
import { createEvent, deleteEvent, updateEvent } from "../graphql/mutations";
import { CreateEventInput, DeleteEventInput, UpdateEventInput } from "../API";

const client = generateClient();

export async function getEvents() {
  return (await client.graphql({ query: listEvents })).data.listEvents.items;
}

export async function addEvent({
  name,
  description,
  date,
  userId,
}: CreateEventInput) {
  await client.graphql({
    query: createEvent,
    variables: {
      input: { name, description, date, userId },
    },
  });
}

export async function removeEvent({ id }: DeleteEventInput) {
  await client.graphql({
    query: deleteEvent,
    variables: {
      input: { id },
    },
  });
}

export async function editEvent(data: UpdateEventInput) {
  await client.graphql({
    query: updateEvent,
    variables: {
      input: data,
    },
  });
}
