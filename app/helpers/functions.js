// return the html content of a post using its id
export function getPostById(posts, postId) {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].postId === postId) {
      return posts[i].content;
    }
  }
}

// calculate the number of pages at most
export function calculateMaxPage(postNum, count) {
  return Math.ceil(postNum / count);
}
