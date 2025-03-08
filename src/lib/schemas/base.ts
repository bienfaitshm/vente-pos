import { z } from "zod";

// Schemas
export const NoEmptyStringSchemas = z.string().nonempty().trim();

export const IDSchemas = NoEmptyStringSchemas;

export const WithIdSchemas = z.object({
  id: IDSchemas,
});
