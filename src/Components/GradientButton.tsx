import React from 'react'
import { Text, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import { Colors, GlobalStyles } from '../Config'
import LinearGradient from 'react-native-linear-gradient';
import { verticalScale } from 'react-native-size-matters';

interface Props {
    buttonContainerStyle?: ViewStyle
    textStyle?: TextStyle
    text: string
    onPress: () => void
    colors?: string[]
}

const GradientButton: React.FC<Props> = ({ buttonContainerStyle, textStyle, text, onPress, colors }) => {
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <LinearGradient colors={colors || Colors.gradientButton}
                style={[GlobalStyles.buttonContainer, { justifyContent: 'center', alignItems: 'center' }, buttonContainerStyle]}
                start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
                <Text style={[GlobalStyles.regularText, { fontSize: verticalScale(3), color: Colors.primary }, textStyle]}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default GradientButton