import React, { useState, useEffect } from 'react';
import { Button, FlatList, Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import mealdb from '../../api/mealdb';



const Categorias = ({navigation}) => {

    const [results, setResults] = useState([]);

    const chamaApi = async () => {
        const { data } = await mealdb.get(`categories.php`);
        console.log(data.categories);
        setResults(data.categories);
    }

    const teste = texto => {
        console.log(texto)
    }

    useEffect(() => {
        chamaApi();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Refeições</Text>
            <FlatList
                data={results}
                keyExtractor={item => item.idCategory}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity style={styles.conteudo} onPress={() => navigation.navigate("Pratos", {categoria: item.strCategory})}>
                                <Text style={styles.texto}>{item.strCategory}</Text>
                                <Image source={{ uri: `${item.strCategoryThumb}` }} style={styles.img} />
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
        width: 50,
        height: 50
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    conteudo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        fontSize: 20,
        textTransform: 'uppercase',
        color: '#20D1A5',
        fontWeight: 600
    }
    


})


export default Categorias;