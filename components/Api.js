const API_URL = 'https://apiestoque.webapptech.site/api/produtos';
import { Alert } from 'react-native';


export const fetchProdutos = async (setRegistros) => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro ao buscar os produtos');
        }
        const dados = await response.json();
        console.log('Produtos recebidos da API:', dados);
        setRegistros(dados.data);
    } catch (error) {
        console.error('Erro ao buscar um produto:', error);
        throw error;
    }
};

export const createProdutos = async (produtoData) => {
    try {
        const response = await fetch('https://apiestoque.webapptech.site/api/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produtoData),
        });

        // Verifica se a API retornou status 204 (sem conteúdo)
        if (response.status === 204) {
            Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!');
            return {}; // Retorna um objeto vazio para evitar erro
        }

        // Caso a API retorne conteúdo, tentamos converter para JSON
        const textResponse = await response.text();
        console.log('Resposta bruta da API:', textResponse);

        let responseData;
        try {
            responseData = JSON.parse(textResponse);
        } catch (error) {
            console.warn('A resposta não é um JSON válido.');
            responseData = null;
        }

        if (!response.ok || !responseData) {
            throw new Error(responseData?.message || 'Erro desconhecido na API');
        }

        return responseData;
    } catch (error) {
        console.error('Erro ao cadastrar o produto:', error.message);
        Alert.alert('Erro ao cadastrar', `Detalhes: ${error.message}`);
        return null;
    }
};


export const deleteProdutos = async (produtoId, setRegistros) => {
    try {
        const response = await fetch(`https://apiestoque.webapptech.site/api/produtos/${produtoId}`, {
            method: 'DELETE',
        });


        if (response.ok) {
            const responseData = await response.json();

            if (responseData.success) {
                Alert.alert('Sucesso!', responseData.message);

                setRegistros((prevRegistros) => {
                    const novaLista = prevRegistros.filter((produtos) => produtos.codigo != produtoId);
                    console.log('Nova lista de produtos:', novaLista);
                    return novaLista;
                });

            } else {
                Alert.alert('Erro', responseData.message);
            }
        } else {

            const textResponse = await response.text();
            let responseData = null;

            try {
                responseData = JSON.parse(textResponse);
            } catch (error) {
                console.warn('A resposta não é um JSON válido.');
            }

            throw new Error(responseData?.message || 'Erro desconhecido ao excluir o produtos');
        }
    } catch (error) {
        console.error('Erro ao excluir o produto:', error.message);
        Alert.alert('Erro ao excluir', `Detalhes: ${error.message}`);
    }
};

export const updateProdutos = async (produtoId, updatedData, navigation) => {
    try {
        const response = await fetch(`https://apiestoque.webapptech.site/api/produtos/${produtoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        console.log('Dados enviados:', updatedData);

        if (response.status === 200) {
            Alert.alert('Sucesso!', 'Produtos atualizado com sucesso!');
            navigation.navigate('Home');
        } else {
            const textResponse = await response.text();
            let responseData;
            try {
                responseData = JSON.parse(textResponse);
            } catch (error) {
                console.warn('A resposta não é um JSON válido.');
                responseData = null;
            }

            throw new Error(responseData?.message || 'Erro desconhecido ao atualizar o produtos');
        }
    } catch (error) {
        console.error('Erro ao atualizar os produtos:', error.message);
        Alert.alert('Erro ao atualizar', `Detalhes: ${error.message}`);
    }
};