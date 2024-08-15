import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Pages from "./data";
import { useRouter } from "expo-router";

const pages = Pages
const {height , width} = Dimensions.get("window")

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = pages.length;
  const navigation = useNavigation();
  const flatListRef = React.useRef(null);
  const router = useRouter()

  const nextPage = () => {
    if (currentPage === totalPages - 1) {
      router.push("registerPage/registerPage");

    } else {
      flatListRef.current.scrollToIndex({ index: currentPage + 1, animated: true });
    }
  };


  const renderPage = ({ item, index }) => (
      <ImageBackground
          source={item.image}
          style={styles.imageBackground}
          resizeMode="cover"
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.description}</Text>
          <Image
              source={item.image1}
          />
          {currentPage === totalPages -1 ?
              <View style={styles.skipCenter}>
                <TouchableOpacity style={styles.getStarted} onPress={nextPage}>
                  <Text style={styles.getStartedText}>
                    Get Started
                  </Text>
                </TouchableOpacity>
              </View>
              :<View style={styles.skipCenter}>
                <Pressable style={styles.button} onPress={nextPage}>
                  <Image source={require('../../assets/images/arrow-right.png')} style={styles.buttonImage} />
                </Pressable>
              </View>
          }

        </View>
      </ImageBackground>
  );

  return (
      <FlatList
          ref={flatListRef}
          data={pages}
          renderItem={renderPage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.flatList}
          onMomentumScrollEnd={(e) => {
            const index = Math.floor(e.nativeEvent.contentOffset.x / Dimensions.get('window').width);
            setCurrentPage(index);
          }}
      />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  imageBackground: {
    width: Dimensions.get('window').width,
    height: height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    bottom: 0,
    alignItems: 'center',
    borderTopRightRadius: 200,
    borderTopWidth:10,
    borderRightWidth:1,
    borderTopColor: "rgb(68,118,4)",
    borderRightColor: "rgb(68,118,4)"


  },
  title: {
    fontSize: 40,
    marginTop:10,
    color: "white",
    alignSelf:'flex-start'
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: "Times New Roman",
    marginBottom: 20,
    marginTop: 10,
    alignSelf:'flex-start'

  },
  skipCenter: {
    width: width,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    // marginBottom: 20,


  },
  button: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 50,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 20,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  getStarted:{
    backgroundColor:"green",
    width:"95%",
    color: "white",
    fontSize:"25",
    fontWeight: 'bolder',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  getStartedText:{
    color: "white",
    fontSize:"25",
    fontWeight: 'bolder',
    alignSelf:"center"
  }
});

export default LandingPage;