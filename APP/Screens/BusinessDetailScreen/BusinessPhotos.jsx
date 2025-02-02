import { View, Text } from 'react-native'
import React from 'react'
import Heading from '../../Components/Heading'
import { FlatList } from 'react-native-gesture-handler'
import { Image } from 'react-native'



export default function BusinessPhotos({business}) {
    
  return (
    <View>
    <Heading text={'Photos'} />
    <FlatList
      data={business?.images.slice(0, 3)}
      renderItem={({ item }) => (
        <Image source={{ uri: item.url }} style={{ width: '100%', height: 120,flex:1,borderRadius:15,margin:7}} />
      )}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      
      scrollEnabled={false}
    />
  </View>
  )
}