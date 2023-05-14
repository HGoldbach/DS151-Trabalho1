import React, { useState, useEffect } from 'react';
import { Button, FlatList, Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import mealdb from '../../api/mealdb'

const Pratos = ({navigation, route}) => {
    const [results, setResults] = useState([]);

    const chamaApi = async () => {
        const { data } = await mealdb.get(`filter.php?c=${route.params.categoria}`);
        console.log(data.meals);
        setResults(data.meals);
    }

    useEffect(() => {
        chamaApi();
    }, []);

    return (

        <View style={styles.container}>
            <Text style={styles.titulo}>{route.params.categoria}</Text>
            <FlatList
                data={results}
                keyExtractor={item => item.idMeal}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity style={styles.conteudo} onPress={() => navigation.navigate("Receita", {prato: item.strMeal})}>
                                <Text style={styles.texto}>Nome: {item.strMeal}</Text>
                                <Image source={{ uri: `${item.strMealThumb}` }} style={styles.img} />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        
        </View>
        
    )
}

const styles = StyleSheet.create({
    img: {
        width: 300,
        height: 200
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    conteudo: {
        width: 250,
        margin: 10,
        borderBottomWidth: 1,
        borderColor: 'black',
    },
    titulo: {
        fontSize: 30,
        fontWeight: 600,
        margin: 10,
        color: '#20D1A5',
        textTransform: 'uppercase',
    },
    texto: {
        fontSize: 15,
        textTransform: 'uppercase',
        color: '#20D1A5',
        fontWeight: 600
    }

})

export default Pratos;