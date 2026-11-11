const BASE = "http://localhost:3000";

let allPosts = [];
let allUsers = [];

// --- Helpers ---

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

// --- Modal (user details) ---

const overlay = document.getElementById("modal-overlay");
const modalContent = document.getElementById("modal-content");

document.getElementById("modal-close").addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

function openUserModal(user) {
  const avatarSrc = user.avatar || "avatar.jpg";
  let html = "";

  html += `<img class="modal-avatar" src="${esc(avatarSrc)}" alt="${esc(user.name)}" />`;
  html += `<div class="modal-body">`;
  html += `<h3>${esc(user.name)}</h3>`;
  html += `<p class="address">${esc(user.email)}</p>`;

  if (user.address) {
    html += `<p class="address">${esc(user.address.city)}, ${esc(user.address.country)}</p>`;
  }

  if (Array.isArray(user.skills) && user.skills.length > 0) {
    html += `<div class="skills">`;
    user.skills.forEach((s) => { html += `<span class="tag">${esc(s)}</span>`; });
    html += `</div>`;
  }

  html += `</div>`;

  const userPosts = allPosts.filter((p) => p.author?._id === user._id);
  html += `<div class="modal-posts">`;
  html += `<h4 class="modal-posts-title">Posts</h4>`;
  if (userPosts.length === 0) {
    html += `<p class="empty">No posts yet.</p>`;
  } else {
    userPosts.forEach((post) => {
      html += `<div class="modal-post">`;
      html += `<p class="modal-post-title">${esc(post.title)}</p>`;
      html += `<p class="address">${formatDate(post.createdAt)}</p>`;
      if (Array.isArray(post.tags) && post.tags.length > 0) {
        html += `<div class="skills">`;
        post.tags.forEach((t) => { html += `<span class="tag">${esc(t)}</span>`; });
        html += `</div>`;
      }
      html += `</div>`;
    });
  }
  html += `</div>`;

  modalContent.innerHTML = html;
  overlay.classList.add("open");
}

function closeModal() {
  overlay.classList.remove("open");
}

// --- Create modal ---

document.getElementById("new-post-btn").addEventListener("click", openCreateModal);

function openCreateModal() {
  let authorOptions = allUsers
    .map((u) => `<option value="${esc(u._id)}">${esc(u.name)}</option>`)
    .join("");

  let html = `<div class="modal-body modal-body--full">`;
  html += `<h3>New post</h3>`;
  html += `<form id="create-form">`;
  html += `<div class="form-group">`;
  html += `<label for="create-author">Author</label>`;
  html += `<select id="create-author">${authorOptions}</select>`;
  html += `</div>`;
  html += `<div class="form-group">`;
  html += `<label for="create-title">Title</label>`;
  html += `<input id="create-title" type="text" required />`;
  html += `</div>`;
  html += `<div class="form-group">`;
  html += `<label for="create-content">Content</label>`;
  html += `<textarea id="create-content" rows="4"></textarea>`;
  html += `</div>`;
  html += `<div class="form-group">`;
  html += `<label for="create-tags">Tags <span class="form-hint">(comma-separated)</span></label>`;
  html += `<input id="create-tags" type="text" />`;
  html += `</div>`;
  html += `<div class="form-actions">`;
  html += `<button type="submit" class="btn btn-save">Create</button>`;
  html += `<button type="button" class="btn btn-cancel">Cancel</button>`;
  html += `</div>`;
  html += `</form>`;
  html += `</div>`;

  modalContent.innerHTML = html;
  overlay.classList.add("open");

  modalContent.querySelector(".btn-cancel").addEventListener("click", closeModal);

  modalContent.querySelector("#create-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const body = {
      author:  document.getElementById("create-author").value,
      title:   document.getElementById("create-title").value.trim(),
      content: document.getElementById("create-content").value.trim(),
      tags:    document.getElementById("create-tags").value
                 .split(",").map((t) => t.trim()).filter(Boolean),
    };
    fetch(`${BASE}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((created) => {
        allPosts.unshift(created);
        const container = document.getElementById("posts");
        const card = document.createElement("div");
        card.className = "card post-card";
        card.innerHTML = buildPostCardHTML(created);
        attachPostCardListeners(created, card);
        container.prepend(card);
        closeModal();
      })
      .catch(() => alert("Could not create post."));
  });
}

// --- Edit modal ---

function openEditModal(post, cardEl) {
  const tagsValue = Array.isArray(post.tags) ? post.tags.join(", ") : "";

  let html = `<div class="modal-body modal-body--full">`;
  html += `<h3>Edit post</h3>`;
  html += `<form id="edit-form">`;
  html += `<div class="form-group">`;
  html += `<label for="edit-title">Title</label>`;
  html += `<input id="edit-title" type="text" value="${esc(post.title)}" required />`;
  html += `</div>`;
  html += `<div class="form-group">`;
  html += `<label for="edit-content">Content</label>`;
  html += `<textarea id="edit-content" rows="4">${esc(post.content)}</textarea>`;
  html += `</div>`;
  html += `<div class="form-group">`;
  html += `<label for="edit-tags">Tags <span class="form-hint">(comma-separated)</span></label>`;
  html += `<input id="edit-tags" type="text" value="${esc(tagsValue)}" />`;
  html += `</div>`;
  html += `<div class="form-actions">`;
  html += `<button type="submit" class="btn btn-save">Save</button>`;
  html += `<button type="button" class="btn btn-cancel">Cancel</button>`;
  html += `</div>`;
  html += `</form>`;
  html += `</div>`;

  modalContent.innerHTML = html;
  overlay.classList.add("open");

  modalContent.querySelector(".btn-cancel").addEventListener("click", closeModal);

  modalContent.querySelector("#edit-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const body = {
      title:   document.getElementById("edit-title").value.trim(),
      content: document.getElementById("edit-content").value.trim(),
      tags:    document.getElementById("edit-tags").value
                 .split(",").map((t) => t.trim()).filter(Boolean),
    };
    fetch(`${BASE}/posts/${post._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((saved) => {
        const idx = allPosts.findIndex((p) => p._id === post._id);
        if (idx !== -1) allPosts[idx] = saved;
        updatePostCard(saved, cardEl);
        closeModal();
      })
      .catch(() => alert("Could not save changes."));
  });
}

