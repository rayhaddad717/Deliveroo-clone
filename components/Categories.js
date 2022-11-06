import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import { client, urlFor } from '../sanity';

const Categories = () => {
  const [categories,setCategories]=useState([]);
  
  useEffect(()=>{
    client.fetch(`*[_type == "category"]`)
    .then(data=>setCategories(data))
    .catch(e=>console.log(e))
  },[])
  return (
    <ScrollView horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
      paddingHorizontal:15,
      paddingTop:10
    }}>
      {/* CategoryCard */}
      {categories.map(cat=>(
        <CategoryCard key={cat._id} imageUrl={urlFor(cat.image).width(200).url()} title={cat.name}/>
        ))}

      
      </ScrollView>
  )
}

export default Categories