// accordion.test.js
import { Accordion } from "../src/scripts/accordion.js";
import { waitFor } from "@testing-library/dom";

// Mock HTML structure
document.body.innerHTML = `
  <div class="accordion-container"></div>
`;

describe("Accordion", () => {
  let accordion;
  const mockData = [
    {
      fields: {
        name: "Question 1",
        internalName: "q1",
        text: "Answer 1",
        accordionItems: [
          {
            fields: {
              name: "Sub-question 1.1",
              internalName: "q1-1",
              text: "Sub-answer 1.1",
            },
          },
        ],
      },
    },
  ];

  beforeEach(() => {
    const container = document.querySelector(".accordion-container");
    accordion = new Accordion(container, mockData);
    accordion.createAccordion();
  });

  it("should create accordion items", () => {
    const accordionItems = document.querySelectorAll(".accordion-item");
    expect(accordionItems.length).toBe(1);
  });

  it("should expand the content on click", () => {
    const accordionHeader = document.querySelector(".accordion-header");
    const accordionContent = document.querySelector(".accordion-content");

    expect(accordionContent.classList.contains("active")).toBe(false);

    accordionHeader.click();

    expect(accordionContent.classList.contains("active")).toBe(true);

    accordionHeader.click();

    expect(accordionContent.classList.contains("active")).toBe(false);
  });

  it("should toggle aria-expanded attribute on click", async () => {
    const accordionHeader = document.querySelector(".accordion-header");

    await waitFor(() => {
      expect(accordionHeader.getAttribute("aria-expanded")).toBe("false");
    });

    accordionHeader.click();

    await waitFor(() => {
      expect(accordionHeader.getAttribute("aria-expanded")).toBe("true");
    });

    accordionHeader.click();
    await waitFor(() => {
      expect(accordionHeader.getAttribute("aria-expanded")).toBe("false");
    });
  });

  it("should handle keyboard navigation with arrow keys", () => {
    const firstItemHeader = document.querySelector(".accordion-header");
    firstItemHeader.focus();

    const keyboardEvent = new KeyboardEvent("keydown", {
      key: "ArrowDown",
    });

    document.dispatchEvent(keyboardEvent);

    const secondItemHeader = document.querySelectorAll(".accordion-header")[1];
    expect(document.activeElement).toStrictEqual(secondItemHeader);
  });

  it("should have correct ARIA roles", () => {
    const headers = document.querySelectorAll(".accordion-header");
    const contents = document.querySelectorAll(".accordion-content");

    headers.forEach((header) => {
      expect(header.getAttribute("role")).toBe("button");
    });

    contents.forEach((content) => {
      expect(content.getAttribute("role")).toBe("region");
    });
  });

  it("should toggle aria-hidden attribute correctly", async () => {
    const accordionHeader = document.querySelector(".accordion-header");
    const accordionContent = document.getElementById("q1-1");

    expect(accordionContent.getAttribute("aria-hidden")).toBe("true");

    accordionHeader.click();

    await waitFor(() => {
      expect(accordionContent.getAttribute("aria-hidden")).toBe("false");
    });

    accordionHeader.click();

    await waitFor(() => {
      expect(accordionContent.getAttribute("aria-hidden")).toBe("true");
    });
  });
});
