import { useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  const TrendingItem = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false);
    const videoRef = useRef(null);

    const handlePlaybackStatusUpdate = (status) => {
      if (status.didJustFinish) {
        setPlay(false);
      }
      if (status.error) {
        console.error("Playback Error:", status.error);
        setPlay(false);
      }
    };

    return (
      <Animatable.View
        className="mr-5"
        animation={activeItem === item.$id ? zoomIn : zoomOut}
        duration={500}
      >
        {play ? (
          <Video
            ref={videoRef}
            source={{ uri: item.video }}
            style={{
              width: 208,
              height: 288,
              borderRadius: 33,
              marginTop: 12,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
        ) : (
          <TouchableOpacity
            className="relative flex justify-center items-center"
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
          >
            <ImageBackground
              source={{
                uri: item.thumbnail,
              }}
              className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
              resizeMode="cover"
            />

            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </Animatable.View>
    );
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }} // Add y: 0 to fix the error
    />
  );
};

export default Trending;
