import React from 'react'
import { Text, StyleProp, TouchableOpacity, ViewStyle } from 'react-native'

interface Props {
    value: string
    style?: StyleProp<ViewStyle>
    onPress?: () => any
}

export default ({
    value,
    style,
    onPress,
    ...restProps
}: Props) => {
    // TouchableHighlight is another option, this works nice though
    return (
        <TouchableOpacity
            style={style}
            onPress={onPress}
            {...restProps}
        >
            <Text>{value}</Text>
        </TouchableOpacity>
    )
}
