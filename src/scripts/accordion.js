export class Accordion {
  constructor(container, data) {
    this.container = container;
    this.data = data;
  }

  createAccordion() {
    const accordionItems = this.data[0].fields.accordionItems;

    accordionItems.forEach((item) => {
      const accordionItem = this.createAccordionItem(item);
      this.container.appendChild(accordionItem);
    });
  }

  createAccordionItem(item) {
    const accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");

    const accordionHeader = this.createAccordionHeader(item);
    const accordionContent = this.createAccordionContent(item);

    accordionItem.appendChild(accordionHeader);
    accordionItem.appendChild(accordionContent);

    return accordionItem;
  }

  createAccordionHeader(item) {
    const accordionHeader = document.createElement("button");
    accordionHeader.classList.add("accordion-header");
    accordionHeader.innerText = item.fields.name;
    accordionHeader.setAttribute("aria-expanded", "false");
    accordionHeader.setAttribute("aria-controls", item.fields.internalName);

    accordionHeader.addEventListener("click", () => {
      this.toggleAccordionContent(accordionHeader, item.fields.internalName);
    });

    accordionHeader.addEventListener("keydown", (event) => {
      this.handleKeyboardNavigation(event, item);
    });

    return accordionHeader;
  }

  createAccordionContent(item) {
    const accordionContent = document.createElement("div");
    accordionContent.classList.add("accordion-content");
    accordionContent.setAttribute("id", item.fields.internalName);
    accordionContent.innerHTML = `<p>${item.fields.text}</p>`;

    return accordionContent;
  }

  toggleAccordionContent(header, internalName) {
    const content = document.getElementById(internalName);
    const isActive = content.classList.contains("active");

    content.classList.toggle("active", !isActive);
    header.setAttribute("aria-expanded", !isActive);
    content.setAttribute("aria-hidden", isActive);
  }

  handleKeyboardNavigation(event, item) {
    const accordionItem = item;
    if (event.key === "ArrowDown") {
      const nextItem = accordionItem.nextElementSibling;
      if (nextItem) {
        nextItem.querySelector(".accordion-header").focus();
      }
    } else if (event.key === "ArrowUp") {
      const previousItem = accordionItem.previousElementSibling;
      if (previousItem) {
        previousItem.querySelector(".accordion-header").focus();
      }
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.toggleAccordionContent(event.target, item.fields.internalName);
    }
  }
}
