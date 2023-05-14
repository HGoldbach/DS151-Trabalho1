import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title='Refeições API' onPress={() => navigation.navigate('Categorias')}/>
        </View>
    )
}



export default HomeScreen;