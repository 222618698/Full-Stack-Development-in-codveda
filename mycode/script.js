async function fetchUsers() {
  const res = await fetch('/users');
  const users = await res.json();

  const list = document.getElementById('userList');
  list.innerHTML = '';

  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user.name;

    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.onclick = () => deleteUser(user.id);

    li.appendChild(btn);
    list.appendChild(li);
  });
}

async function addUser() {
  const name = document.getElementById('userName').value;
  if (!name) return alert('Enter a name');

  await fetch('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  document.getElementById('userName').value = '';
  fetchUsers();
}

async function deleteUser(id) {
  await fetch(`/users/${id}`, { method: 'DELETE' });
  fetchUsers();
}

fetchUsers();
 