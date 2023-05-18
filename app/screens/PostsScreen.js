import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useContext } from "react";

import Post from "../components/Post";
import PostContext from "../context/PostContext";

// A screen component where user can see all the blog posts
// Data related to blog posts is fetched from the REST API
// New posts are loaded when user scrolls down to the bottom
// as long as there is more content
// When user clicks on one of the posts
// he/she will be navigated into the screen where they can
// see the actual content
export default function PostsScreen({ navigation }) {
  const context = useContext(PostContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={context.posts}
        keyExtractor={(item) => item.postId}
        onEndReached={context.handleEndReached}
        refreshControl={
          <RefreshControl
            refreshing={context.isRefreshing}
            onRefresh={context.handleRefresh}
          />
        }
        renderItem={({ item }) => (
          <Post
            title={item.title}
            totalReadingTime={Math.abs(item.totalReadingTime)}
            summary={item.summary}
            imageUrl={item.banner}
            onPressFn={() => context.handlePostPress(item.postId, navigation)}
          />
        )}
      />
      {context.loadMore && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  loading: {
    position: "absolute",
    bottom: 50,
  },
});
