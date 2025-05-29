document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('jokeBtn');
  const jokeText = document.getElementById('jokeText');

  btn.addEventListener('click', async () => {
    const res = await fetch('/api/joke');
    const data = await res.json();
    jokeText.textContent = data.joke;
  });
});
