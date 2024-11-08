import React from 'react';
import { View, SafeAreaView, Pressable, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from '@/components/ui';
import type { StackScreenProps } from '@react-navigation/stack';
import type { AuthStackParamList } from '@/navigation/authStack';
import auth from '@react-native-firebase/auth';

const SignInScreenEmail: React.FC<
  StackScreenProps<AuthStackParamList, 'SignInEmail'>
> = ({ navigation }): React.JSX.Element => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  });

  function SignIn(): void {
    async function SignInPromise(): Promise<void> {
      if (value.email === '' || value.password === '') {
        setValue({
          ...value,
          error: 'Email and password are mandatory.',
        });
        return;
      }

      await auth().signInWithEmailAndPassword(value.email, value.password);
    }
    SignInPromise().catch((err) => {
      const error = err instanceof Error ? err.message : 'Unexpected error';
      setValue({
        ...value,
        error,
      });
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Please sign in to continue</Text>
        {!(value.error === '') && (
          <Text style={styles.errorText}>{value.error}</Text>
        )}
        <TextInput
          placeholder="Email"
          value={value.email}
          onChangeText={(text) => {
            setValue({ ...value, email: text });
          }}
        />
        <TextInput
          placeholder="Password"
          value={value.password}
          onChangeText={(text) => {
            setValue({ ...value, password: text });
          }}
          secureTextEntry={true}
        />
        <Button onPress={SignIn}>Sign In</Button>
      </View>

      <View style={styles.signUpContainer}>
        <Pressable
          style={styles.signUpTextContainer}
          onPress={() => {
            navigation.navigate('Welcome');
          }}
        >
          <Text>{"Don't have an account?"}</Text>
          <Text style={styles.signUpText}>Sign Up here</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flex: 1,
    alignSelf: 'center',
  },
  formContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    gap: 12, // equivalent to Tailwind's `gap-3`
  },
  title: {
    fontSize: 24, // equivalent to Tailwind's `text-3xl`
    fontWeight: '800', // equivalent to Tailwind's `font-extrabold`
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 14, // equivalent to Tailwind's `text-sm`
    fontWeight: '800', // equivalent to Tailwind's `font-extrabold`
    color: '#6B7280', // Tailwind's `text-gray-500`
    alignSelf: 'center',
  },
  errorText: {
    backgroundColor: '#FEE2E2', // Tailwind's `bg-red-100`
    borderColor: '#F87171', // Tailwind's `border-red-400`
    color: '#B91C1C', // Tailwind's `text-red-700`
    paddingHorizontal: 16, // Tailwind's `px-4`
    paddingVertical: 12, // Tailwind's `py-3`
    borderWidth: 1,
  },
  signUpContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  signUpTextContainer: {
    flexDirection: 'row',
    gap: 8, // equivalent to Tailwind's `gap-2`
  },
  signUpText: {
    fontWeight: 'bold',
  },
});

export default SignInScreenEmail;
