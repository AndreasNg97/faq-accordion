import { getFaqData } from "./contentful.js";
import { Accordion } from "./accordion.js";

async function displayAccordion() {
  try {
    const faqData = await getFaqData();
    const accordionContainer = document.querySelector(".accordion-container");

    const accordion = new Accordion(accordionContainer, faqData);
    accordion.createAccordion();
  } catch (error) {
    console.error("Error fetching FAQ data: ", error);
  }
}

displayAccordion();
