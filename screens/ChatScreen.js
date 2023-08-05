// @flow strict

import React,{useCallback,useEffect, useLayoutEffect, useState}  from 'react';
import { Text } from 'react-native';
import {View} from 'react-native'
import { Avatar, Button, Input } from 'react-native-elements';
import { auth, db } from '../firebase';
import {AntDesign} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {GiftedChat} from 'react-native-gifted-chat'

function ChatScreen({navigation}) {

    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerLeft: ()=>{
                <View>
                    <Avatar rounded source={{url: auth?.currentUser.photoURL}}/>
                </View>

            },
            headerRight: ()=>( 
            <TouchableOpacity style={{marginRight: 30}} onPress={signOut}>
                <AntDesign name='logout' size={24} color="black"/>

            </TouchableOpacity>
                
            )
        })
       
    },[])
    const signOut = ()=>{

        auth.signOut().then(()=>{
            //sign-out successful
            navigation.replace('Login')

        }).catch((error)=>{
            var errorMessage = error.message
            alert(errorMessage)
        })
    }
    const [messages, setMessages] = useState([]);
 
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  useLayoutEffect(()=> {
      const unsubscribe = db.collection('chats').orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
          snapshot.docs.map(doc => ({
              _id:doc.data()._id,
              createdAt:doc.data().createdAt.toDate(),
              text:doc.data().text,
              user: doc.data().user
          }))
      ))

      return unsubscribe

     

  },[])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
        _id,
        createdAt,
        text,
        user
    } = messages[0]
    db.collection('chats').add({
        _id,
        createdAt,
        text,
        user
    })
  }, [])

    return (
         <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name:auth?.currentUser?.displayName,
        avatar:auth?.currentUser?.photoURL,
      }}
    />
    );
};

export default ChatScreen;