import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import { client } from '../sanity'

const FeaturedRow = ({id,title,description,restaurants}) => {
    // const [restaurants,setRestaurants]=useState([]);
    // useEffect(()=>{
    //     console.log("USE EFFECT child",id)
    //     client.fetch(`*[_type == "featured" && _id == $id]{..., restaurants[]->{..., dishes[]->,type->{name}}}[0]`,{id})
    //     .then(data=>setRestaurants(data?.restaurants))
    //     .catch(e=>console.log(e))
    // },[id])
  return (
   <View>
     <View className="mt-4 flex-row items-center justify-between px-4">
      <Text className="font-bold text-lg">{title}</Text>
      <ArrowRightIcon color="#00CCBB"/>
    </View>
    <Text className="text-xs text-gray-500 px-4">{description}</Text>

    <ScrollView horizontal
    contentContainerStyle={{
        paddingHorizontal:15,
    }}

    showsHorizontalScrollIndicator={false}
    clasName="px-4"
    >
        {/* Restaurant Cards */}
        {restaurants.map(resto=>(
            <RestaurantCard 
            key={resto._id}
            id={resto._id}
            imgUrl={resto.image}
            title={resto.name}
            rating={resto.rating}
            genre={resto.genre}
            address={resto.address}
            short_description={resto.short_description}
            dishes={resto.dishes}
            long={resto.long}
            lat={resto.lat}
           />
        ))}
    </ScrollView>
   </View>
  )
}

export default FeaturedRow