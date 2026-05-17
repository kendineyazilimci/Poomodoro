import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, Platform } from 'react-native'; 

function GeriyeSayim({ kalanSure, isActive, sureyiAyarla, setIsActive }) { 
    const { height, width } = useWindowDimensions();
  
    const isLandscape = width > height; 

    const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View style={[styles.container, { width: width }]}>
            
            <Text style={[
                styles.timerText, 
                { 
                    fontSize: isLandscape ? 130 : 100, 
                    marginBottom: isLandscape ? 0 : 40 
                }
            ]}>
                {formatTime(kalanSure)}
            </Text>
            
            <View style={
                isLandscape 
                ? styles.landscapeButtonGroup 
                : styles.portraitButtonGroup
            }>
                <TouchableOpacity style={styles.timeButton} onPress={() => sureyiAyarla(5)}>
                    <Text style={styles.timeButtonText}>5 DK</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.timeButton} onPress={() => sureyiAyarla(10)}>
                    <Text style={styles.timeButtonText}>10 DK</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.timeButton} onPress={() => sureyiAyarla(15)}>
                    <Text style={styles.timeButtonText}>15 DK</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.timeButton} onPress={() => sureyiAyarla(20)}>
                    <Text style={styles.timeButtonText}>20 DK</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.timeButton} onPress={() => sureyiAyarla(25)}>
                    <Text style={styles.timeButtonText}>25 DK</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.timeButton} onPress={() => sureyiAyarla(30)}>
                    <Text style={styles.timeButtonText}>30 DK</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.timeButton} onPress={() => sureyiAyarla(40)}>
                    <Text style={styles.timeButtonText}>40 DK</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.timeButton} onPress={() => sureyiAyarla(60)}>
                    <Text style={styles.timeButtonText}>1 Saat</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[
                    styles.mainButton, 
                    isActive ? styles.stopButton : styles.startButton,

                    (isLandscape && isMobile) ? styles.landscapeVerticalButton : {},
                ]}
                onPress={() => setIsActive(!isActive)}
            >
                <Text style={styles.mainButtonText} numberOfLines={1}>
                    {isActive ? "DURDUR" : "BAŞLAT"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1, 
        position: 'relative', 
    },
    timerText: {
        fontWeight: 'bold',
        color: '#ffffff', 
        letterSpacing: 3, 
        textShadowColor: 'rgba(255, 255, 255, 0.6)', 
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 50, 
        paddingHorizontal: 40,
        textAlign: 'center',
        width: '100%'
    },
    portraitButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'center', 
        flexWrap: 'wrap', 
        marginBottom: 20, 
    },
    landscapeButtonGroup: {
        flexDirection: 'row',
        position: 'absolute', 
        bottom: 40, 
        justifyContent: 'center',
        width: '100%',
    },
    mainButton: {
        paddingVertical: 18,
        paddingHorizontal: 40, 
        borderRadius: 50, 
        alignItems: 'center',
        justifyContent: 'center', 
        elevation: 8, 
        shadowColor: '#ffffff', 
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)'
    },
    landscapeVerticalButton: {
        position: 'absolute', 
        right: -60, 
        top: '50%', 
        marginTop: -30, 
        transform: [{ rotate: '-90deg' }], 
        width: 200, 
    },
    timeButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
        paddingVertical: 8,     
        paddingHorizontal: 12,  
        borderRadius: 8,        
        alignItems: 'center',
        marginHorizontal: 5, 
        marginBottom: 0, 
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)', 
    },
    timeButtonText: {
        color: '#b0b0b0', 
        fontWeight: '600',
        fontSize: 12, 
        letterSpacing: 1,
    },
    startButton: {
        backgroundColor: 'rgba(39, 174, 96, 0.8)', 
    },
    stopButton: {
        backgroundColor: 'rgba(192, 57, 43, 0.8)', 
    },
    mainButtonText: {
        color: '#ffffff', 
        fontWeight: 'bold',
        fontSize: 18, 
        letterSpacing: 2,
    }
});

export default GeriyeSayim;