// --- Delete ---

function deletePost(id, cardEl) {
  if (!confirm("Delete this post? This cannot be undone.")) return;
  fetch(`${BASE}/posts/${id}`, { method: "DELETE" })
    .then((res) => { if (!res.ok) throw new Error(); })
    .then(() => {
      allPosts = allPosts.filter((p) => p._id !== id);
      cardEl.remove();
    })
    .catch(() => alert("Could not delete post."));
}

// --- Users ---

function renderUsers(containerId, users) {
  const container = document.getElementById(containerId);

  if (users.length === 0) {
    container.innerHTML = '<p class="empty">No users found.</p>';
    return;
  }

  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "card card-clickable";

    let html = "";
    const avatarSrc = user.avatar || "avatar.jpg";
    html += `<img class="card-avatar" src="${esc(avatarSrc)}" alt="${esc(user.name)}" />`;
    html += `<div class="card-body">`;
    html += `<h3>${esc(user.name)}</h3>`;

    if (user.address) {
      html += `<p class="address">${esc(user.address.city)}, ${esc(user.address.country)}</p>`;
    }

    if (Array.isArray(user.skills) && user.skills.length > 0) {
      html += `<div class="skills">`;
      user.skills.forEach((s) => { html += `<span class="tag">${esc(s)}</span>`; });
      html += `</div>`;
    }

    html += `</div>`;
    card.innerHTML = html;
    card.addEventListener("click", () => openUserModal(user));
    container.appendChild(card);
  });
}

// --- Posts ---

function buildPostCardHTML(post) {
  const authorName = post.author?.name ?? post.author;
  let html = `<div class="card-body">`;
  html += `<div class="card-header-row">`;
  html += `<h3>${esc(post.title)}</h3>`;
  html += `<div class="card-actions">`;
  html += `<button class="btn btn-edit">Edit</button>`;
  html += `<button class="btn btn-delete">Delete</button>`;
  html += `</div>`;
  html += `</div>`;
  html += `<p class="address">${esc(authorName)} &middot; ${formatDate(post.createdAt)}</p>`;
  html += `<p class="post-content">${esc(post.content)}</p>`;
  if (Array.isArray(post.tags) && post.tags.length > 0) {
    html += `<div class="skills">`;
    post.tags.forEach((t) => { html += `<span class="tag">${esc(t)}</span>`; });
    html += `</div>`;
  }
  html += `</div>`;
  return html;
}

function attachPostCardListeners(post, cardEl) {
  cardEl.querySelector(".btn-edit").addEventListener("click", () => openEditModal(post, cardEl));
  cardEl.querySelector(".btn-delete").addEventListener("click", () => deletePost(post._id, cardEl));
}

function updatePostCard(post, cardEl) {
  cardEl.innerHTML = buildPostCardHTML(post);
  attachPostCardListeners(post, cardEl);
}

function renderPosts(posts) {
  const container = document.getElementById("posts");

  if (posts.length === 0) {
    container.innerHTML = '<p class="empty">No posts found.</p>';
    return;
  }

  container.innerHTML = "";
  posts.forEach((post) => {
    const card = document.createElement("div");
    card.className = "card post-card";
    card.innerHTML = buildPostCardHTML(post);
    attachPostCardListeners(post, card);
    container.appendChild(card);
  });
}

// --- Load ---

function loadSection(endpoint, containerId) {
  fetch(`${BASE}${endpoint}`)
    .then((res) => res.json())
    .then((users) => renderUsers(containerId, users))
    .catch(() => {
      document.getElementById(containerId).innerHTML =
        `<p class="error">Could not load data. Is the server running on port 3000?</p>`;
    });
}

function loadPosts() {
  fetch(`${BASE}/posts`)
    .then((res) => res.json())
    .then((posts) => {
      allPosts = posts;
      renderPosts(posts);
    })
    .catch(() => {
      document.getElementById("posts").innerHTML =
        `<p class="error">Could not load data. Is the server running on port 3000?</p>`;
    });
}

// Load /users first so allUsers is ready for the create form
fetch(`${BASE}/users`)
  .then((res) => res.json())
  .then((users) => {
    allUsers = users;
    renderUsers("users", users);
  })
  .catch(() => {
    document.getElementById("users").innerHTML =
      `<p class="error">Could not load data. Is the server running on port 3000?</p>`;
  });

loadSection("/users/from-france", "users-france");
loadSection("/users/skilled",     "users-skilled");
loadPosts();
