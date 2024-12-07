const postsList = document.querySelector('.postsList');

async function init() {
    const postsData = await fetch('https://dummyjson.com/posts').then(res => res.json());
    const commentsData = await fetch('https://dummyjson.com/comments').then(res => res.json());
    //console.log(postsData.posts);
    postsList.innerHTML = '';
    
    for (const post of postsData.posts) {
        const user = await fetch(`https://dummyjson.com/users/${post.userId}`).then(res => res.json());
        const postComments = commentsData.comments.filter(comment => comment.postId === post.id);

        let commentsHtml = '';
        for (const comment of postComments) {
            commentsHtml += `
                <div class="comment">
                <h1>${comment.user.fullName}</h1>
                <p>${comment.body}</p>
                </div>
            `;
        }

        postsList.innerHTML += `
            <li class="${post}">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <h3>${post.reactions}</h3>
                <h1>${user.fullName}</h1>
                <p>${user.body}</p>
            </li>
        `;
    }
}
init();      