import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import globalapi from '../../Utils/globalapi'
import { useUser } from '@clerk/clerk-expo';
import { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Businesslistitem from '../../Screens/BusinesslistByCategoryScreen/Businesslistitem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
export default function BookingScreen() {
  const {user} = useUser();
  const [bookinglist, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    user&&getUserBooking();
  }, [user])
  const getUserBooking = async ()=>{
    setLoading(true);
    globalapi.getUserBooking(user.primaryEmailAddress.emailAddress).then((res)=>{
      setBookingList(res.bookings);
      setLoading(false);
    }
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ padding: 20, paddingTop: 50}}>
          <Text style={{ fontWeight: '500', fontSize: 26,paddingBottom:10 }}>My Bookings</Text>
          
          <FlatList
            data={bookinglist}
            onRefresh={() => getUserBooking()}
            refreshing={loading}
            renderItem={({ item, index }) => (
              <Businesslistitem 
                business={item?.businesslist}
                booking={item}
              />
            )}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
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