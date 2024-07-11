import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from './Header'
import Slider from './Slider'
import Categories from './Categories'
import Businesslist from './Businesslist'


export default function HomeScreen() {
  return (
    <View>
      {/* Header */}
      <Header/>
      <View style={{padding:20}}>
        {/* Slider */}
        <Slider/>
        {/* Categories */}
        <Categories/>
        {/* Businesslist */}
        <Businesslist/>
      </View>
    </View>
  )
}
