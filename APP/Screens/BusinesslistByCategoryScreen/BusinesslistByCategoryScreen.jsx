import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import globalapi from '../../Utils/globalapi';
import Businesslistitem from './Businesslistitem';
import { useState } from 'react';
import Colors from '../../Utils/Colors';
import PageBack from '../../Components/PageBack';


export default function BusinesslistByCategoryScreen() {
    const param = useRoute().params;
    const navigation = useNavigation();

    const [businesslist, setBusinesslist] = useState([]);
    useEffect(() => {
        
        param&&getBusinessByCategory();
    }, [param])

    const getBusinessByCategory = () => {
        globalapi.getBusinesslistByCategory(param.category).then(res => {
            console.log("res", res.businesslists);
            setBusinesslist(res?.businesslists);
        }).catch(err => {
            console.log(err)
        })
    }
    return (
    <View style={{padding:20,paddingTop:70}}>
      <PageBack title={param.category}/>
      {businesslist?.length>0? <FlatList
        style={{marginTop:20}}
        data={businesslist}
        renderItem={({item})=>(
          <Businesslistitem business={item}/>
        )}
      />:
      <Text style={{fontWeight:'600',fontSize:20,textAlign:'center',marginTop:'20%',color:Colors.gray}}>No Business Found</Text>
      }
    </View>
  )
}