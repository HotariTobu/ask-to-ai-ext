import { createEvent } from "@/utils/createEvent";

export const [useSubmitTrigger, useSubmitCallback] = createEvent<[], Promise<void>>()
