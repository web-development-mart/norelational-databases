const BASE = "http://localhost:3000";

function renderUsers(containerId, users) {
  const container = document.getElementById(containerId);

  if (users.length === 0) {
    container.innerHTML = '<p class="empty">No users found.</p>';
    return;
  }

  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "card";

    let html = "";

    const avatarSrc = user.avatar || "avatar.jpg";
    html += `<img class="card-avatar" src="${avatarSrc}" alt="${user.name}" />`;

    html += `<div class="card-body">`;
    html += `<h3>${user.name}</h3>`;

    if (user.address) {
      html += `<p class="address">${user.address.city}, ${user.address.country}</p>`;
    }

    if (Array.isArray(user.skills) && user.skills.length > 0) {
      html += `<div class="skills">`;
      user.skills.forEach((skill) => {
        html += `<span class="tag">${skill}</span>`;
      });
      html += `</div>`;
    }

    html += `</div>`;

    card.innerHTML = html;
    container.appendChild(card);
  });
}

function loadSection(endpoint, containerId) {
  fetch(`${BASE}${endpoint}`)
    .then((res) => res.json())
    .then((users) => renderUsers(containerId, users))
    .catch(() => {
      document.getElementById(containerId).innerHTML =
        `<p class="error">Could not load data. Is the server running on port 3000?</p>`;
    });
}

loadSection("/users",             "users");
loadSection("/users/from-france", "users-france");
loadSection("/users/skilled",     "users-skilled");
