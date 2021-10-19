import React,{useState,useEffect} from 'react';
import { View, Text , TouchableOpacity,Button } from 'react-native';
import Axios from 'axios';
const Dashboard = ({ navigation, route: { params } }) => {
    const username = params;
    const [name,setName]=useState("");
const [phone,setPhone]=useState("");
const [roll,setRoll]=useState("");
const [fee,setFee]=useState("");
const [paid,setPaid]=useState("");
const [sClass,setClass]=useState("");
const [percent,setPercent]=useState("");


const getAttendance=(regN)=>{
        Axios.post('http://192.168.145.68:3001/fetch-student-attendance', {
        rollno: regN
    }).then((response) => {
            var Pcount = 0;
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].status === "Present") {
                    Pcount = Pcount + 1
                }
            }
            var percentage = (Pcount * 100) / response.data.length;
            setPercent(Math.floor(percentage)+"%");
      
    })

    
}

    useEffect(()=>{     
        Axios.post('http://192.168.145.68:3001/student-name',{
            username:username
        }).then((response)=>{
            setName(response.data[0].name);
            setPhone(response.data[0].phone);
           setRoll(response.data[0].roll);
            setFee(response.data[0].fee);
            setPaid(response.data[0].paid);
            setClass(response.data[0].class)
            getAttendance(response.data[0].roll);
        })


        
       },[])

       

    return (
        <View style={{ flex: 1, backgroundColor: '#161616', padding: 20 }}>
            <Text style={{ fontSize: 30, marginTop: 20, color: "#f1f1f1"}}>Hello,</Text>
            <Text style={{ textTransform: 'capitalize', fontSize: 35, color: "#f1f1f1" }}>{name}</Text>
            <Text style={{ marginTop: 30, fontSize: 20, color: '#f1f1f1',marginBottom:20 }}>Student details</Text>
       <Button title="Chat room" color='crimson' onPress={()=>navigation.navigate('Chat',{name,sClass})} />

            <View style={{ flex: 1, padding: 50, flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={{ backgroundColor: '#fc6b21', width: 100, height: 100, borderRadius: 8, padding: 10, marginRight: 50 }}>
                    <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>{sClass}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>Class</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Attendance',roll)}>
                <View style={{ backgroundColor: 'dodgerblue', width: 100, height: 100, borderRadius: 8, padding: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>{percent}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', letterSpacing: 0 }}>Attendance</Text>
                </View>
                </TouchableOpacity>
                <View style={{ backgroundColor: '#20b8fa', width: 250, height: 120, marginTop: 30, borderRadius: 8,padding:10 }}>
                <Text style={{fontSize:15,fontWeight: 'bold',textAlign: 'center'}}>Roll no</Text>
                <Text style={{fontSize:20,fontWeight: 'bold',textAlign:'center'}}>{roll}</Text>
                <Text style={{fontSize:15,fontWeight: 'bold',textAlign:'center'}}>Fees balance</Text>
                <Text style={{fontSize:20,fontWeight: 'bold',textAlign:'center'}}>{fee-paid===0  ? 'Fee paid' : fee-paid+' rs'}</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Result',{name,sClass})}>





            <View style={{fontSize:15,fontWeight: 'bold',color:"#000",height:40,width:250,backgroundColor:'#afa6db',padding:10,marginTop:30,borderRadius:8}}>
                <Text style={{textAlign: 'center',fontWeight: 'bold',fontSize:15}}>Click here for results</Text>
            </View>
            </TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.popToTop()}>
            <View style={{fontSize:15,fontWeight: 'bold',color:"#000",height:40,width:250,backgroundColor:'#9de89c',padding:10,marginTop:30,borderRadius:8}} >
                <Text style={{textAlign: 'center',fontWeight: 'bold',fontSize:15}}>Logout</Text>
            </View>
</TouchableOpacity>

            </View>



        </View>
    );
}

export default Dashboard;