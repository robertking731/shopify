function descAccordion_1() {
    const descAccordion1 = document.querySelectorAll(".read-more-accordion");
        console.log(descAccordion1);
        descAccordion1.forEach((accordion) => {
            accordion.onclick = function () {
                this.classList.toggle("is-open");
    
                let content = this.nextElementSibling;
    
                if (content.style.maxHeight) {
                    // if max-height is set, remove it to collapse the section
                    content.style.maxHeight = null;
                } else {
                    // set max-height to the scrollHeight to expand the section
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            };
        });
    }
    
    function customAccordion() {
        const accordionBlocks = document.querySelectorAll(".custom-accordion-block");
    
        accordionBlocks.forEach((accordion_block) => {
            let accordionBtns = accordion_block.querySelectorAll('.custom-accordion-header');
    
            accordionBtns.forEach((accordion) => {
                accordion.onclick = function () {
                    // Check if the clicked accordion is already open
                    let isAlreadyOpen = accordion.classList.contains("is-open");
    
                    // Close all other accordions
                    accordionBtns.forEach((btn) => {
                        btn.classList.remove("is-open");
                        let content = btn.nextElementSibling;
                        if (content) {
                            content.style.maxHeight = null;
                        }
                    });
    
                    // Toggle the clicked accordion only if it was not open already
                    if (!isAlreadyOpen) {
                        accordion.classList.add("is-open");
                        let content = accordion.nextElementSibling;
                        if (content) {
                            content.style.maxHeight = content.scrollHeight + "px";
                        }
                    } else {
                        // If it was already open, we've closed it in the forEach loop above
                        let content = accordion.nextElementSibling;
                        if (content) {
                            content.style.maxHeight = null;
                        }
                    }
                };
            });
        });
    }

    // window._klOnsite = window._klOnsite || [];
    // window._klOnsite.push(['openForm', 'X4VwbH']);

    customAccordion();
    descAccordion_1();