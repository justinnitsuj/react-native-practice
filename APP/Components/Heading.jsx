import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Heading({text,isViewAll=false}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {text}
      </Text>
      {/* if viewall is true than show view all */}
      {isViewAll && <Text>View All</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    heading:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:8
    },
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
})