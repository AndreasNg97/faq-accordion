import { createClient } from "contentful";

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

export async function getFaqData() {
  try {
    const response = await client.getEntries({
      content_type: "accordion",
      include: 2,
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching FAQ data from contentful: ", error);
  }
}
