import { ScrollView, StyleSheet, useWindowDimensions } from "react-native";

// 3rd party package to render html content
import RenderHtml from "react-native-render-html";

// A screen component where user can see the actual content
export default function PostsDetailScreen({ route }) {
  const { width } = useWindowDimensions();
  const { postId, postContent } = route.params;
  return (
    <ScrollView style={styles.container}>
      <RenderHtml contentWidth={width} source={{ html: postContent }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
  },
});
