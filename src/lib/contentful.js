import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function fetchDataByCMSEntryID(DataID) {
  const res = await client.getEntry(DataID);
  return res.fields;
}


