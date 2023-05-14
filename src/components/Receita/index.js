import React, { useState, useEffect } from 'react';
import { Button, FlatList, Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import mealdb from '../../api/mealdb'

const Receita = ({ navigation, route }) => {

    const [results, setResults] = useState([]);

    const chamaApi = async () => {
        const { data } = await mealdb.get(`search.php?s=${route.params.prato}`);
        console.log(data.meals);
        setResults(data.meals);
    }

    useEffect(() => {
        chamaApi();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{route.params.prato}</Text>
            <FlatList
                data={results}
                keyExtractor={item => item.idMeal}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <View style={styles.conteudo}>
                                <Image source={{ uri: `${item.strMealThumb}` }} style={styles.img} />
                                <View style={styles.info}>
                                    <Text style={styles.subtitulo}>País:
                                        <Text style={styles.texto}>{item.strArea}</Text>
                                    </Text>
                                    <Text style={styles.subtitulo}>Categoria:
                                        <Text style={styles.texto}>{item.strCategory}</Text>
                                    </Text>
                                </View>
                                <Text style={styles.subtitulo}>Instruções</Text>
                                <Text style={styles.texto}>{item.strInstructions}</Text>
                            </View>
                        </View>
                    )
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        width: 350,
        height: 200
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    conteudo: {
        width: 350,
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
    subtitulo: {
        fontSize: 20,
        textTransform: 'uppercase',
        color: '#20D1A5',
        fontWeight: 600,
        margin: 5
    },
    texto: {
        fontSize: 15,
        color: 'black',
        margin: 5
    }, 
    info: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})

export default Receita;