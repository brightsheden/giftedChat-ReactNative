// @flow strict

import React,{useState} from 'react';
import {View,Text,StyleSheet}  from 'react-native'
import {Input, Button} from 'react-native-elements'
import {auth}  from '../firebase';

function RegisterScreen({navigation}) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const register = ()=>{
       


    auth.createUserWithEmailAndPassword( email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        user.updateProfile({
            displayName: name,
            photoUrl: imageUrl ? imageUrl : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fprofile-avatar&psig=AOvVaw1CIxxPV-InvnXtGINggPbV&ust=1652023107489000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJj92PHXzfcCFQAAAAAdAAAAABAD"
        }).then(function (){
            //update successfull
        } ).catch( function (error){
            //an error occure
        })

        //navigation.replace('Chat')
        navigation.popToTop()
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //alert(errorMessage)
    });
    }

    return (
        <View style={styles.container}>
             <Input
            placeholder="Enter your name"
            label="Name"
            leftIcon={{type: 'material', name: 'bagde'}}
            value={name}
            onChangeText={text => setName(text)}
            />

            <Input
            placeholder="Enter your email"
            label="Email"
            leftIcon={{type: 'material', name: 'email'}}
            value={email}
            onChangeText={text => setEmail(text)}
            />

        <Input
            placeholder="Enter your Password"
            label="Password"
            leftIcon={{type: 'material', name: 'lock'}}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            />

        <Input
            placeholder="profile pic"
            label="Profile Picture"
            leftIcon={{type: 'material', name: 'face'}}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
            />
            <Button title="Register" style={styles.button} onPress={register()}  />
           
        </View>
    );
};

const styles = StyleSheet.create({
    button : {
        width: 200,
        marginTop: 10
    },
    container:{
        flex: 1,
        alignItems: 'center',
        padding: 10
    }
})

export default RegisterScreen;