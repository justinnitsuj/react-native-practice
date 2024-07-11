import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import Colors from '../../Utils/Colors'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
export default function Businesslistitemsmall({business}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.push('business-detail',
      {business:business}
    )}>
        <Image source={{uri:business?.images[0]?.url}} 
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={{fontSize:17,fontWeight:'600'}}>{business?.name}</Text>
        <Text style={{fontSize:13,fontWeight:'500',color:Colors.gray}}>{business?.contactPerson}</Text>
        <View style={{borderRadius:5,
                backgroundColor:Colors.Primary_light,
                alignSelf:'flex-start',
                paddingHorizontal:7}}>
            <Text style={{
                fontSize:10,
                fontWeight:'400',
                padding:5,
                color:Colors.Primary,
                
                    
            }}>{business?.category.name}
            </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    image:{
        width:160,
        height:80,
        borderRadius:10,
        
    },
    container:{
        padding:10,
        backgroundColor:Colors.White,
        borderRadius:10,   
    },
    info:{
        padding:7,
        display:'flex',
        gap:5,
    }
})