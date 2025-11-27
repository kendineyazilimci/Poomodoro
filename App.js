import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, useWindowDimensions, View, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as NavigationBar from 'expo-navigation-bar'; 

import GeriyeSayim from './Functions/pomodoroTimer.js'; 

export default function App() {
  const { height, width } = useWindowDimensions();
  const isLandscape = width > height;

  const [kalanSure, setKalanSure] = useState(25 * 60); 
  const [isActive, setIsActive] = useState(false);

  const sureyiAyarla = (dakika) => {
      setIsActive(false); 
      setKalanSure(dakika * 60); 
  };

  useEffect(() => {
    const ayarlaBar = async () => {
        StatusBar.setHidden(false); 
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor("transparent");
        StatusBar.setBarStyle("light-content");

        if (Platform.OS === 'android') {
            try {
                await NavigationBar.setButtonStyleAsync("light"); 
            } catch (e) {
                console.log(e);
            }
        }
    };
    ayarlaBar();
  }, []);

  useEffect(() => {
      let interval = null;
      if (isActive && kalanSure > 0) {
          interval = setInterval(() => {
              setKalanSure(s => s - 1); 
          }, 1000);
      } else if (kalanSure === 0) {
          clearInterval(interval);
          setIsActive(false); 
      } else if (!isActive && kalanSure !== 0) {
          clearInterval(interval);
      }
      return () => clearInterval(interval);
  }, [isActive, kalanSure]);

  return (
    <LinearGradient
        colors={['#000000', '#150024', '#090935']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
    >
        {}
        <StatusBar 
            hidden={false}
            translucent={true}
            backgroundColor="transparent"
            barStyle="light-content"
        />

        <Text style={[
            styles.header, 
            isLandscape 
            ? { position: 'absolute', top: 50, fontSize: 24, zIndex: 1 }
            : { fontSize: 36, marginTop: 100 } 
        ]}>
            Poomodoro
        </Text>

        {isLandscape ? (
            <View style={styles.landscapeContainer}>
                <GeriyeSayim 
                    kalanSure={kalanSure}
                    isActive={isActive}
                    sureyiAyarla={sureyiAyarla}
                    setIsActive={setIsActive}
                />
            </View>
        ) : (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <GeriyeSayim 
                    kalanSure={kalanSure}
                    isActive={isActive}
                    sureyiAyarla={sureyiAyarla}
                    setIsActive={setIsActive}
                />
            </ScrollView>
        )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  landscapeContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  header: {
    fontWeight: '200',
    color: 'rgba(255, 255, 255, 0.8)', 
    letterSpacing: 6, 
    textShadowColor: 'rgba(255, 255, 255, 0.3)', 
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    textAlign: 'center',
  }
});