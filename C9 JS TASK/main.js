const search = document.querySelector('#search');
const btn = document.querySelector('#btn');
const posts = document.querySelector('#reddit-res');
let reddit_posts = [];


btn.addEventListener('click', async () => {
    try {
        if (search.value === "") {
            search.style.border = "1px solid red";        
        }else{            
            while (posts.lastElementChild) {
                posts.removeChild(posts.lastElementChild);
            }
            const res = await fetch('https://www.reddit.com/r/javascript.json')
            reddit_posts = await res.json();             
            const inputValue = search.value;                       
            const filteredResults = searchPosts(reddit_posts.data.children, inputValue);            
            reddit_posts = filteredResults;            
            displayData();
        }
    } catch (err) {
        console.error(err);
    }
})

// Matching input value with title and description of post from fetched api to get relevant posts from reddit
function searchPosts(arr, value){
    let filteredData = [];
    for (let i = 0; i < arr.length; i++) {
        value = value.toLowerCase();
        let matchingTitle = arr[i].data.title.toLowerCase();
        let matchingDescription = arr[i].data.selftext.toLowerCase();

        if (matchingTitle.includes(value) || matchingDescription.includes(value)) {
            filteredData.push(arr[i]);
        }
    }
    return filteredData;
}

//Displaying html data using map function 
function displayData() {
    const html = reddit_posts.map(info =>{
        return `
        <div class = "reddit-posts">
            <a href="${info.data.url}">${info.data.title}</a>                    
        </div>
        `
        }
        ).join("")
    posts.insertAdjacentHTML("afterbegin", html);         
    
}

//Displaying results in ascending order
const btnAsc = document.querySelector('#ascending');
btnAsc.addEventListener('click', () =>{
    posts.innerHTML = "";       
    reddit_posts.sort((a,b) => {
        return a.data.created - b.data.created;
    }); 
    displayData();
})

//Displaying results in descending order
const btnDes = document.querySelector('#descending');
btnDes.addEventListener('click', () =>{
    posts.innerHTML = "";        
    reddit_posts.sort((a,b) => {
        return b.data.created - a.data.created;
    });    
    displayData();
})