// @flow strict

import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet}  from 'react-native'
import {Input, Button} from 'react-native-elements'
import {auth} from '../firebase'

function LoginScreen({navigation}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    
        
        const signIn = () => {
            auth.signInWithEmailAndPassword(email,password)
            .catch((error)=>{
                var errorMessage = error.message;
                console.log(errorMessage)
            })

    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged
        (
            function(user){
                if (user){
                    //user signed in
                    navigation.replace('Chat')
                }
                else{
                    //No user is signed in,
                    navigation.canGoBack()&& navigation.popToTop()
                }
            }
        )
        return unsubscribe
    },[])
    return (
        <View style={styles.container}>
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
            <Button title="Login" style={styles.button} onPress={signIn()}  />
            <Button title="Register" style={styles.button} onPress={()=> navigation.navigate('Register')} />
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

export default LoginScreen;