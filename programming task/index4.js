let articles = [];
let currentPage = 1;
const articlesPerPage = 4;

function addArticle() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const image = document.getElementById("image").value.trim();

  if (!title || !description) {
    alert("Title and Description are required!");
    return;
  }

  articles.push({ title, description, image });
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("image").value = "";
  currentPage = 1;
  renderArticles();
  renderPagination();
}

function renderArticles() {
  const newsFeed = document.getElementById("newsFeed");
  newsFeed.innerHTML = "";

  const start = (currentPage - 1) * articlesPerPage;
  const end = start + articlesPerPage;
  const paginatedArticles = articles.slice(start, end);

  paginatedArticles.forEach(article => {
    const articleDiv = document.createElement("div");
    articleDiv.className = "article";
    articleDiv.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      ${article.image ? `<img src="${article.image}" alt="Article Image">` : ""}
    `;
    newsFeed.appendChild(articleDiv);
  });
}

function renderPagination() {
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const pagination = document.getElementById("paginationControls");
  pagination.innerHTML = "";

  if (totalPages <= 1) return;

  const prevBtn = document.createElement("button");
  prevBtn.innerText = "Previous";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    renderArticles();
    renderPagination();
  };
  pagination.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.innerText = i;
    if (i === currentPage) pageBtn.classList.add("active");
    pageBtn.onclick = () => {
      currentPage = i;
      renderArticles();
      renderPagination();
    };
    pagination.appendChild(pageBtn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    renderArticles();
    renderPagination();
  };
  pagination.appendChild(nextBtn);
}
