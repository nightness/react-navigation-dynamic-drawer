import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface BackgroundProps {
    children: JSX.Element | JSX.Element[]
    colors?: string[]
}

export default ({ children, colors }: BackgroundProps) => {
    if (colors) return (
        <View style={{ flex: 1 }}>
            <LinearGradient style={{ flex: 1 }} colors={colors}>
                {children}
            </LinearGradient>
        </View>
    )
    return (
        <View style={{ flex: 1 }}>
            {children}
        </View>
    )
}