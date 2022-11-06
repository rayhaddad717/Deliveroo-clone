import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function CategoryCard({imageUrl,title}) {
    return (
    <TouchableOpacity className="relative mr-2 items-center justify-center flex-col">
        <Image source={{
            uri:imageUrl,
        }} 
        className="h-32 w-32 rounded"/>
        {/* <Image source={{uri:'https://links.papareact.com/wru'}} */}
      {/* /> */}
      <Text className="text-black text-center font-bold">{title}
      </Text>
    </TouchableOpacity>
  )
}