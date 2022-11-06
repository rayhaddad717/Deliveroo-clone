import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
const RestaurantAutocompleteCard = ({ restaurant,resetQuery }) => {
    const navigation = useNavigation();
    const goToRestaurant = (resto)=>{
        resetQuery();
        navigation.navigate('Restaurant',{
                key:resto._id,
                id:resto._id,
                imgUrl:resto.image,
                title:resto.name,
                rating:resto.rating,
                genre:resto.genre,
                address:resto.address,
                short_description:resto.short_description,
                dishes:resto.dishes,
                long:resto.long,
                lat:resto.lat,
        })
      }
  return (
    <TouchableOpacity onPress={() => goToRestaurant(restaurant)}>
      <View
        className="flex-row space-x-5 my-3"
      >
        <Image
          source={{
            uri: urlFor(restaurant?.image).url(),
          }}
          className="w-12 h-12 rounded-full"
        />
        <View>
          <Text className="text-md">{restaurant?.name}</Text>
          <Text className="text-sm">{restaurant?.short_description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantAutocompleteCard;
