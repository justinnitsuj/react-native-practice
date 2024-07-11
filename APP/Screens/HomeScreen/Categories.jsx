import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import globalapi from '../../Utils/globalapi'
import { useState } from 'react'
import Heading from '../../Components/Heading'
import { Image } from 'react-native'
import Colors from '../../Utils/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'
const {width}=Dimensions.get('window')

export default function Categories() {
    const [categories,setCategories]=useState();
    const navigation=useNavigation();
    useEffect(() => {
        getCategories();
    }, [])

    const getCategories=()=>{
        globalapi.getCategories().then(res=>{
            console.log("res",res.categories);
            setCategories(res?.categories)
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <View style={{marginTop:10}}>
        <Heading text={'Categories'} isViewAll={true}/>
        <FlatList
        data={categories}
        numColumns={4}
        renderItem={({item,index})=>index<=3&&(
            <TouchableOpacity style={styles.container}
            onPress={()=>navigation.push('business-list',{
                category:item.name
            
            })}>
                <View style={styles.iconcontainer}>
                    <Image source={{uri:item?.icon?.url}}
                    style={{width:30,height:30,borderRadius:30}}
                    />
                </View>
                <Text style={{fontWeight:'bold',marginTop:5}}>{item?.name}</Text>
            </TouchableOpacity>
        )}
        />
    </View>
  )
}
const styles = StyleSheet.create({
    iconcontainer:{
        backgroundColor:Colors.lightgray,
        padding:15,
        borderRadius:99
    },
    container:{
        width:width/4,
        alignItems:'center',
        justifyContent:'center',
        marginRight:-10
    }
})