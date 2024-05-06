import React from 'react'
import { Text, View } from 'react-native'
import { useUser } from '@clerk/clerk-expo';

export default function Header()  {
  const {isLoaded,isSignIn,user}=useUser();
  if(!isLoaded||!isSignIn){
    return null
  }
    return (
      <View >
        <Text>{user.fullName} </Text>
      </View>
    )
  }

