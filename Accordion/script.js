document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const accordionSection = header.parentElement;
            const content = header.nextElementSibling;
            const icon = header.querySelector('.icon');

            // Toggle the section
            accordionSection.classList.toggle('active');
            content.classList.toggle('open');
            icon.classList.toggle('rotate');

            if (content.classList.contains('open')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = 0;
            }

            // Close all other sections if opened
            document.querySelectorAll('.accordion-section').forEach(section => {
                if (section !== accordionSection) {
                    section.classList.remove('active');
                    const otherContent = section.querySelector('.accordion-content');
                    const otherIcon = section.querySelector('.accordion-header .icon');
                    otherContent.classList.remove('open');
                    otherContent.style.maxHeight = 0;
                    otherIcon.classList.remove('rotate');
                }
            });
        });
    });
});
