// apikey for the newsapi.org
const apiKey='3bc15822a7a74b76a5eccecd7e650168';
// 
const blogContainer=document.getElementById('blog-container');
const searchInput=document.getElementById('search-bar');
const searchButton=document.getElementById('search-btn');
// fetch random news articles from the API
async function fetchRandomNews() {
  try{
    const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    const respones=await fetch(apiUrl);
    const data=await respones.json();
    return data.articles;
  }catch(error){
    console.error('Error fetching news:', error);
    return[];
  }
}

// Search functionality
searchButton.addEventListener('click', async()=>{
  const query=searchInput.value.trim();
  // Clear the search input
  searchInput.value='';
  if(query!==''){
    try{
      const articles=await fetchQuery(query);
      dispalyblog(articles);

    }catch(error){
      console.error('Error fetching search by query:', error);
    }
  }
  // query is empty, fetch random news

  async function fetchQuery(query) {
    try{
    const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
    const respones=await fetch(apiUrl);
    const data=await respones.json();
    return data.articles;
  }catch(error){
    console.error('Error fetching news:', error);
    return[];
  }   
  }
})
// Display the blog articles in the blog container
function dispalyblog(articles) {
  blogContainer.innerHTML='';
  articles.forEach((article)=>{
    const blogCard=document.createElement('div');
    blogCard.classList.add('blog-card');
    const img=document.createElement('img');
    img.src=article.urlToImage;
    img.alt=article.title;
    const title=document.createElement('h2');
    const truncatedTitle=article.title.length > 30 ? article.title.slice(0, 30) + '...' : article.title;
    title.textContent=truncatedTitle;
    const description=document.createElement('p');
    const truncatedDescription=article.description.length > 100 ? article.description.slice(0, 100) + '...' : article.description;
    description.textContent=truncatedDescription;
    // append the elements to the blog card
    blogCard.appendChild(img);
    blogCard.appendChild(title);  
    blogCard.appendChild(description);
    blogCard.addEventListener('click', () => {
      // open the article in a new tab
      window.open(article.url, '_blank');
    })
    // append the blog card to the blog container
    blogContainer.appendChild(blogCard);
  })
}
// Immediately invoke the function to fetch and display random news articles
(async ()=>{
  try{
    const articles=await fetchRandomNews();
    dispalyblog(articles);
  }catch(error){
    console.error('Error:', error);
  }
})();