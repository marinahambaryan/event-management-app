import { generateClient } from "aws-amplify/api";
import { listEvents } from "../graphql/queries";
import { createEvent, deleteEvent } from "../graphql/mutations";
import { CreateEventInput, DeleteEventInput } from "../API";

const client = generateClient();

export async function getEvents() {
  return (await client.graphql({ query: listEvents })).data.listEvents.items;
}

export async function addEvent({ name, description, date }: CreateEventInput) {
  await client.graphql({
    query: createEvent,
    variables: {
      input: { name, description, date },
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
