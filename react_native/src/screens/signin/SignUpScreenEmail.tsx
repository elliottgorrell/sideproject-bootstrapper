import React from 'react'
import { StyleSheet, View, SafeAreaView, Pressable } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome'
import { Input, Button, Text } from '@ui-kitten/components'
import type { StackScreenProps } from '@react-navigation/stack'
import auth from '@react-native-firebase/auth'

import type { AuthStackParamList } from '../../navigation/authStack'

const SignUpScreen: React.FC<StackScreenProps<AuthStackParamList, 'SignUpEmail'>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    name: '',
    email: '',
    password: '',
    error: ''
  })

  function signUp (): void {
    async function signUpPromise (): Promise<void> {
      if (value.email === '' || value.password === '' || value.name === '') {
        setValue({
          ...value,
          error: 'All fields are mandatory.'
        })
        return
      }

      const userCredential = await auth().createUserWithEmailAndPassword(value.email, value.password)
      await userCredential.user.updateProfile({
        displayName: value.name
      })
    }
    signUpPromise().catch((err) => {
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

      <View style={styles.controls}>
        <Text style={styles.heading} category='h2'>Sign Up</Text>
        <Text style={styles.text} category='label'>Please sign up to continue</Text>

        {!(value.error === '') && <View style={styles.error}><Text>{value.error}</Text></View>}

        <Input
          placeholder='Name'
          style={styles.control}
          value={value.name}
          onChangeText={(text) => { setValue({ ...value, name: text }) }}
        />

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

        <Button style={styles.control} onPress={signUp}>Sign Up</Button>
      </View>

      <View>
        <Pressable style={styles.loginContainer} onPress={() => { navigation.navigate('SignInEmail') }}>
          <Text style={styles.textLogin}> Existing member?</Text>
          <Text style={styles.buttonLogin}>Log in here</Text>
        </Pressable>
      </View>

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

  heading: {
    marginBottom: 5,
    alignSelf: 'center'
  },

  text: {
    marginBottom: 20,
    alignSelf: 'center',
    color: 'grey'
  },

  controls: {
    width: '80%'
  },

  control: {
    marginTop: 10
  },

  textLogin: {
    alignSelf: 'center'
  },

  loginContainer: {
    flexDirection: 'row'

  },

  buttonLogin: {
    fontWeight: 'bold',
    marginLeft: 5
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF'
  }
})

export default SignUpScreen
