document.getElementById("username-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("github-username").value;
    const repoList = document.getElementById("repo-list");

    repoList.innerHTML = "";

    if (username === "") {
        repoList.innerHTML = "<p>Please enter a valid username.</p>";
        return;
    }

   
    repoList.innerHTML = "FETCHED Last 30 Repositories ";

    try {
        let page = 1;
        const perPage = 30; 
        let hasMoreRepos = true;
        
        while (hasMoreRepos) {
            const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`);
            const data = await response.json();

         
            if (response.status !== 200) {
                repoList.innerHTML = `<p>Error: ${data.message}</p>`;
                return;
            }

          
            if (data.length === 0) {
                hasMoreRepos = false;
                break;
            }

           
            data.forEach(repo => {
                const repoElement = document.createElement("div");
                repoElement.classList.add("repo");
                repoElement.innerHTML = `
                    <h2>${repo.name}</h2>
                    <p>${repo.description || "No description available."}</p>
                    <a href="${repo.html_url}" target="_blank" class="button">Visit Repository</a>
                `;
                repoList.appendChild(repoElement);
            });

          
            if (data.length < perPage) {
                hasMoreRepos = false;
            } else {
                page++; 
            }
        }

    } catch (error) {
      
        repoList.innerHTML = `<p>Error: Unable to fetch repositories. Please try again later.</p>`;
    }
});


document.getElementById("show-integration-guide").addEventListener("click", () => {
    const guide = document.getElementById("integration-guide");
    guide.classList.toggle("hidden");
});

document.getElementById("close-guide").addEventListener("click", () => {
    const guide = document.getElementById("integration-guide");
    guide.classList.add("hidden");
});
