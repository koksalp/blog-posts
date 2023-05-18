import { createContext, useEffect, useState } from "react";
import { getPostById, calculateMaxPage } from "../helpers/functions";

// create a context for posts
const PostContext = createContext({});

// a provider component that makes it easier to handle state management
export function PostProvider({ children }) {
  // initialize states
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [maxPage, setMaxPage] = useState(null);

  // function to load initial posts
  async function getInitialPosts() {
    const initialPosts = await loadPosts();
    setPosts(initialPosts);
  }

  // load initial posts once user visits main page
  useEffect(() => {
    getInitialPosts();
  }, []);

  // allow infinite scrolls by fetching data for new posts and load them
  // everytime user reaches to the bottom of the screen if
  // there are more posts to load
  useEffect(() => {
    if (loadMore && !isLimitReached) {
      async function getNewPosts() {
        const newPosts = await loadPosts(page + 1);
        if (newPosts === null) {
          setLoadMore(false);
          setIsLimitReached(true);
          return;
        }
        setPosts(posts.concat(newPosts));
        setPage(page + 1);
        setLoadMore(false);
      }

      getNewPosts();
    }
  }, [loadMore, isLimitReached]);

  // refresh screen when pull pull to refresh feature is used
  // and reset all the states so that user can only see
  // initial posts but they can see more posts by reaching
  // to the bottom of the page
  useEffect(() => {
    if (isRefreshing) {
      setPage(1);
      setLoadMore(false);
      setIsLimitReached(false);
      setIsRefreshing(false);

      getInitialPosts();
    }
  }, [isRefreshing]);

  // retrieve new posts by reaching out the REST API that is provided
  // if this is the first time user visits this screen or after refreshes it
  // number of max posts is also used so that all the data is accessible no matter if
  // more posts are added and returned by the REST API
  async function loadPosts(givenPage = 1, count = 10) {
    // check if given page is valid int
    if (maxPage !== null) {
      if (givenPage < 1 || givenPage > maxPage) {
        return null;
      }
    }

    // fetch data
    const url = `https://www.lenasoftware.com/api/v1/en/maestro/1?page=${givenPage}&count=${count}`;
    const response = await fetch(url);
    const responseObject = await response.json();

    // set or update the state of number of maximum pages for the posts
    if (givenPage === 1) {
      const maxPageNum = calculateMaxPage(responseObject.totalCount, count);
      setMaxPage(maxPageNum);
    }

    // return the array of posts
    return responseObject.result;
  }

  // navigate user into the screen where they can see
  // the actual content of the selected post
  function handlePostPress(postId, navigation) {
    const postContent = getPostById(posts, postId);
    navigation.navigate("posts-detail-screen", {
      postContent: postContent,
      postId: postId,
    });
  }

  // set the state that stores the info of whether the screen is being refreshed or not
  // useEffect will handle the rest
  function handleRefresh() {
    setIsRefreshing(true);
  }

  // trigger the necesarry operations to perform
  // by setting the corresponding state
  // useEffect will handle the rest of it
  function handleEndReached() {
    if (!loadMore && !isLimitReached) {
      setLoadMore(true);
    }
  }

  // provide data
  return (
    <PostContext.Provider
      value={{
        posts,
        page,
        loadMore,
        isLimitReached,
        isRefreshing,
        handlePostPress,
        handleRefresh,
        handleEndReached,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostContext;
