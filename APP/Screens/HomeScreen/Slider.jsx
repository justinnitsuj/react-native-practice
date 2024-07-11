import { View, Text, StyleSheet,FlatList} from 'react-native'
import React, { useEffect } from 'react'
import globalapi from '../../Utils/globalapi'
import { useState } from 'react'
import { Image } from 'react-native'
import Colors from '../../Utils/Colors'
import Heading from '../../Components/Heading'

export default function Slider() {
    const [slider,setSlider]=useState();
    useEffect(() => {
        getSlider();
    }, [])

    const getSlider=()=>{
        globalapi.getSlider().then(res=>{
            console.log("res",res.sliders);
            setSlider(res?.sliders)
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <View>
        <Heading text={'Offers for you'}/>
        <FlatList
            data={slider}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item,index})=>(
                <View style={{marginRight:20}}>
                    <Image source={{uri:item?.image?.url}} 
                    style={styles.sliderimg}/>
                   
                </View>
            )}
        />
    </View>
  )
}
const styles = StyleSheet.create({
    heading:{
        fontSize:20,
        fontWeight:'bold',
        padding:5
    },
    sliderimg:{
        width:270,
        height:150,
        borderRadius:50,
        
        objectFit:'cover'
    }
})