const BASE_URL = import.meta.env.VITE_SUPABASE_URL;

const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export async function fetchUsers() {
  const res = await fetch(BASE_URL, { headers });
  return res.json();
}

export async function createUser(user) {
  await fetch(BASE_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(user)
  });
}

export async function updateUser(id, updates) {
  await fetch(`${BASE_URL}?id=eq.${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(updates)
  });
}

export async function deleteUser(id) {
  await fetch(`${BASE_URL}?id=eq.${id}`, {
    method: "DELETE",
    headers
  });
}
