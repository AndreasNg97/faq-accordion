import { getFaqData } from "./contentful.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("App initialized");

  // Fetching data from Contentful
  const faqData = await getFaqData();

  console.log("FAQ Data: ", faqData);
});
