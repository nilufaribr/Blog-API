// API Configuration
const BASE = 'http://127.0.0.1:8000/api';

// ============ TOKEN MANAGEMENT ============
function getToken() {
  return localStorage.getItem('blog_token');
}

function getUsername() {
  return localStorage.getItem('blog_username');
}

function getUserId() {
  return localStorage.getItem('blog_user_id');
}

function isLoggedIn() {
  return !!getToken();
}

// ============ HEADERS & AUTHENTICATION ============
function getHeaders(json = true) {
  const h = {};
  if (json) h['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) h['Authorization'] = 'Token ' + token;
  return h;
}

// ============ API HELPERS ============
async function apiCall(endpoint, method = 'GET', body = null, needsAuth = true) {
  try {
    const options = {
      method,
      headers: getHeaders(true),
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE}${endpoint}`, options);
    const data = await response.json();

    return {
      success: response.ok,
      status: response.status,
      data: data,
      error: !response.ok ? (data.error || data.detail || 'Unknown error') : null
    };
  } catch (error) {
    return {
      success: false,
      status: 0,
      data: null,
      error: 'Cannot connect to server. Make sure Django is running on port 8000.'
    };
  }
}

async function apiCallFormData(endpoint, formData, method = 'POST') {
  try {
    const options = {
      method,
      headers: { 'Authorization': 'Token ' + getToken() },
      body: formData
    };

    const response = await fetch(`${BASE}${endpoint}`, options);
    const data = await response.json();

    return {
      success: response.ok,
      status: response.status,
      data: data,
      error: !response.ok ? (data.error || data.detail || 'Unknown error') : null
    };
  } catch (error) {
    return {
      success: false,
      status: 0,
      data: null,
      error: 'Cannot connect to server.'
    };
  }
}

// ============ AUTHENTICATION ============
async function logout() {
  await apiCall('/auth/logout/', 'POST');
  localStorage.removeItem('blog_token');
  localStorage.removeItem('blog_username');
  localStorage.removeItem('blog_user_id');
  window.location.href = '/login/';
}

function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = '/login/';
  }
}

// ============ UI HELPERS ============
function showAlert(id, message, type = 'error') {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
    el.className = `alert alert-${type}`;
  }
}

function hideAlert(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

function buildNav() {
  const nav = document.getElementById('navLinks');
  if (!nav) return;

  if (isLoggedIn()) {
    nav.innerHTML = `
      <span class="nav-username">👤 ${getUsername()}</span>
      <a href="/create/" class="btn btn-primary btn-sm">+ New Post</a>
      <a href="/profile/" class="btn btn-outline btn-sm">Profile</a>
      <button class="btn btn-outline btn-sm" onclick="logout()">Logout</button>
    `;
  } else {
    nav.innerHTML = `
      <a href="/login/" class="btn btn-outline btn-sm">Login</a>
      <a href="/register/" class="btn btn-primary btn-sm">Register</a>
    `;
  }
}

// ============ AUTO EXECUTE ============
document.addEventListener('DOMContentLoaded', buildNav);