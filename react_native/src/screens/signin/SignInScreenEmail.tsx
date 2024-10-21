import React from 'react'
import { StyleSheet, View, SafeAreaView, Pressable } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome'
// import { Input, Button } from 'react-native-elements'
import { Button, Text, Input } from '@ui-kitten/components'
import type { StackScreenProps } from '@react-navigation/stack'
import type { AuthStackParamList } from '../../navigation/authStack'

import auth from '@react-native-firebase/auth'

const SignInScreenEmail: React.FC<StackScreenProps<AuthStackParamList, 'SignInEmail'>> = ({ navigation }): React.JSX.Element => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  function SignIn (): void {
    async function SignInPromise (): Promise<void> {
      if (value.email === '' || value.password === '') {
        setValue({
          ...value,
          error: 'Email and password are mandatory.'
        })
        return
      }

      await auth().signInWithEmailAndPassword(value.email, value.password)
    }
    SignInPromise().catch((err) => {
      const error = (err instanceof Error) ? err.message : 'Unexpected error'
      setValue({
        ...value,
        error
      })
    })
  }

  return (

    <SafeAreaView style={styles.container}>

        <View>
            {/* need to fixt his later, this is used now for justify content: space between */}
        </View>

      <View style={styles.inputContainer}>
    <Text style={styles.heading} category='h2'>Login</Text>
    <Text style={styles.text} category='label'>Please sign in to continue</Text>

      {!(value.error === '') && <View style={styles.error}><Text>{value.error}</Text></View>}

        <Input
          placeholder='Email'
          style={styles.control}
          value={value.email}
          onChangeText={(text) => { setValue({ ...value, email: text }) }}
          />

        <Input
          placeholder='Password'
          style={styles.control}
          value={value.password}
          onChangeText={(text) => { setValue({ ...value, password: text }) }}
          secureTextEntry={true}
          />
        <Button style={styles.control} onPress={SignIn}>Sign In</Button>
      </View>

      <Pressable style={styles.loginContainer} onPress={() => { navigation.navigate('Welcome') }}>
     <Text>{"Don't have an account?"}</Text>
     <Text style={styles.buttonLogin}>Sign Up here</Text>
    </Pressable>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  inputContainer: {
    width: '80%'
  },

  heading: {
    marginBottom: 5,
    alignSelf: 'center'
  },

  text: {
    marginBottom: 20,
    alignSelf: 'center',
    color: 'grey'
  },

  loginContainer: {
    flexDirection: 'row'
  },

  buttonLogin: {
    fontWeight: 'bold',
    marginLeft: 5
  },

  control: {
    marginTop: 10
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF'
  }
})

export default SignInScreenEmail
