import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-react';
import { Image } from 'react-native';
import Colors from '../../Utils/Colors';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
export default function Header() {
    const {user,isLoading} = useUser(); 
  return user&&(
    <View style={styles.container}>
        {/* profile section */}
        <View style={styles.profilemark}>
            <View style={styles.profilecontainer}>
                <Image source={{uri:user?.imageUrl}} style={styles.userImage}/>
                <View>
                    <Text style={{color:Colors.White}}>Welcome,</Text>
                    <Text style={{color:Colors.White,fontSize:20}}>{user?.fullName}</Text>
                </View>
            </View>
            <Feather name="bookmark" size={27} color="white" />
        </View>
        {/* 搜尋欄 */}
        <View style={styles.searchbarcontainer}>
            <TextInput placeholder="Search" 
            style={styles.textinput}/>
            <View style={styles.searchbtn}>
                <FontAwesome 
                name="search" 
                size={24} 
                color={Colors.Primary} 
                />
            </View>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    userImage:{
        width:45,
        height:45,
        borderRadius:20
    },
    container:{
        padding:20,
        paddingTop:50,
        backgroundColor:Colors.Primary,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25
    },
    profilecontainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:15
    },
    profilemark:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    textinput:{
        backgroundColor:Colors.White,
        padding:7,
        borderRadius:8,
        paddingHorizontal:15,
        marginTop:10,
        width:'85%',
        fontSize:16
    },
    searchbarcontainer:{
        marginTop:15,
        display:'flex',
        flexDirection:'row',
        gap:10,
        marginBottom:5
    },
    searchbtn:{
        backgroundColor:Colors.White,
        padding:10,
        borderRadius:10,
        marginTop:10
    },
})