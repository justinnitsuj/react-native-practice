import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from 'expo-linking';
WebBrowser.maybeCompleteAuthSession();
export default function Login() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
    
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
  return (
    <View style={{alignItems:'center'}}>
        <Image source={require('./../../../assets/images/login.jpg')} 
            style={styles.loginImage} 
        />
        <View style={styles.subContainer}>
            <Text style={{fontSize:27,color:Colors.White,textAlign:'center'}}> 
                Let's find 
                <Text style={{fontWeight:'bold'}} > professional cleaning and repair  
                </Text> service
            </Text>
            <Text style={{fontSize:17,color:Colors.White,textAlign:'center',marginTop:20}}>Lorem ipsum dolor sit amet consectetur adipisicing elitef erfefe fe fef.</Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={{textAlign:'center',color:Colors.Primary,fontWeight:'bold',fontSize:17}}>Get Started</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    loginImage:{
        width:230,
        height:450,
        marginTop:130,
        borderWidth:4,
        borderColor:Colors.Black,
        borderRadius:15
    },
    subContainer: {
        width: '100%',
        backgroundColor:Colors.Primary,
        height:'50%',
        marginTop:-70,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        
        padding:60
      },
    button:{
        padding:15,
        backgroundColor:Colors.White,
        borderRadius:99,
        marginTop:20
    }
});