import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { DataTable } from 'react-native-paper';
import Axios from 'axios';
import { Picker } from '@react-native-picker/picker';
const Result = ({ route: { params } }) => {
    const name = params.name;
    const sClass = params.sClass;
    const [selectedExam, setSelectedExam] = useState('internals1');
    const [data, setData] = useState('');


    function handleSelect() {
        Axios.post('http://192.168.145.68:3001/get-student-result', {
            class: sClass,
            name: name,
            exam: selectedExam
        }).then((response) => {
            if (response.data === false) {
                alert('Unexpected error occured');
            } else if (response.data.length > 0) {
                setData(response.data);
            } else {
                alert('No data has been uploaded for selected exam / the exam hasnt happened yet!');
                setData('');
            }
        })
    }



    return (

        <View style={{backgroundColor:'#161616',flex:1,alignItems:'center',padding:50}}>

            <Picker
            style={{width: 200,height:50 ,color:"#f1f1f1" }}
                selectedValue={selectedExam}
                dropdownIconColor={'dodgerblue'}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedExam(itemValue)
                }>
                <Picker.Item label="Internals 1" value="internals1" />
                <Picker.Item label="Internals 2" value="internals2" />
                <Picker.Item label="Mid-term" value="midterm" />
                <Picker.Item label="Final-exam" value="final" />
            </Picker>
          <View style={{width:100,marginBottom:20}}>
          <Button title="OK" onPress={() => handleSelect()} />
          </View>
           <View style={{flex: 1}} >
     {data!=='' ?     <DataTable style={{flex:1,backgroundColor:"white"}}>
        <DataTable.Header style={{backgroundColor:'teal',width:350}}>
          <DataTable.Title>Subject</DataTable.Title>
          <DataTable.Title>Max marks</DataTable.Title>
          <DataTable.Title>Total socred</DataTable.Title>
        </DataTable.Header>
        <FlatList
            keyExtractor={(item) => {
                return new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString(); 
            } }
              data={data}
              renderItem={({item,index}) => (
                <DataTable.Row >
          <DataTable.Cell style={{padding:20}}>{item.subject}</DataTable.Cell>
          <DataTable.Cell>{item.ttlMarks}</DataTable.Cell>
          <DataTable.Cell>{item.total_scored}</DataTable.Cell>
        </DataTable.Row>
              )}
            />
</DataTable> : null}
           </View>
           
                
        </View>
    );
}

export default Result;