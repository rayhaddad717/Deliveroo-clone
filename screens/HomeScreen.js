import { View, Text, SafeAreaView,Image, Alert,StatusBar, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {ChevronDownIcon,UserIcon,AdjustmentsHorizontalIcon,MagnifyingGlassIcon, AdjustmentsVerticalIcon} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
const HomeScreen = () => {
    
    const navigation = useNavigation();
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false,
        })
    },[])
  return (
    <SafeAreaView className="bg-white" style={{marginTop:StatusBar.currentHeight+7}}>
      {/* Header */}
      <View className="flex-row items-center mx-4 space-x-2 px-2">
        <Image source={{uri:'https://links.papareact.com/wru'}}
        className="h-7 w-7 bg-gray-700 p-4 rounded-full"/>
        <View className="flex-1" >
            <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
            <Text className="font-bold text-xl">Current Location <ChevronDownIcon size={20} color="#00CC88"/></Text>
        </View>
            <UserIcon size={35} color="#00CC88"/>
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
            <MagnifyingGlassIcon  color="gray" size={20} />
            <TextInput placeholder='Restaurants and cuisines' 
            keyboardType='default' className="flex-1" />
        </View>
            <AdjustmentsVerticalIcon  color="#00CC88" />
      </View>


      {/* Body */}
      <ScrollView className="bg-gray-100 ">
        {/* Categories */}
        {[1,2,3,4,5,6,7,].map((e)=>(
            <Categories key={e}/>
        ))}
        {/* Featured rows */}
      </ScrollView>
    </SafeAreaView>


  )
}

export default HomeScreen