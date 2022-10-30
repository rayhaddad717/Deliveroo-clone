import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import { client } from '../sanity'

const FeaturedRow = ({id,title,description}) => {
    // useEffect(()=>{
    //     client.fetch(`*[]`)
    // },[])
  return (
   <View>
     <View className="mt-4 flex-row items-center justify-between px-4">
      <Text className="font-bold text-lg">{title}</Text>
      <ArrowRightIcon color="#00CC88"/>
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
        {[1,2,3].map(e=>(
            <RestaurantCard 
            key={e}
            id={123}
            imgUrl="https://links.papareact.com/gn7"
            title="Yo! Sushi"
            rating={4.5}
            genre="Japanese"
            address="123 Main St"
            short_description="This is a short description"
            dishes={[]}
            long={20}
            lat={0}
           />
        ))}
    </ScrollView>
   </View>
  )
}

export default FeaturedRow