import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, TEXTCOLOR, icons, COMMONTEXT, image } from "../constants";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import Client from "../sanity";
import RenderColumns from "../components/search/RenderColumns";

const Search = () => {

  const [loading,setLoading]=useState(false);

  // random search queries
  const [searchQuery, setSearchQuery] = useState('');

  const handleOnClickSearchIt = async (query) =>{
    setLoading(true);
    if(query == ""){
      alert('field is empty');
      setLoading(false);
    }else{
      let searchItem = query;
    console.log(searchItem);
    const queryBySearchText = `*[_type == 'saree' && (name match '${searchItem}' || description match '${searchItem}' || manu match '${searchItem}')]`;
    await Client.fetch(queryBySearchText).then((res)=>{
      if(res.length>0){
        setData(res);
        setLoading(false);
      }else{
        setData(null);
        setLoading(false);
      }
    })
    }
  }

  const [activeBtn1, setActiveBtn1] = useState(false);
  const [activeBtn2, setActiveBtn2] = useState(false);
  const [activeBtn3, setActiveBtn3] = useState(false);
  const [activeBtn4, setActiveBtn4] = useState(false);
  const [activeBtn5, setActiveBtn5] = useState(false);

  const [data, setData] = useState();

  // filtered queries

  const handleButtonClick = async (btnKey, query) => {
    switch (query) {
      case "all":
        setLoading(true);
        const queryByAll = `*[_type == 'saree']`;
        await Client.fetch(queryByAll).then((res) => {
          setData(res);
          console.log("done");
          setLoading(false);
        });
        break;

      case "manu":
        if (query) {
          setLoading(true);
          let searchTermi = query;
          const queryByManu = `*[_type == 'saree' && manu match ${searchTermi}]`;
          await Client.fetch(queryByManu).then((res) => {
            if (res.length > 0) {
              setData(res);
              setLoading(false);
            } else {
              setData(null);
              setLoading(false);
            }
          });
        } else {
          console.log("noe");
        }
        break;

      case "description":
        if (query) {
          setLoading(true);
          let searchTermi = query;
          const queryByManu = `*[_type == 'saree' && description match ${searchTermi}]`;
          await Client.fetch(queryByManu).then((res) => {
            if (res.length > 0) {
              setData(res);
              setLoading(false);
            } else {
              setData(null);
              setLoading(false);
            }
          });
        } else {
          console.log("noe");
        }
        break;

      case "nft":
        setData(null);
        break;

      case "old":
        setData(null);
        break;

      default:
        break;
    }

    // Update the state based on the provided button key
    setActiveBtn1(btnKey === 1);
    setActiveBtn2(btnKey === 2);
    setActiveBtn3(btnKey === 3);
    setActiveBtn4(btnKey === 4);
    setActiveBtn5(btnKey === 5);
  };

  const handleReset = () => {
    setActiveBtn1(false);
    setActiveBtn2(false);
    setActiveBtn3(false);
    setActiveBtn4(false);
    setActiveBtn5(false);
    setSearchQuery('');
  };

  return (
    <View style={styles.MainContainerSearch}>
      <SafeAreaView>
        {/* This is search bar */}
        <View>
          <View style={styles.searchContainer} className="p-2 justify-between">
            <TextInput
              placeholder="Search"
              style={styles.searchbar}
              placeholderTextColor={"gray"}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            <TouchableOpacity style={styles.iconback} onPress={()=>handleOnClickSearchIt(searchQuery)}>
              <Image source={icons.wsearch} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* these are filter compatiable search */}
        <View>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 10,
              marginTop: 10,
              right: 10,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            <View
              className="flex flex-row mt-2 pb-5"
              style={{ minHeight: vh(7) }}
            >
              <TouchableOpacity
                className="p-3 ml-4"
                style={{ borderRadius: 30, backgroundColor: COLORS.motoblue }}
                onPress={handleReset}
              >
                <Image source={icons.filter} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                className="p-4 ml-4"
                style={
                  activeBtn1 ? styles.filterTainerActs : styles.filterTainer
                }
                onPress={() => handleButtonClick(1, "all")}
              >
                <View>
                  <Text style={activeBtn1 ? styles.Wtext : styles.text}>
                    All
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-4 ml-4"
                style={
                  activeBtn2 ? styles.filterTainerActs : styles.filterTainer
                }
                onPress={() => handleButtonClick(2, "manu")}
              >
                <View>
                  <Text style={activeBtn2 ? styles.Wtext : styles.text}>
                    Brands
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-4 ml-4"
                style={
                  activeBtn3 ? styles.filterTainerActs : styles.filterTainer
                }
                onPress={() => handleButtonClick(3, "description")}
              >
                <View>
                  <Text style={activeBtn3 ? styles.Wtext : styles.text}>
                    Hand Made
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-4 ml-4"
                style={
                  activeBtn4 ? styles.filterTainerActs : styles.filterTainer
                }
                onPress={() => handleButtonClick(4, "nft")}
              >
                <View>
                  <Text style={activeBtn4 ? styles.Wtext : styles.text}>
                    NFT
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-4 ml-4"
                style={
                  activeBtn5 ? styles.filterTainerActs : styles.filterTainer
                }
                onPress={() => handleButtonClick(5, "old")}
              >
                <View>
                  <Text style={activeBtn5 ? styles.Wtext : styles.text}>
                    Thirfted
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Rendered Data */}
        { loading ? 
          <View className='self-center top-24 bottom-24'>
            <Image source={image.comet} style={{width:300,height:300}}/>
            <Text style={{...COMMONTEXT.tertiary,color:TEXTCOLOR.secondary,alignSelf:'center'}}>Loading...</Text>
          </View>
        :
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: vh(1), paddingBottom: vh(16) }}
        >
          {data !=null ? (
            <RenderColumns Data={data} />
          ) : (
            <View className="self-center top-20 bottom-20">
              <Image source={image.searchAstro} style={styles.imageOP} />

              {data === null ? (
                <Text style={{ ...COMMONTEXT.semisecondary ,alignSelf: "center",color:TEXTCOLOR.secondary}}>
                  Nothing Found!!
                </Text>
              ) : (
                <Text style={{ ...COMMONTEXT.semisecondary, alignSelf: "center" ,color:TEXTCOLOR.secondary}}>
                  Looking For Some Products?
                </Text>
              )}
            </View>
          )}
        </ScrollView>
        }

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterTainer: {
    borderWidth: 1,
    borderColor: COLORS.motoblue,
    borderRadius: 25,
  },
  filterTainerActs: {
    backgroundColor: COLORS.motoblue,
    borderRadius: 25,
  },
  MainContainerSearch: {
    backgroundColor: COLORS.ColumbiaBlue,
    height: vh(100),
  },
  searchContainer: {
    marginTop: vh(1),
    marginRight: vw(5),
    marginLeft: vw(5),
    flexDirection: "row",
    borderWidth: 1,
    paddingLeft: vw(5),
    borderColor: COLORS.motoblue,
    borderRadius: 30,
  },
  searchbar: {
    minHeight: vh(5),
    width: vw(65),
    ...COMMONTEXT.tertiary,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconback: {
    backgroundColor: COLORS.motoblue,
    padding: 8,
    borderRadius: 50,
  },
  text: {
    ...COMMONTEXT.secondary,
  },
  Wtext: {
    ...COMMONTEXT.secondary,
    color: TEXTCOLOR.primary,
  },
  imageOP: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
});
export default Search;
