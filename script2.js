document.addEventListener('DOMContentLoaded', () => {
    const newsForm = document.getElementById("news-form");
    const newsTopicInput = document.getElementById("news-topic");
    const newsList = document.getElementById("news-list");
    const keywordButtons = document.querySelectorAll('.keyword-btn');
    const showGuideButton = document.getElementById("show-integration-guide");
    const closeGuideButton = document.getElementById("close-guide");
    const integrationGuide = document.getElementById("integration-guide");

    
    async function fetchNews(topic) {
        newsList.innerHTML = "<p>Loading news articles...</p>";
        newsList.classList.remove("hidden");

        try {
            const apiKey = "11c72112e5084285be0453158989a36b";  
            const response = await fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`);
            
            if (!response.ok) {
                const data = await response.json();
                newsList.innerHTML = `<p>Error: ${data.message}</p>`;
                return;
            }

            const data = await response.json();

            if (data.articles.length === 0) {
                newsList.innerHTML = "<p>No articles found for this topic.</p>";
                return;
            }

            
            newsList.innerHTML = "";

           
            data.articles.forEach(article => {
                const articleElement = document.createElement("div");
                articleElement.classList.add("news-item");

                const articleTitle = article.title || "No title available";
                const articleDescription = article.description || "No description available.";
                const articleUrl = article.url || "#";
                const articleImage = article.urlToImage || "default-image.jpg"; 

                articleElement.innerHTML = `
                    <h2>${articleTitle}</h2>
                    <p>${articleDescription}</p>
                    <a href="${articleUrl}" target="_blank">Read Full Article</a>
                    <img src="${articleImage}" alt="Article Image" />
                `;
                newsList.appendChild(articleElement);
            });
        } catch (error) {
            newsList.innerHTML = "<p>Error: Unable to fetch news. Please try again later.</p>";
            console.error("Network Error:", error);
        }
    }

   
    showGuideButton.addEventListener('click', () => {
        integrationGuide.classList.add('visible');
    });

    
    closeGuideButton.addEventListener('click', () => {
        integrationGuide.classList.remove('visible');
    });


    newsForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const topic = newsTopicInput.value.trim();

        if (topic === "") {
            newsList.innerHTML = "<p>Please enter a valid topic.</p>";
            return;
        }

    
        fetchNews(topic);
    });

    
    keywordButtons.forEach(button => {
        button.addEventListener('click', () => {
            const keyword = button.getAttribute('data-keyword');
            fetchNews(keyword);
        });
    });
});
