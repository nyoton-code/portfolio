
const DATA_URL = "./data/data.json";

export async function loadProjects() {
  const url = new URL(DATA_URL, document.baseURI);

  console.log("Current page:", window.location.href);
  console.log("JSON request URL:", url.href);

  const response = await fetch(url);

  console.log("Response status:", response.status);

  if (!response.ok) {
    throw new Error(`Failed to load projects: ${response.status}`);
  }

  const projects = await response.json();
  return projects;
}

