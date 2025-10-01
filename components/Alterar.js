import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { updateProdutos } from './Api';

export default function Alterar({ route, navigation }) {
    const { produtos } = route.params;
    const [nome, setNome] = useState(produtos.nome);
    const [marca, setMarca] = useState(produtos.marca);
    const [preco, setPreco] = useState(produtos.preco);


    const handleUpdate = () => {
        const updatedData = {
            nome,
            marca,
            preco
        };

        Alert.alert(
            'Confirmação',
            'Tem certeza de que deseja alterar este Produto?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Alterar',
                    onPress: () => updateProdutos(produtos.id, updatedData, navigation),
                },
            ]
        );
    };


    return (
        <View>
            <TextInput
                placeholder="Produto"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Marca"
                value={marca}
                onChangeText={setMarca}
            />
            <TextInput
                placeholder="Preco"
                value={preco}
                onChangeText={setPreco}
            />

            <Button title="Alterar" onPress={handleUpdate} />
        </View>
    );
}