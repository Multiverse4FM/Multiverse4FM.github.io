/**
* Template Name: TheEvent
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/theevent-conference-event-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Gallery Slider
   */
  new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Buy tickets select the ticket type on click
   */
  on('show.bs.modal', '#buy-ticket-modal', function(event) {
    select('#buy-ticket-modal #ticket-type').value = event.relatedTarget.getAttribute('data-ticket-type')
  })

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Multiverse 1K Plain Text Highlighter (Final Styling Updates)
   */
  const escapeHTML = (str) => {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;');
  };

  // Helper function to iteratively process <Path> blocks for nesting
  const iterativePathFormatter = (textSegment) => {
    let currentHtml = textSegment;
    let previousHtml = "";
    const MAX_DEPTH_PROCESSING = 5; // Safety limit for iterations
    let iterations = 0;

    while (currentHtml !== previousHtml && iterations < MAX_DEPTH_PROCESSING) {
      previousHtml = currentHtml;
      currentHtml = currentHtml.replace(
        /&lt;Path&gt;([\s\S]*?)&lt;\/Path&gt;/g,
        (match, pathContent) => {
          return `<div class="path-content-block">&lt;!--TEMP_PATH_OPEN_INSIDE--&gt;${pathContent}&lt;!--TEMP_PATH_CLOSE_INSIDE--&gt;</div>`;
        }
      );
      iterations++;
    }
    return currentHtml;
  };

  // New reusable function to fetch, process, and display the file content
  const displayFileContent = (filePath) => {
    const displayContainer = select('#xml-display-container');
    if (!displayContainer) {
      console.error('XML display container not found on page.');
      return;
    }
    displayContainer.innerHTML = '<p>Loading content...</p>'; // Show loading message

    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error(`Could not fetch ${filePath}. File not found or error reading.`);
        return response.text();
      })
      .then(rawText => {
        displayContainer.innerHTML = ''; // Clear loading message or previous content

        const generationDiv = document.createElement('div');
        generationDiv.className = 'generation';
        
        let htmlString = escapeHTML(rawText);
        htmlString = htmlString.replace(/&lt;Think&gt;/g, '').replace(/&lt;\/Think&gt;/g, '');
        
        htmlString = iterativePathFormatter(htmlString); // Process Path blocks
        
        // Replace temporary Path markers with styled spans
        htmlString = htmlString.replace(/&lt;!--TEMP_PATH_OPEN_INSIDE--&gt;/g, `<span class="tag-highlight tag-path path-tag-open">&lt;Path&gt;</span>`);
        htmlString = htmlString.replace(/&lt;!--TEMP_PATH_CLOSE_INSIDE--&gt;/g, `<span class="tag-highlight tag-path path-tag-close">&lt;/Path&gt;</span>`);

        // Highlight all other specified "tags"
        const otherTagsToHighlight = {
          'Parallel': 'tag-parallel',
          'Goal': 'tag-goal',
          'Conclusion': 'tag-conclusion',
          'Outline': 'tag-outline'
        };

        for (const tagName in otherTagsToHighlight) {
          const className = otherTagsToHighlight[tagName];
          const tagRegex = new RegExp(`&lt;(\/?${tagName})&gt;`, 'g');
          htmlString = htmlString.replace(tagRegex, (match, actualTag) => {
              return `<span class="tag-highlight ${className}">&lt;${actualTag}&gt;</span>`;
          });
        }
        
        generationDiv.innerHTML = htmlString;
        displayContainer.appendChild(generationDiv);

        if (window.MathJax) {
          window.MathJax.typesetPromise([generationDiv]).catch(err => console.error('MathJax Typesetting Error:', err));
        }
      })
      .catch(error => {
        if (displayContainer) { // Check if container still exists
            displayContainer.innerHTML = `<p style="color: red;">Error loading ${filePath}: ${error.message}</p>`;
        }
        console.error(`Error processing file ${filePath}:`, error);
      });
  };

  /**
   * Multiverse 1K UI Initialization
   */
  const selector = select('#xml-selector');
  if (selector) {
    // Populate selector
    for (let i = 1; i <= 100; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `Example ${i}`;
      selector.appendChild(option);
    }

    // Event listener for the view button
    on('click', '#view-button', function() {
      const selectedId = selector.value;
      const displayContainer = select('#xml-display-container');

      if (!selectedId) {
        if(displayContainer) displayContainer.innerHTML = '<p>Please select an example to view.</p>';
        return;
      }
      const filePathToLoad = `assets/data/${selectedId}.xml`;
      displayFileContent(filePathToLoad); // Call the reusable function
    });

    // Automatically load and display demo.xml on page load
    const defaultFilePath = 'assets/data/demo.xml';
    // Ensure the container exists before trying to load default content
    if (select('#xml-display-container')) {
        displayFileContent(defaultFilePath);
    }
  }

})()