import { SafeAreaView, Button, TextInput } from "react-native";
import { useState } from "react";
import { useSession } from '@/state/contexts/AuthContext';
import { ThemedText } from "@/components/ThemedText";

export default function SignInScreen() {
  const { signIn } = useSession();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  } 
  
  return (
    <SafeAreaView style={{
      flexDirection: 'column',
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <ThemedText>Sign In Page</ThemedText>
      <TextInput 
      placeholder="Username"
      value={username}
      onChangeText={handleUsernameChange}
      style={{
        marginTop: 20,
        width: "80%",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
      }}
      />
      <TextInput 
      placeholder="Password"
      value={password}
      onChangeText={handlePasswordChange}
      secureTextEntry={true}
      style={{
        marginTop: 20,
        width: "80%",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
      }}/>
      <Button title="Sign In" onPress={() => signIn(username, password)} />
    </SafeAreaView>
  );
}