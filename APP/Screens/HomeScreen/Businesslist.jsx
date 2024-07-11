import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Heading from '../../Components/Heading'
import globalapi from '../../Utils/globalapi'
import { useState } from 'react'
import Businesslistitemsmall from './Businesslistitemsmall'


export default function Businesslist() {
    const [businesslist,setBusinesslist]=useState();
    useEffect(() => {
        getBusinesslist();
    }, [])
    const getBusinesslist=()=>{
        globalapi.getBusinesslist().then(res=>{
            console.log("res",res.businesslists);
            setBusinesslist(res?.businesslists)
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <View style={{marginTop:20}}>
      <Heading text={'Latest Business'} isViewAll={true}/>
      <FlatList
      data={businesslist}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
        <View style={{marginRight:10}}>
            <Businesslistitemsmall business={item}/>
        </View>
        )}
      />
    </View>
  )
}