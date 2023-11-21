import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

const CartButton = ({Icon,C1,C2}) => {
    return (
        <View style={C1} className="backdrop-blur-md bg-gray-200/50">
            <TouchableOpacity>
                <Image source={Icon} style={C2}/>
            </TouchableOpacity>
        </View>
    );
}

export default CartButton;
