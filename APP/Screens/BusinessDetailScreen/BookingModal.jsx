import { View, Text, StyleSheet, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import { useState } from 'react';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import globalapi from '../../Utils/globalapi';
import { useUser } from '@clerk/clerk-expo';
import { Alert } from 'react-native';
import moment from 'moment';

export default function BookingModal({businessId,hideModal}) {
    LogBox.ignoreLogs([
        'Warning: Day: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
      ]);
      
    const [selectedTime, setSelectedTime] = useState();
    const [timeList , setTimeList] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [note, setNote] = useState();
    const {user} = useUser();
    useEffect(() => {
        getTime();
    }, [])
    const getTime = () => {
        const timeList = [];
        for (let i=8;i<=12;i++)
        {
            timeList.push({
                time:i+':00 AM'
            })
            timeList.push({
                time:i+':30 AM'
            })
        }
        for (let i=1;i<=7;i++)
            {
                timeList.push({
                    time:i+':00 PM'
                })
                timeList.push({
                    time:i+':30 PM'
                })
            }
        setTimeList(timeList);
    }

    // Create Booking Method
    const createBooking = async ()=>{
        if(!selectedTime||!selectedDate)
        {
            Alert.alert('Error', 'Please select Date and Time');         
            return;
        }
        const data = {
            userName:user?.fullName,
            userEmail:user?.primaryEmailAddress?.emailAddress,
            time:selectedTime,
            date:moment(selectedDate).format('DD-MM-YYYY'),
            note:note,
            businessId:businessId
        }

        try {
            const res = await globalapi.createBooking(data);
            console.log('res ', res);
            Alert.alert('Success', 'Booking Created Successfully');
            hideModal();
        } catch (error) {
            console.error('Booking creation error:', error);
            Alert.alert('Error', 'Failed to create booking. Please try again.');
        }
    }
  return (
    <ScrollView>
        <KeyboardAvoidingView style={{padding:21,
            paddingTop:75}}
            keyboardVerticalOffset={50}
            behavior={'position'}>
        <TouchableOpacity style={{marginBottom:20,display:'flex',alignItems:'center',flexDirection:'row'}}
        onPress={()=>hideModal()}
        >

            <Ionicons name="chevron-back-outline" size={28} color="black" style={{paddingRight:10}}/>
            <Text style={{fontSize:25,fontWeight:'500'}}>Booking</Text>
        </TouchableOpacity>

        {/* Calendar Section */}
        <Heading text={'Select Date'}/>
        <View style={styles.calerdarcon}>
            <CalendarPicker
                onDateChange={setSelectedDate}
                width={340}
                minDate={Date.now()}
                todayBackgroundColor={Colors.Black}
                todayTextStyle={{color:Colors.White}}
                selectedDayColor={Colors.Primary}
                selectedDayTextStyle={{color:Colors.White}}
            />
        </View>

            {/* Time select section */}
            <View style={{marginTop:20}}>
                <Heading text={'Select Time Slot'}/>
                <FlatList
                    data={timeList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item})=>(
                        <TouchableOpacity style={{marginRight:10}}
                        onPress={()=>setSelectedTime(item.time)}
                        >
                            <View  style={[selectedTime==item.time?
                                    styles.selecttime:styles.unselecttime]}>
                                <Text style={[selectedTime==item.time?
                                    styles.selecttimetext:styles.unselecttimetext]}>{item.time}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
                {/* Note select */}
                <View style={{paddingTop:20}}>
                    <Heading text={'Any Suggestion Note'}/>
                    <TextInput placeholder='Note' 
                    numberOfLines={4}
                    multiline={true}
                    style={styles.notetextarea}
                    onChangeText={(text)=>setNote(Text)}
                    />
                </View>
            {/* Conforation btn */}
            <TouchableOpacity style={{marginTop:15}}
            onPress={createBooking}
            >
                <View style={styles.confirmbtn}>
                    <Text style={{color:Colors.White,
                            textAlign:'center',
                            fontWeight:'600',
                            fontSize:17}}>
                        Comfirm & Book
                    </Text>
                </View>
            </TouchableOpacity>



        </KeyboardAvoidingView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    calerdarcon:{
        borderRadius:15,
        padding:20,
        backgroundColor:Colors.Primary_light
    },
    selecttime:{
        padding:15,
        borderWidth:1,
        borderColor:Colors.Primary,
        borderRadius:99,
        paddingHorizontal:18,
        backgroundColor:Colors.Primary,
        color:Colors.White
    },
    unselecttime:{
        padding:15,
        borderWidth:1,
        borderColor:Colors.Primary,
        borderRadius:99,
        paddingHorizontal:18,
    },
    selecttimetext:{
        color:Colors.White
    },
    unselecttimetext:{
        color:Colors.Black
    },
    notetextarea:{
        borderWidth:1,
        borderRadius:15,
        textAlignVertical:'top',
        padding:20,
        fontSize:16,
        fontWeight:'500',
        height:100,
        borderColor:Colors.Primary
    },
    confirmbtn:{ 
        backgroundColor:Colors.Primary,
        padding:13,
        borderRadius:99,
        elevation:2,
    }
})