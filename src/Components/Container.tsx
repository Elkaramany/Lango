import React from 'react'
import { View, ViewStyle } from 'react-native'
import { Colors } from '../Config'
import { scale } from 'react-native-size-matters'

interface Props {
    mainStyle?: ViewStyle
    mainBgColor?: string
}

const Container: React.FC<Props> = ({ mainStyle, mainBgColor, children }) => {
    return (
        <View style={{ flex: 1, backgroundColor: mainBgColor || Colors.primary }}>
            <View style={[mainStyle, { marginHorizontal: scale(3) }]}>
                {children}
            </View>
        </View>
    )
}

export default Container