import z from "zod";

export const MentalState = z.object({
  levels: z.array(z.object({ name: z.string(), value: z.number() })),
  status: z.string(),
  tags: z.array(z.string()),
  lastUpdated: z.number(),
});

export type MentalState = z.infer<typeof MentalState>;

export const fetchData = async (): Promise<MentalState> => {
  const response = await fetch("/data.json");
  const json = await response.json();

  const result = MentalState.safeParse(json);
  if (!result.success) {
    console.error(result.error.format());
    throw new Error("Invalid mental state data");
  }

  return result.data;
};
