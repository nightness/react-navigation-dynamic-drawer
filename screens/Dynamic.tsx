import React, { useEffect, useContext, useState } from 'react'
import { DefaultRouterOptions } from '@react-navigation/native'
import { Text } from 'react-native-elements'
import Screen from '../components/Screen'

interface Props {
    navigation: DefaultRouterOptions
}

export const Dynamic = ({ navigation }: Props) => {
    return (
        <Screen navigation={navigation} title="Dynamic">
            <Text>Dynamic</Text>
        </Screen>
    )
}
