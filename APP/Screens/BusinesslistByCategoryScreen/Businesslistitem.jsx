import { View, Text , Image, StyleSheet} from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function Businesslistitem({business,booking}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.push('business-detail',
      {
        business:business
      }
    )}>
     <Image source={{uri:business?.images[0]?.url}}
       style={styles.image}          
      />
      <View style={styles.subcontainer}>
        <Text style={{fontWeight:'700',color:Colors.gray}}>{business.contactPerson}</Text>
        <Text style={{fontWeight:'600',fontSize:19}}>{business.name}</Text>
        
        {!booking?.id? <Text style={{fontWeight:'600',color:Colors.gray,fontSize:13}}>
        <Ionicons name="location-sharp" size={24} color={Colors.Primary}/>
            {business.address}</Text>
          :
          <View style={{borderRadius:5,overflow:'hidden',alignSelf:'flex-start'
          }}>  
            <Text style={[{padding:5,fontSize:14,alignSelf:'flex-start'},
            booking?.bookingStatus=='Completed'?
            {backgroundColor:Colors.Primary_light,color:Colors.White}:
            booking?.bookingStatus=='Cancelled'?
            {backgroundColor:Colors.red,color:Colors.White}:
            {color:Colors.Primary,
              backgroundColor:Colors.Primary_light,}]}>
                {booking?.bookingStatus}</Text>
          </View>
        }
        {booking?.id?
        <Text style={{fontWeight:'500',color:Colors.gray,fontSize:14,}}>
          <AntDesign name="calendar" size={20} color={Colors.Primary}/>
          {"   "}
          {booking.date} at {booking.time}</Text>
        :null
        }
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    image:{
        width:100,
        height:100,
        borderRadius:15
        
    },
    container:{
        padding:10,
        backgroundColor:Colors.White,
        borderRadius:15,
        marginBottom:15,
        display:'flex',
        flexDirection:'row',
        gap:10,
    },
    subcontainer:{
        width:'70%',
        display:'flex',
        gap:8,
        
    }
})