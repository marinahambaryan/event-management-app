/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateEvent = /* GraphQL */ `subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
  onCreateEvent(filter: $filter) {
    id
    name
    description
    date
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateEventSubscriptionVariables,
  APITypes.OnCreateEventSubscription
>;
export const onUpdateEvent = /* GraphQL */ `subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
  onUpdateEvent(filter: $filter) {
    id
    name
    description
    date
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateEventSubscriptionVariables,
  APITypes.OnUpdateEventSubscription
>;
export const onDeleteEvent = /* GraphQL */ `subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
  onDeleteEvent(filter: $filter) {
    id
    name
    description
    date
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteEventSubscriptionVariables,
  APITypes.OnDeleteEventSubscription
>;
