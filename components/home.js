import React,{useState,useEffect} from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native';
import * as Font from 'expo-font';
import { Entypo } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';


const Home = ({navigation}) => {
const [fontLoaded,setFontLoaded]=useState(false);

   const getFonts=()=>Font.loadAsync({
      qahiri:require('../assets/fonts/Qahiri-Regular.ttf')
})



      if(fontLoaded){
         return ( 
       
            <View style={{ flex:1,backgroundColor:'#ffc12b'}} >
               <Image source={require('../assets/Images/home1.png')} style={{width:420,height:450}}></Image>
              <View style={{flex:1,padding:20}} >
              <Text style={styles.text}>School Management System</Text>
    <View style={{position:'absolute',left:300,flex:1,top:120}}>
    <TouchableOpacity>
    <Entypo name="login" size={24} color="teal" style={styles.iconStyle} onPress={()=>navigation.navigate('Login')} />
    </TouchableOpacity>
    </View>
              </View>
            </View>
         );
      }else{
         return(
         <AppLoading
         startAsync={getFonts}
         onFinish={()=>setFontLoaded(true)}
         onError={console.warn}
          />
         )
      }
   
    }

const styles = StyleSheet.create({
   text:{
      fontSize:50,
      fontFamily:'qahiri',
      textTransform:'capitalize',
      letterSpacing:10,
      color:'#161616'
   },
   iconStyle:{
fontSize:70,
   }
})


export default Home;