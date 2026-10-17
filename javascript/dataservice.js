
const DATA_URL = "../data/data.json";

export async function loadProjects() {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
        throw new Error(`Failed to load projects: ${response.status}`);
    }

    const projects = await response.json();

    return projects;
}

