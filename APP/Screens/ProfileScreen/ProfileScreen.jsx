import { View, Text, StyleSheet } from 'react-native'
import React, { act } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { useUser } from '@clerk/clerk-react';
import { Image } from 'react-native';
import { FlatList } from 'react-native';
import { id } from 'date-fns/locale';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@clerk/clerk-react';
import { useClerk } from '@clerk/clerk-react';
import { Alert } from 'react-native';
export default function ProfileScreen({business}) {
  const { signout } = useAuth();
  const navigation = useNavigation();
  const {user} = useUser();
  const clerk = useClerk();
  const profileMenu = [
    {
      id: 1,
      name:'Home',
      icon:'home',
      action: () => navigation.navigate('home', {business: business})
    },
    {
      id: 2,
      name:'My Booking',
      icon:'bookmark-sharp',
      action: () => navigation.navigate('booking', {business: business})
    },
    {
      id: 3,
      name:'Contact Us',
      icon:'call',
      action:()=>{}
    },
    {
      id: 4,
      name:'Logout',
      icon:'log-out',
      action: () => handleout()
    }
  ]
  const handleout = () => {
    Alert.alert(
      "確定登出",
      "您確定要登出嗎?",
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "確定", onPress: async() => {
            try{
              await clerk.signOut();

            }
            catch(error){
              console.error('登出失敗:',error);
              Alert.alert('登出失敗',"請稍後再試");
            }
          }
        }
      ]
    )
  }

  
  return (
    <View>
    <View style={{padding:30,paddingTop:30,backgroundColor:Colors.Primary}}>
      <Text style={{fontSize:25,fontWeight:'700',color:Colors.White,paddingTop:30}}>Profile</Text>
      <View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        backgroundColor:Colors.Primary,
      }}>
        <Image source={{uri:user.imageUrl}}
        style={{width:100,height:100,borderRadius:99,marginTop:20}}
        />
        <Text style={{fontSize:26,marginTop:8,fontWeight:'600',color:Colors.White}}>{user?.fullName}</Text>
        <Text style={{fontSize:18,marginTop:8,fontWeight:'600',color:Colors.White}}>{user?.primaryEmailAddress.emailAddress}</Text>

      </View>
      </View>
      <View style={{paddingTop:60}}>
        <FlatList
        data={profileMenu}
        renderItem={({item})=>(
          <TouchableOpacity style={{display:'flex',flexDirection:'row',alignItems:'center',gap:10,marginBottom:40,paddingHorizontal:80}}
          onPress={item.action}
          >
            <Ionicons name={item.icon} size={35} color={Colors.Primary} />
            <Text style={{fontSize:20,fontWeight:'500'}}>{item.name}</Text>
          </TouchableOpacity>
        )}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  text:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    paddingTop:50
  }
})