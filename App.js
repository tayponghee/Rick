import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, Linking, StatusBar, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screen components
function HomeScreen({ navigation }) {
  const [counter, setCounter] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('red');

  const handleButtonPress = () => {
    if (counter < 30) {
      setCounter(counter + 1);
    } else {
      // Open YouTube link for Rickroll
      Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    }
  };

  const handleResetCounter = () => {
    setCounter(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundColor(generateRainbowColor());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const generateRainbowColor = () => {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.box, { backgroundColor: 'white' }]}>
        <Text style={styles.text}>Yeet</Text>
      </View>
      <Image source={require('./rickroll.jpg')} style={styles.image} />
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Click Me!</Text>
      </TouchableOpacity>
      <View style={[styles.counterContainer, { backgroundColor: 'white' }]}>
        <Text style={styles.counterText}>Counter: {counter}</Text>
        {counter >= 30 && (
          <TouchableOpacity style={styles.resetButton} onPress={handleResetCounter}>
            <Text style={styles.resetButtonText}>Reset Counter</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('Other')}>
        <Text style={styles.navigationButtonText}>Go to the Other Screen</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Text style={styles.clock}>{time}</Text>;
}

// OtherScreen component
export function OtherScreen({ navigation }) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenLink = () => {
    Linking.openURL('https://youtu.be/gG_dA32oH44?t=20');
  };

  return (
    <View style={styles.container}>
      <Clock />
      <Text style={styles.text}>Welcome to the Other Screen!</Text>
      <Text>This is another screen in the app.</Text>
      <Image source={require('./kanye.jpg')} style={styles.image} />
      <Text>Bruh, there ain't jackshit here.</Text>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleOpenLink}>
        <Text style={styles.linkButtonText}>Listen to fire music</Text>
      </TouchableOpacity>
    </View>
  );
}

// App component
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Massive bullshit" component={HomeScreen} />
        <Stack.Screen name="Other" component={OtherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  counterContainer: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  counterText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  navigationButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  navigationButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  clock: {
    fontSize: 18,
    marginTop: 20,
  },
});
