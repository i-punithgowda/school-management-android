import React,{useState,useEffect} from 'react';
import {View,Text,FlatList,Button} from 'react-native';
import Axios from 'axios';
import { DataTable } from 'react-native-paper';


const Attendance = ({navigation,route:{params}}) => {
    const roll=params;
    const [ttlClass, setTotal] = useState('');
    const [present, setPresent] = useState('');
    const [absent, setAbsent] = useState('');
    const [percent, setPercent] = useState('');
    const [attendance, setAttendance] = useState('');
    useEffect(() => {
        Axios.post('http://192.168.145.68:3001/fetch-student-attendance', {
            rollno: roll
        }).then((response) => {
            if (response.data === false) {
                alert('No data found for this register number')
            } else {
                setTotal(response.data.length);
                var Pcount = 0;
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].status === "Present") {
                        Pcount = Pcount + 1
                    }
                }
                setPresent(Pcount);
                var Acount = 0
                for (i = 0; i < response.data.length; i++) {
                    if (response.data[i].status === "Absent") {
                        Acount = Acount + 1;
                    }
                }
                setAbsent(Acount)
                var percentage = (Pcount * 100) / response.data.length;
                setPercent(Math.floor(percentage));
            }
        })
    }, [])


    function handlePress(){
        Axios.post('http://192.168.145.68:3001/getAttendance', {
            roll: roll,    
        }).then((response) => {
                setAttendance(response.data);
        })

    }


   
   
    return ( 
        <View style={{ flex: 1, backgroundColor: '#161616', padding: 20 }}>
              <View style={{ flex: 1, padding: 50, flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={{ backgroundColor: '#fc6b21', width: 120, height: 100, borderRadius: 8, padding: 10,marginRight:20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>Total</Text>
                    <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>{ttlClass}</Text>
                </View>
                <View style={{ backgroundColor: 'dodgerblue', width: 120, height: 100, borderRadius: 8, padding: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>Present</Text>
                    <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', letterSpacing: 0 }}>{present}</Text>
                </View>
                <View style={{ backgroundColor: '#129476', width: 120, height: 100, borderRadius: 8, padding: 10,marginRight:20,marginTop:10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>Absent</Text>
                    <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', letterSpacing: 0 }}>{absent}</Text>
                </View>
                <View style={{ backgroundColor: '#e95f8a', width: 120, height: 100, borderRadius: 8, padding: 10,marginTop:10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>Percent</Text>
                    <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', letterSpacing: 0 }}>{percent}</Text>
                </View>
        </View>
<View style={{flex:1}}>
<Button title="View all attendance" color="green" onPress={handlePress}  />
{attendance!=='' ? <DataTable style={{flex:1,backgroundColor:"white"}}>
        <DataTable.Header style={{backgroundColor:'white'}}>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Subject</DataTable.Title>
          <DataTable.Title >Status</DataTable.Title>
        </DataTable.Header>

<FlatList
 keyExtractor={(item) => {
                return new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString(); 
            } }
              data={attendance}
              renderItem={({item}) => (
                <DataTable.Row>
          <DataTable.Cell>{item.date}</DataTable.Cell>
          <DataTable.Cell>{item.subject}</DataTable.Cell>
          <DataTable.Cell>{item.status}</DataTable.Cell>
        </DataTable.Row>
              )}
            />
            </DataTable> : null}
 </View>
        </View>
        );
}
 
export default Attendance;