import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Platform,
} from "react-native";

// a component for displaying blog posts
// and their features such as image, title, summary
// and the minutes it takes to finish reading
export default function Post(props) {
  return (
    <View style={styles.outerContainer}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={props.onPressFn}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image
              source={{
                uri: props.imageUrl,
              }}
              style={styles.postImage}
            />
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.totalReadingTime}>
              Total Reading Time:{" "}
              <Text style={styles.duration}>
                {props.totalReadingTime} min(s)
              </Text>
            </Text>
            <Text style={styles.summary}>{props.summary}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    margin: 16,
    borderRadius: 16,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    marginVertical: 12,
    marginHorizontal: 8,
  },
  totalReadingTime: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    margin: 8,
  },
  duration: {
    fontWeight: "normal",
  },
  summary: {
    textAlign: "auto",
    marginHorizontal: 16,
    marginVertical: 16,
  },
});
