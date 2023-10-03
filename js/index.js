document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    githubForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
  
      if (searchTerm === '') {
        alert('Please enter a GitHub username');
        return;
      }
  
      // Clear previous search results
      userList.innerHTML = '';
      reposList.innerHTML = '';
  
      try {
        const userResponse = await fetch(`https://api.github.com/search/users?q=${searchTerm}`);
        const userData = await userResponse.json();
  
        if (userData.items.length === 0) {
          alert('No matching users found');
          return;
        }
  
        userData.items.forEach((user) => {
          const userItem = document.createElement('li');
          userItem.innerHTML = `
            <img src='${user.avatar_url}' alt='${user.login}' width='50' height='50'>
            <a href='${user.html_url}' target='_blank'>${user.login}</a>
          `;
  
          userItem.addEventListener('click', async () => {
            const reposResponse = await fetch(`https://api.github.com/users/${user.login}/repos`);
            const reposData = await reposResponse.json();
  
            reposList.innerHTML = '';
            reposData.forEach((repo) => {
              const repoItem = document.createElement('li');
              repoItem.innerHTML = `
                <a href='${repo.html_url}' target='_blank'>${repo.name}</a>
              `;
              reposList.appendChild(repoItem);
            });
          });
  
          userList.appendChild(userItem);
        });
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching data from GitHub.');
      }
    });
  });
  
