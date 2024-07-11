import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PageBack({title}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{display:'flex',alignItems:'center',flexDirection:'row'}}
      onPress={()=>navigation.goBack()}
      >

        <Ionicons name="chevron-back-outline" size={28} color="black" style={{paddingRight:10}}/>
        <Text style={{fontSize:25,fontWeight:'500'}}>{title}</Text>
      </TouchableOpacity>
  )
}