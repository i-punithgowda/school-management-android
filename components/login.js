import React, { useState } from 'react';
import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, StyleSheet ,Button } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Axios from 'axios';
const Login = ({navigation}) => {
    const [notVisible, setVisible] = useState(true)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

const handlePress=()=>{
    if(username==='' || password===''){
        alert("Enter both username and password!!!")
    }else{
       Axios.post('http://192.168.145.68:3001/student-login',{
           username:username,
           password:password
       }).then((response)=>{
          if(response.data===true){
            alert("Welcome "+username);
            setUsername('');
            setPassword('');
            navigation.navigate('Dashboard',username)
          }else{
            alert(response.data);
            setUsername('');
            setPassword('');
          }
       })
    }
}

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, backgroundColor: '#23222a',textAlign: 'center',alignItems: 'center'}}>
                <View style={{ padding: 40 }}>
                    <Text style={{ fontSize: 30, color: '#f1f1f1', fontWeight: 'bold', marginBottom: 10 }}>Lets sign you in.</Text>
                    <Text style={{ fontSize: 25, color: '#f1f1f1' }}>Welcome back. </Text>
                    <Text style={{ fontSize: 25, color: '#f1f1f1' }}>You've been missed!</Text>
                </View>

              
                    <TextInput placeholder="Enter username"
                        style={styles.fields}
                        placeholderTextColor="#f1f1f1"
                        onChangeText={(val)=>setUsername(val)}
                        defaultValue={username}
                    />

                    <TextInput
                        autoCorrect={false}
                        secureTextEntry={notVisible}
                        style={styles.fields}
                        placeholder="Enter password"
                        placeholderTextColor="#f1f1f1"
                        onChangeText={(val)=>setPassword(val)}
                        defaultValue={password}
                    />

<Entypo name={notVisible ? 'eye' : 'eye-with-line'} size={24} color="white" style={{position: "absolute",left:340,top:320}} onPress={()=>notVisible ? setVisible(false) : setVisible(true)} />
             
             <View style={{marginTop:200}}>
                 <TouchableOpacity>
                     <Text style={{fontSize:15,color: '#f1f1f1',marginBottom:10}}>Forgot your password? <Text style={{fontWeight:'bold'}} onPress={()=>navigation.navigate('ForgotPass')}>Click here</Text></Text>
                    <Button title="Login" color="crimson" onPress={handlePress} />
                </TouchableOpacity>
             </View>
             
                </View>

                
                       </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    fields: {
        fontSize: 15,
        fontWeight: "bold",
        color: '#f1f1f1',
        padding: 10,
        borderRadius: 3,
        width: 350,
        margin:20,
        borderWidth:0.4,
        borderColor:"#aaa",
        flexDirection:'row'
    }
})


export default Login;
