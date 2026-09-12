/**
 * PLACED — Career Readiness Operating System
 * Master JavaScript Engine (Vanilla JS, Modular, Production-Grade)
 * "INFINITE POSSIBILITIES. DEFINITE OUTCOME."
 */

"use strict";

(function () {
  // DOM Helper Utilities
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  /* 0. PAGE PRELOADER (Infinite Roaming Sky Blue Symbol) */
  const PreloaderModule = {
    init() {
      const loader = $("#pageLoader");
      if (!loader) return;

      const dismiss = () => {
        setTimeout(() => {
          loader.classList.add("is-hidden");
          setTimeout(() => {
            if (loader && loader.parentNode) {
              loader.parentNode.removeChild(loader);
            }
          }, 500);
        }, 650);
      };

      if (document.readyState === "complete") {
        dismiss();
      } else {
        window.addEventListener("load", dismiss);
        setTimeout(dismiss, 2200);
      }
    }
  };

  /* 1. THEME ENGINE (Dark / Light Mode) */
  const ThemeModule = {
    STORAGE_KEY: "placed-theme",

    init() {
      const toggleBtns = $$("[data-theme-toggle]");
      const savedTheme = localStorage.getItem(this.STORAGE_KEY);
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

      this.applyTheme(initialTheme);

      toggleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          const currentTheme = document.documentElement.dataset.theme || "light";
          const nextTheme = currentTheme === "dark" ? "light" : "dark";
          this.applyTheme(nextTheme);
        });
      });

      // Listen for system changes if no explicit user preference is stored
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.applyTheme(e.matches ? "dark" : "light");
        }
      });
    },

    applyTheme(theme) {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem(this.STORAGE_KEY, theme);

      // Update toggle button aria and icon states
      const toggleBtns = $$("[data-theme-toggle]");
      toggleBtns.forEach(btn => {
        btn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
        const sunIcon = $(".icon-sun", btn);
        const moonIcon = $(".icon-moon", btn);
        if (sunIcon && moonIcon) {
          if (theme === "dark") {
            sunIcon.style.display = "block";
            moonIcon.style.display = "none";
          } else {
            sunIcon.style.display = "none";
            moonIcon.style.display = "block";
          }
        }
      });
    }
  };

  /* 2. MOBILE NAVIGATION DRAWER */
  const MobileNavModule = {
    init() {
      const toggleBtn = $("#mobileToggleBtn");
      const overlay = $("#mobileNavOverlay");
      if (!toggleBtn || !overlay) return;

      const links = $$(".nav-link", overlay);

      const openNav = () => {
        toggleBtn.classList.add("is-active");
        toggleBtn.setAttribute("aria-expanded", "true");
        overlay.classList.add("is-open");
        document.body.classList.add("nav-locked");
      };

      const closeNav = () => {
        toggleBtn.classList.remove("is-active");
        toggleBtn.setAttribute("aria-expanded", "false");
        overlay.classList.remove("is-open");
        document.body.classList.remove("nav-locked");
      };

      toggleBtn.addEventListener("click", () => {
        const isOpen = overlay.classList.contains("is-open");
        if (isOpen) closeNav();
        else openNav();
      });

      // Close when clicking any nav link
      links.forEach(link => {
        link.addEventListener("click", closeNav);
      });

      // Close on Escape key
      window.addEventListener("keydown", e => {
        if (e.key === "Escape" && overlay.classList.contains("is-open")) {
          closeNav();
          toggleBtn.focus();
        }
      });
    }
  };

  /* 3. SCROLL REVEAL (IntersectionObserver) */
  const RevealModule = {
    init() {
      const elements = $$(".reveal-on-scroll");
      if (!elements.length) return;

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

        elements.forEach(el => observer.observe(el));
      } else {
        elements.forEach(el => el.classList.add("is-revealed"));
      }
    }
  };

  /* 4. ANIMATED STAT COUNTERS */
  const CountersModule = {
    init() {
      const section = $("#statsSection");
      const counters = $$(".stat-number[data-target]");
      if (!section || !counters.length) return;

      let started = false;

      const runCounters = () => {
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute("data-target"));
          const suffix = counter.getAttribute("data-suffix") || "";
          const duration = 1800;
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * target);

            counter.textContent = currentVal + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + suffix;
            }
          };

          requestAnimationFrame(updateCounter);
        });
      };

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
              started = true;
              runCounters();
              observer.disconnect();
            }
          });
        }, { threshold: 0.3 });

        observer.observe(section);
      } else {
        runCounters();
      }
    }
  };

  /* 5. 7-PHASE ARCHITECTURE ORBITAL WHEEL */
  const PhaseWheelModule = {
    phasesData: [
      {
        id: "01",
        title: "Skill Benchmarking",
        desc: "Establishing diagnostic starting points for aptitude, technical logic, workplace communication, and real-time execution.",
        tags: ["Diagnostic Assessment", "Aptitude Baseline", "Communication Audit"]
      },
      {
        id: "02",
        title: "Foundational Upskilling",
        desc: "Building the core conceptual, analytical, and problem-solving muscles mapped strictly to your target career or exam pathway.",
        tags: ["Core Competency", "Curated Modules", "Structured Learning"]
      },
      {
        id: "03",
        title: "Applied Practice",
        desc: "Turning concepts into repeatable problem-solving and communication habits through active drills, challenges, and peer sprints.",
        tags: ["Daily Drills", "Case Studies", "Habit Formation"]
      },
      {
        id: "04",
        title: "Mentor Feedback",
        desc: "Using expert industry context to identify micro-gaps, algorithmic shortcuts, interview blind spots, and refined approaches.",
        tags: ["1-on-1 Reviews", "Gap Analysis", "Industry Insights"]
      },
      {
        id: "05",
        title: "Mock Recruitment",
        desc: "Practicing with realistic time pressure, algorithmic coding rounds, group discussions, and high-stakes panel interviews.",
        tags: ["Timed Simulations", "GD Mastery", "HR & Tech Panels"]
      },
      {
        id: "06",
        title: "Performance Review",
        desc: "Translating scores, simulation logs, and mentor remarks into a prioritized, sprint-based calibration roadmap.",
        tags: ["Data Scorecard", "Iterative Tuning", "Readiness Metric"]
      },
      {
        id: "07",
        title: "Outcome Launch",
        desc: "Moving into final placement drives, public exam sittings, or higher-study admissions with validated, measurable confidence.",
        tags: ["Campus Drives", "Corporate Openings", "Definite Outcome"]
      }
    ],

    init() {
      const container = $("#phaseSystemContainer");
      if (!container) return;

      const nodes = $$(".phase-node-btn", container);
      const titleEl = $("#phaseDisplayTitle");
      const descEl = $("#phaseDisplayDesc");
      const numEl = $("#phaseNumberDisplay");
      const stepEl = $("#phaseStepIndicator");
      const tagsContainer = $("#phaseMetaTags");

      const selectPhase = (phaseId) => {
        const data = this.phasesData.find(p => p.id === phaseId);
        if (!data) return;

        // Update active node state
        nodes.forEach(node => {
          const isActive = node.getAttribute("data-phase") === phaseId;
          node.classList.toggle("is-active", isActive);
          node.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        // Update center panel display with smooth fade
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;
        if (numEl) numEl.textContent = data.id;
        if (stepEl) stepEl.textContent = `PHASE ${data.id} OF 07`;

        if (tagsContainer) {
          tagsContainer.innerHTML = data.tags
            .map(t => `<span class="phase-tag">${t}</span>`)
            .join("");
        }
      };

      // Position nodes in an orbit circle on desktop
      this.positionNodes(nodes);

      nodes.forEach(node => {
        node.addEventListener("click", () => {
          const phaseId = node.getAttribute("data-phase");
          selectPhase(phaseId);
        });
      });

      // Handle window resize for repositioning
      window.addEventListener("resize", () => {
        this.positionNodes(nodes);
      });
    },

    positionNodes(nodes) {
      const stage = $("#phaseOrbitStage");
      if (!stage) return;

      const radius = stage.offsetWidth / 2 - 35;
      const centerX = stage.offsetWidth / 2;
      const centerY = stage.offsetHeight / 2;
      const total = nodes.length;

      nodes.forEach((node, i) => {
        // Start from top (-90 deg) and proceed clockwise
        const angle = ((i / total) * 360 - 90) * (Math.PI / 180);
        const x = centerX + radius * Math.cos(angle) - (node.offsetWidth / 2);
        const y = centerY + radius * Math.sin(angle) - (node.offsetHeight / 2);

        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
      });
    }
  };

  /* 6. MENTOR DIRECTORY (Filtering & Modal Dialog) */
  const MentorsModule = {
    mentorsData: {
      "abhishek": {
        name: "A S Abhishek",
        role: "Head of Communication & Soft Skills Architecture",
        category: "Communication",
        bio: "Specializing in corporate diction, presentation articulation, and group discussion dynamics. Oversees the communication readiness benchmarks across all PLACED cohort tracks.",
        experience: "Ex-Corporate Trainer, Speech Strategist",
        focus: ["Public Speaking", "Executive Presence", "GD Articulation", "Stress Interviews"]
      },
      "vishnu": {
        name: "Vishnu Mohan R",
        role: "Director of Career Strategy & Corporate Outreach",
        category: "Career",
        bio: "Connects students with real-world enterprise expectations. Designs recruitment roadmaps and personalized positioning strategies for premier corporate placement drives.",
        experience: "Career Advisor, Talent Acquisition Consultant",
        focus: ["Resume Engineering", "Company Profiling", "Offer Negotiation", "Career Mapping"]
      },
      "vigneswaran": {
        name: "Vigneswaran A R",
        role: "Chief Aptitude Strategist & Quantitative Architect",
        category: "Aptitude",
        bio: "Pioneers the speed-math, logical reasoning, and data interpretation curricula. Creator of high-velocity problem-solving frameworks for competitive exams and tech recruitment.",
        experience: "Quantitative Coach, Test Prep Specialist",
        focus: ["Speed Mathematics", "Critical Reasoning", "Analytical Thinking", "Timed Speed Tests"]
      },
      "prem": {
        name: "Prem Kumar",
        role: "Senior Engineering & Technical Mock Lead",
        category: "Career",
        bio: "Conducts live technical interview simulations, system architecture problem breakdowns, and real-time coding assessments tailored to leading tech firms.",
        experience: "Principal Engineer & Interview Evaluator",
        focus: ["Algorithmic Problem Solving", "Code Reviews", "System Design Basics", "Tech HR Round"]
      },
      "anoushka": {
        name: "Anoushka Sen",
        role: "Verbal Ability & Global Examination Coach",
        category: "Communication",
        bio: "Prepares candidates for corporate verbal aptitude, vocabulary nuance, comprehension speed, and international institutional entry evaluations.",
        experience: "Language Specialist, Verbal Evaluator",
        focus: ["Reading Comprehension", "Grammar Logic", "Verbal Aptitude", "Accent Neutrality"]
      },
      "anantha": {
        name: "Ananthakrishnan K",
        role: "Public Examination & Civil Services Mentor",
        category: "Aptitude",
        bio: "Specializes in analytical reasoning, general mental ability, and structured exam strategies for national and state public recruitment commissions.",
        experience: "Public Sector Exam Specialist",
        focus: ["Logical Reasoning", "Exam Temperament", "Syllabus Deconstruction", "Accuracy Metrics"]
      }
    },

    init() {
      const filterBtns = $$(".filter-btn");
      const cards = $$(".mentor-card[data-category]");
      const modal = $("#mentorModal");

      // Filter tabs
      filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          filterBtns.forEach(b => b.classList.remove("is-active"));
          btn.classList.add("is-active");

          const target = btn.getAttribute("data-filter");

          cards.forEach(card => {
            const cardCat = card.getAttribute("data-category");
            if (target === "all" || cardCat === target) {
              card.style.display = "flex";
            } else {
              card.style.display = "none";
            }
          });
        });
      });

      // Modal Triggers
      if (modal) {
        const closeBtn = $("#modalCloseBtn", modal);
        const modalName = $("#modalMentorName", modal);
        const modalRole = $("#modalMentorRole", modal);
        const modalCat = $("#modalMentorCategory", modal);
        const modalBio = $("#modalMentorBio", modal);
        const modalTags = $("#modalMentorFocus", modal);

        const openModal = (mentorKey) => {
          const mentor = this.mentorsData[mentorKey];
          if (!mentor) return;

          if (modalName) modalName.textContent = mentor.name;
          if (modalRole) modalRole.textContent = mentor.role;
          if (modalCat) modalCat.textContent = mentor.category;
          if (modalBio) modalBio.textContent = mentor.bio;

          if (modalTags) {
            modalTags.innerHTML = mentor.focus
              .map(f => `<span class="phase-tag">${f}</span>`)
              .join("");
          }

          modal.classList.add("is-active");
          modal.setAttribute("aria-hidden", "false");
          document.body.classList.add("nav-locked");
          if (closeBtn) closeBtn.focus();
        };

        const closeModal = () => {
          modal.classList.remove("is-active");
          modal.setAttribute("aria-hidden", "true");
          document.body.classList.remove("nav-locked");
        };

        $$("[data-mentor-modal]").forEach(btn => {
          btn.addEventListener("click", () => {
            const mentorKey = btn.getAttribute("data-mentor-modal");
            openModal(mentorKey);
          });
        });

        if (closeBtn) closeBtn.addEventListener("click", closeModal);

        modal.addEventListener("click", e => {
          if (e.target === modal) closeModal();
        });

        window.addEventListener("keydown", e => {
          if (e.key === "Escape" && modal.classList.contains("is-active")) {
            closeModal();
          }
        });
      }
    }
  };

  /* 7. ALUMNI TESTIMONIAL SLIDER / CAROUSEL */
  const AlumniSliderModule = {
    init() {
      const slider = $("#alumniCarousel");
      if (!slider) return;

      const track = $(".carousel-track", slider);
      const slides = $$(".carousel-slide", slider);
      const prevBtn = $("#carouselPrevBtn", slider);
      const nextBtn = $("#carouselNextBtn", slider);
      const dotsContainer = $("#carouselDots", slider);

      if (!slides.length) return;

      let currentIndex = 0;
      let autoplayTimer = null;

      // Generate pagination dots
      if (dotsContainer) {
        dotsContainer.innerHTML = slides
          .map((_, i) => `<button class="carousel-dot ${i === 0 ? "is-active" : ""}" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>`)
          .join("");
      }

      const dots = $$(".carousel-dot", dotsContainer);

      const updateSlider = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        if (track) {
          track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        dots.forEach((dot, i) => {
          dot.classList.toggle("is-active", i === currentIndex);
        });
      };

      const nextSlide = () => updateSlider(currentIndex + 1);
      const prevSlide = () => updateSlider(currentIndex - 1);

      const startAutoplay = () => {
        stopAutoplay();
        autoplayTimer = setInterval(nextSlide, 6000);
      };

      const stopAutoplay = () => {
        if (autoplayTimer) {
          clearInterval(autoplayTimer);
          autoplayTimer = null;
        }
      };

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          nextSlide();
          startAutoplay();
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          prevSlide();
          startAutoplay();
        });
      }

      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          updateSlider(i);
          startAutoplay();
        });
      });

      // Pause on hover or focus
      slider.addEventListener("mouseenter", stopAutoplay);
      slider.addEventListener("mouseleave", startAutoplay);
      slider.addEventListener("focusin", stopAutoplay);
      slider.addEventListener("focusout", startAutoplay);

      // Keyboard arrow navigation
      slider.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft") {
          prevSlide();
          startAutoplay();
        } else if (e.key === "ArrowRight") {
          nextSlide();
          startAutoplay();
        }
      });

      startAutoplay();
    }
  };

  /* 8. FAQ ACCORDION */
  const FAQModule = {
    init() {
      const accordionItems = $$(".accordion-item");
      if (!accordionItems.length) return;

      accordionItems.forEach(item => {
        const btn = $(".accordion-header-btn", item);
        const content = $(".accordion-content", item);
        const icon = $(".accordion-icon", item);

        if (!btn || !content) return;

        btn.addEventListener("click", () => {
          const isOpen = item.classList.contains("is-open");

          // Close all items
          accordionItems.forEach(otherItem => {
            otherItem.classList.remove("is-open");
            const otherBtn = $(".accordion-header-btn", otherItem);
            const otherContent = $(".accordion-content", otherItem);
            const otherIcon = $(".accordion-icon", otherItem);
            if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
            if (otherContent) otherContent.style.maxHeight = null;
            if (otherIcon) otherIcon.textContent = "+";
          });

          // Toggle current if it was closed
          if (!isOpen) {
            item.classList.add("is-open");
            btn.setAttribute("aria-expanded", "true");
            content.style.maxHeight = content.scrollHeight + "px";
            if (icon) icon.textContent = "−";
          }
        });
      });
    }
  };

  /* 9. CONTACT FORM HANDLING */
  const ContactFormModule = {
    init() {
      const form = $("#placedContactForm");
      if (!form) return;

      const banner = $("#formStatusBanner");

      form.addEventListener("submit", e => {
        e.preventDefault();

        const name = $("#contactName")?.value.trim();
        const email = $("#contactEmail")?.value.trim();
        const role = $("#contactRole")?.value;
        const message = $("#contactMessage")?.value.trim();

        if (!name || !email || !message) {
          if (banner) {
            banner.className = "form-status-banner is-active is-demo";
            banner.style.backgroundColor = "rgba(239, 68, 68, 0.12)";
            banner.style.borderColor = "rgba(239, 68, 68, 0.4)";
            banner.innerHTML = "<strong>Please fill in all required fields</strong> (Name, Email, and Message).";
          }
          return;
        }

        // Demo feedback message
        if (banner) {
          banner.className = "form-status-banner is-active is-demo";
          banner.style.backgroundColor = "rgba(25, 185, 196, 0.12)";
          banner.style.borderColor = "var(--teal)";
          banner.innerHTML = `
            <strong>Enquiry Preview Created (Local Demo Mode)</strong><br>
            Thank you, <em>${name}</em>. Your enquiry for role category <strong>${role || "General"}</strong> has been recorded in client demo mode.<br>
            <small class="text-muted" style="margin-top: 0.4rem; display: block;">
              Note: Connect this form to Netlify Forms, Formspree, EmailJS, or your company API endpoint for production email dispatch.
            </small>
          `;
          form.reset();
        }
      });
    }
  };

  /* 10. FLOATING BACK-TO-TOP BUTTON */
  const BackToTopModule = {
    init() {
      const btn = $("#backToTopBtn");
      if (!btn) return;

      const checkScroll = () => {
        if (window.scrollY > 700) {
          btn.classList.add("is-visible");
        } else {
          btn.classList.remove("is-visible");
        }
      };

      window.addEventListener("scroll", checkScroll, { passive: true });

      btn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }
  };

  /* 11. MASTER INITIALIZATION BOOTSTRAP */
  function boot() {
    PreloaderModule.init();
    ThemeModule.init();
    MobileNavModule.init();
    RevealModule.init();
    CountersModule.init();
    PhaseWheelModule.init();
    MentorsModule.init();
    AlumniSliderModule.init();
    FAQModule.init();
    ContactFormModule.init();
    BackToTopModule.init();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
