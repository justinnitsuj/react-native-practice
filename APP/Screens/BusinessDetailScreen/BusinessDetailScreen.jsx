import { View, Text ,Image, StyleSheet, ScrollView, Modal} from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Utils/Colors'
import Heading from '../../Components/Heading';
import BusinessPhotos from './BusinessPhotos';
import BookingModal from './BookingModal';
import { Linking } from 'react-native';
export default function BusinessDetailScreen() {
  const param = useRoute().params;
    const [business, setBusiness] = useState(param.business)
    const navigation = useNavigation();
    const [isReadMore,setIsReadMore] = useState(false);
    const [showModal,setShowModal] = useState(false);
    useEffect(() => {
        
    }, [])


    const onMessage = () => {
        Linking.openURL('mailto:'+business?.email+'?subject=Hello, I am interested in your services. Please provide me more details.&body= Hi ,there')
    }
    return business && (
        <View style={{height:'99%'}}> 
            <ScrollView>
                <TouchableOpacity style={styles.backbtncon}
                onPress={() => {
                    console.log('Back button pressed');
                navigation.goBack()}
                }>
                <Ionicons name="chevron-back-outline" size={28} color="black" />
                </TouchableOpacity>
                <Image source={{ uri: business?.images[0]?.url }} style={{ width: '100%', height: 300 }} />
            
                <View style={styles.infocontainer}>
                    <Text style={{fontSize:25,fontWeight:'700'}}>{business?.name}</Text>
                    <View style={styles.subcon}>
                        <Text style={{fontSize:20,fontWeight:'600',color:Colors.Primary}}>{business?.contactPerson}🌟</Text>
                        <View style={{borderRadius:5,backgroundColor:Colors.Primary_light,padding:5}}>
                            <Text style={{color:Colors.Primary,fontSize:14}}>{business?.category.name}</Text>

                        </View>
                    </View>
                    <Text style={{fontSize:17,fontWeight:'500',color:Colors.gray}}>
                        <Ionicons name="location-sharp" size={25} color={Colors.Primary}/>
                    {business?.address}</Text>

                    {/* Horizontal line */}
                    <View style={{borderWidth:0.7,borderColor:Colors.gray,marginTop:20,marginBottom:20}}></View>
                    {/* About me Section */}
                    <View>
                        <Heading text={'About me'}/>
                        <Text style={{fontWeight:'400',fontSize:16,color:Colors.gray,lineHeight:25}} numberOfLines={isReadMore?20:3}>{business?.about}</Text>
                        <TouchableOpacity onPress={()=>setIsReadMore(!isReadMore)}>
                            <Text style={{color:Colors.Primary,fontSize:16,fontWeight:'400'}}>
                                {isReadMore?'Read Less':'Read More'}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Horizontal line */}
                    <View style={{borderWidth:0.7,borderColor:Colors.gray,marginTop:20,marginBottom:20}}></View>
                
                    <BusinessPhotos business={business}/>
                </View>
        
            </ScrollView>
            <View style={{display:'flex',flexDirection:'row',margin:8,gap:8}}>
                <TouchableOpacity style={styles.messagebtn}
                onPress={()=>onMessage()}
                >
                    <Text style={{textAlign:'center',fontWeight:'500',color:Colors.Primary,fontSize:18}}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookingbtn}
                onPress={()=>{setShowModal(true);
                    console.log('Book btn click');}}
                >
                    <Text style={{textAlign:'center',fontWeight:'500',color:Colors.White,fontSize:18}}>Book Now</Text>
                </TouchableOpacity>
            </View>
            {/* Booking Screen Modal */}
            <Modal
            animationType='slide'
            visible={showModal}
            >
                <BookingModal businessId={business.id} hideModal={()=>setShowModal(false)}/>
            </Modal>
        </View>
    );
    
}
const styles = StyleSheet.create({
    backbtncon:{
        position:'absolute',
        zIndex:10,
        paddingLeft:21,
        paddingTop:75
    },
    infocontainer:{
        padding:20,
        display:'flex',
        gap:7
    },
    subcon:{
        display:'flex',
        flexDirection:'row',
        gap:5,
        alignItems:'center'
    },
    messagebtn:{
        padding:15,
        backgroundColor:Colors.White,
        borderWidth:1,
        borderColor:Colors.Primary,
        borderRadius:99,
        textAlign:'center',
        flex:1
    },
    bookingbtn:{
        padding:15,
        backgroundColor:Colors.Primary,
        borderWidth:1,
        borderColor:Colors.Primary,
        borderRadius:99,
        textAlign:'center',
        flex:1
    }
})