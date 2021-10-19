import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, ScrollView ,TouchableWithoutFeedback,Keyboard} from 'react-native';
import Axios from 'axios';

const ForgotPass = () => {
    const [userName, setUserName] = useState('');
    const [isOtpSent, setOtpSent] = useState(false);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [userOtp, setUserOtp] = useState('');
    const [otp, setOtp] = useState('');
    const [newPass, setNewPass] = useState('');

    function handleOtp() {
        Axios.post('http://192.168.145.68:3001/send-otp', {
            username: userName
        }).then((response) => {
            if (response.data === false) {
                alert('Username does not exists!!')
                setUserName('');
            } else if (response.data === 'Err') {
                alert('Unexpected error occured!!!')
            } else {
                setOtp(response.data);
                alert('OTP has been sent check your email.')
                setOtpSent(true);

            }
        })
    }


    function handleVerification() {
        if (otp == userOtp) {
            setAuthenticated(true);
            alert('Enter new password and save')
        } else {
            alert('You have entered wrong otp!!');
            setUserOtp('');
            setAuthenticated(false);
        }
    }


  function  handleChangePass(){
    if (newPass==='') {
        alert('Enter new password!!')
    } else {
        Axios.put('http://192.168.145.68:3001/student-pass-update', {
            username: userName,
            password: newPass
        }).then((response) => {
            if (response.data === false) {
                alert('unexpected error occured!')
            } else {
                alert('Password has been updated! try logging in.')
                setUserName('');
                setOtp('');
                setUserOtp('');
                setNewPass('');
               setAuthenticated(false);
               setOtpSent(false);
            }
        })
    }
    }

    return (
        <ScrollView>
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={{ flex: 1, backgroundColor: "#161616", alignItems: "center", height: 700 }}>
                <Image source={require('../assets/Images/reset.png')} style={{ width: 200, height: 200, marginTop: 50 }}></Image>
                <Text style={{ color: "#f1f1f1", fontSize: 30, marginTop: 10 }} >Reset your password!</Text>
                <View style={{ flex: 1, marginTop: 40 }}>
                    <TextInput
                        placeholder="Enter username"
                        style={{ color: "#f1f1f1", fontSize: 20, borderWidth: 0.5, padding: 10, width: 300, borderColor: "#fff", borderRadius: 5, marginBottom: 10 }}
                        placeholderTextColor="#f1f1f1"
                        onChangeText={(val) => setUserName(val)} defaultValue={userName} />
                    <Button title="Get otp" onPress={handleOtp} />
                    <View style={{ flex: 1 }}>
                        {isOtpSent ? <View style={{ flex: 1 }}>
                            <TextInput
                                placeholder="Enter Otp"
                                style={{ color: "#f1f1f1", fontSize: 20, borderWidth: 0.5, padding: 10, width: 300, borderColor: "#fff", borderRadius: 5, marginTop: 10, marginBottom: 10 }}
                                placeholderTextColor="#f1f1f1"
                                onChangeText={(val) => setUserOtp(val)} defaultValue={userOtp} />
                            <Button title="Verify otp" onPress={handleVerification} />
                        </View>
                            : null}

                        {isAuthenticated ? <View style={{ flex: 1 }}>
                            <TextInput
                                placeholder="Enter new password"
                                style={{ color: "#f1f1f1", fontSize: 20, borderWidth: 0.5, padding: 10, width: 300, borderColor: "#fff", borderRadius: 5, marginBottom: 10 }}
                                placeholderTextColor="#f1f1f1"
                                secureTextEntry
                                onChangeText={(val) => setNewPass(val)} defaultValue={newPass} />
                            <Button title="Change password" onPress={handleChangePass} />
                        </View> : null}
                    </View>

                </View>
            </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}

export default ForgotPass;