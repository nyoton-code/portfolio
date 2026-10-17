
import { loadProjects } from "./dataservice.js";

import {
    state,
    setProjects,
    setCategory,
    setSearchQuery
} from "./state.js";

import {
    renderStats,
    renderProjects,
    showError
} from "./view.js";

async function initPortfolio() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const searchInput = document.querySelector("#project-search");

    try {
        const projects = await loadProjects();

        setProjects(projects);

        renderStats();
        renderProjects();

        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                const category = button.dataset.category;

                setCategory(category);

                filterButtons.forEach(item => {
                    item.classList.toggle("active", item === button);
                });

                renderProjects();
            });
        });

        searchInput.addEventListener("input", event => {
            setSearchQuery(event.target.value);
            renderProjects();
        });

    } catch (error) {
        console.error("Portfolio loading error:", error);
        showError("Unable to load portfolio projects.");
    }
}

initPortfolio();
