import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ProfileTab extends React.Component{
    render() {
        return (
            <View>
                <View>
                    <TouchableOpacity onPress={() => {alert("Clicked!!")}}>
                    <Image 
                        source={require("../Image/mountain.png")}
                        style={styles.button}
                    />
                    </TouchableOpacity>
                    <Text>Badge1</Text>
                </View>
                \\
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'column',
        alignItems: 'stretch',
        height: 100,
        width: 100,
        marginTop: 100,
        marginBottom: 10,
        padding: 5,
        resizeMode: 'contain',
    }
})