const BASE_URL = "https://wqumuzarlqwocwpvsgcw.supabase.co/rest/v1/users";

const headers = {
  apikey: "sb_publishable_7N5wrnWGNJaaADPaOm1tUg_gGApmMNX",
  "Content-Type": "application/json"
};

export async function fetchUsers() {
  const res = await fetch(BASE_URL, { headers });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function createUser(user) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
}

export async function updateUser(id, updates) {
  const res = await fetch(`${BASE_URL}?id=eq.${id}`, {
    method: "PATCH",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}?id=eq.${id}`, {
    method: "DELETE",
    headers
  });
  if (!res.ok) throw new Error("Failed to delete user");
}
