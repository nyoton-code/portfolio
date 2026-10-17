
import { state, getVisibleProjects } from "./state.js";

const grid = document.querySelector("#portfolio-grid");
const errorMessage = document.querySelector("#portfolio-error");

function createProjectCard(project) {
  const image = project.image
    ? `<img src="${project.image}" alt="${project.name}" loading="lazy">`
    : `<div class="project-image-placeholder">Project preview coming soon</div>`;

  const liveLink = project.liveUrl
    ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
    : "";

  return `
    <div class="col-12 col-md-6">
      <article class="project-card h-100">
        <div class="project-image">
          ${image}
          <div class="project-overlay">
            ${liveLink}
          </div>
        </div>

        <div class="project-content">
          <span>${project.category}</span>
          <h4>${project.name}</h4>
          <p>${project.description}</p>

          <div class="project-technologies">
            ${(project.technologies || [])
      .map(technology => `<span>${technology}</span>`)
      .join("")}
          </div>
        </div>
      </article>
    </div>
  `;
}

export function renderStats() {
  const projects = state.projects;
  const technologies = new Set(
    projects.flatMap(project => project.technologies || [])
  );

  document.querySelector("#total-projects").textContent = projects.length;
  document.querySelector("#total-technologies").textContent = technologies.size;
  document.querySelector("#total-demos").textContent =
    projects.filter(project => project.liveUrl?.trim()).length;
}

export function renderProjects() {
  const projects = getVisibleProjects();

  errorMessage.hidden = true;

  if (projects.length === 0) {
    grid.innerHTML = `
      <div class="col-12">
        <p class="portfolio-message">
          No projects found. Try another search or category.
        </p>
      </div>
    `;
    return;
  }

  grid.innerHTML = projects.map(createProjectCard).join("");
}

export function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;

  grid.innerHTML = `
    <div class="col-12">
      <p class="portfolio-message">
        Projects could not be loaded. Please try again later.
      </p>
    </div>
  `;
}
