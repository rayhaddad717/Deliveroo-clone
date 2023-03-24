import {
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  StatusBar,
  TextInput,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import { client as sanityClient, urlFor } from "../sanity";
import Autocomplete from "react-native-autocomplete-input";
import RestaurantAutocompleteCard from "../components/RestaurantAutocompleteCard";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [query, setquery] = useState("");
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);
  const [isFilterFocused, setIsFilterFocused] = useState(false);
  const toggleFocus = (value) => {
    setIsFilterFocused(value);
  };
  const onRefresh = () => {
    setIsRefreshing(true);
    fetchFeaturedCategories();
  };
  const fetchFeaturedCategories = () => {
    sanityClient
      .fetch(`*[_type == "featured"]{...,restaurants[]->{...,dishes[]->}}`)
      .then((data) => {
        setFeaturedCategories(data);
        setIsRefreshing(false);
      })
      .catch((e) => {
        console.log(e, "ERRO");
        setIsRefreshing(false);
      });
  };
  const resetQuery = () => {
    setquery("");
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    fetchFeaturedCategories();
  }, []);
  const restaurants = useMemo(() => {
    let map = new Map();
    featuredCategories.forEach((cat) => {
      cat.restaurants.forEach((res) => {
        if (!map.has(res._id)) map.set(res._id, { ...res });
      });
    });
    return Array.from(map.values());
  }, [featuredCategories]);
  useEffect(() => {
    if (query.trim().length) {
      setfilteredRestaurants(
        restaurants.filter((res) =>
          res?.name?.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setfilteredRestaurants([]);
    }
  }, [query]);
  return (
    <SafeAreaView
      className="bg-white flex-1"
      style={{ paddingTop: StatusBar.currentHeight + 7 }}
    >
      {/* Header */}
      <View className="flex-row items-center mx-4 space-x-2 px-2">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-700 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View
          className="flex-row space-x-2 flex-1 bg-white p-3"
          style={[
            styles.autocompleteContainer,
            isFilterFocused && styles.autocompleteContainerActive,
          ]}
          onFocus={() => toggleFocus(true)}
          onBlur={() => toggleFocus(false)}
        >
          <MagnifyingGlassIcon
            color="gray"
            size={20}
            style={{ marginRight: 7 }}
          />
          {/* <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
            className="flex-1"
          /> */}
          <Autocomplete
            data={filteredRestaurants}
            value={query}
            placeholder="Restaurants and Cuisines"
            onChangeText={(text) => setquery(text)}
            inputContainerStyle={{
              borderRadius: 10,
            }}
            flatListProps={{
              keyExtractor: (restaurant) => restaurant._id,
              renderItem: ({ item }) => (
                <RestaurantAutocompleteCard
                  restaurant={item}
                  resetQuery={resetQuery}
                />
              ),
            }}
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {/* Categories */}
        <Categories />
        {/* Featured rows */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
            restaurants={category.restaurants}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  autocompleteContainerActive: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    alignItems: "flex-start",
  },
});
export default HomeScreen;
