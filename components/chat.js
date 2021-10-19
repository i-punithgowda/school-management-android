import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, TextInput, Keyboard , ScrollView} from "react-native";
import { useBackHandler } from "@react-native-community/hooks"
import io from 'socket.io-client';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from "react-native-gesture-handler";

const ChatRoom = ({ navigation, route: { params } }) => {
    let username = params.name
    let room = params.sClass
    let socketRef = useRef();
    const flatlistRef = useRef();
    const connectedPort = "http://192.168.145.68:4000/";
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const backActionHandler = () => {
        socketRef.current.disconnect();
    }

    


    useEffect(() => {

        socketRef.current = io(connectedPort, { transports: ['websocket'] })
        socketRef.current.emit('joinRoom', { username, room })

       
    }, [])

    useEffect(() => {
        socketRef.current.on("message", (message) => {
            setChat(chat => [...chat, message]);
        })


    }, [])


    const handleSend=()=>{
        if (message !== '') {
            socketRef.current.emit('chatMessage', message);
        }
        setMessage('');
       Keyboard.dismiss()
    }

    useBackHandler(() => {
        backActionHandler();
    })
    return (
        <View style={{ flex: 1 , backgroundColor:'dodgerblue' }}>
            <FlatList
            ref={flatlistRef}
               keyExtractor={()=>{
                return new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString();
               }}
                data={chat}
                renderItem={({ item }) => (
                   
                        <View style={{ backgroundColor: '#161616', padding: 10, margin: 10, borderRadius: 5 }}>
                        
                            <Text style={{ fontSize: 15, color: "#f1f1f1", fontWeight: 'bold' }}>
                            <Ionicons name="person-circle" size={24} color="white" />
                           <Text> {item.username} : {item.text} - {item.time}</Text> </Text>
                        </View>

                )}
                onContentSizeChange={() => flatlistRef.current.scrollToEnd({ animated: true })}
            />
            <View >
                <TextInput placeholder="Enter username"
                    placeholderTextColor="#161616"
                    style={{ fontSize: 15, padding: 10,  justifyContent: 'center', alignItems: 'center', backgroundColor:"#f1f1f1" }}
              onChangeText={(val) =>setMessage(val)}
              defaultValue={message}
                />
                <TouchableOpacity style={{ backgroundColor: 'crimson',  width: 70, height: 50, flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute',left:350}} onPress={handleSend} >
                    <Text style={{ color: "#f1f1f1", fontWeight: 'bold' }}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ChatRoom;
