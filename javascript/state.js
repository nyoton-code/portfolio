
export const state = {
    projects: [],
    category: "All",
    searchQuery: ""
};

export function setProjects(projects) {
    state.projects = projects;
}

export function setCategory(category) {
    state.category = category;
}

export function setSearchQuery(query) {
    state.searchQuery = query;
}


export function getVisibleProjects() {
    const query = state.searchQuery.trim().toLowerCase();

    return state.projects
        .filter(project =>
            state.category === "All" ||
            project.category === state.category
        )
        .filter(project => {
            const searchableText = [
                project.name,
                project.description,
                project.category,
                ...(project.technologies || [])
            ].join(" ").toLowerCase();

            return searchableText.includes(query);
        });
}
