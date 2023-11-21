import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import RowView from "./RowView";
import { icons } from "../../constants";
import Carousel from "react-native-new-snap-carousel";
import { COMMONTEXT } from "../../constants";

const RowViewHome = ({ Data }) => {
  const horizontalMargin = 35;
  const slideWidth = 280;
  const sliderWidth = Dimensions.get("window").width;
  const itemWidth = slideWidth + horizontalMargin * 2;

  return (
    <View>
      <Text style={styles.HeaderText}>
        &nbsp;&nbsp;&nbsp;Most loved Products
      </Text>
      <Carousel
        data={Data}
        renderItem={({ item }) => (
          <RowView Item={item} PageRef={"ItemScreen"} Icon={icons.r} />
        )}
        itemWidth={itemWidth}
        sliderWidth={sliderWidth}
        layout={"default"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderText: {
    margin: vh(1),
    marginBottom: vh(2),
    marginRight: vw(12),
    textAlign: "right",
    ...COMMONTEXT.secondary,
  },
});

export default RowViewHome;
