import React, { useState, useContext, useEffect } from 'react'
import { Badge } from 'react-native-paper'
import { View, Image, Text } from 'react-native'
import { Header } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { StackNavigationProp } from '@react-navigation/stack'

interface Props {
    navigation: StackNavigationProp<any>,
    title: string,
    hamburgerBadgeText?: string,
    photoURL?: string | null,
    hasDrawerNavigation?: boolean,
    hasHome?: boolean,
    hasBack?: boolean,
}

export default ({
    navigation,
    title,
    photoURL,
    hamburgerBadgeText,
    hasDrawerNavigation = true,
    hasHome = false,
    hasBack = false,
}: Props) => {

    const iconSize = 28

    const centerComponent = (
        <Text>
            {title}
        </Text>
    )
    const leftComponent = (
        <View style={{ flexDirection: 'row' }}>
            {hasDrawerNavigation ? (
                <>
                    <MaterialIcons
                        name="menu"
                        size={iconSize}
                        // @ts-ignore
                        onPress={navigation.openDrawer}
                    />
                    { hamburgerBadgeText ?
                        <Badge style={{ marginLeft: -5 }} size={16} visible={true}>{hamburgerBadgeText}</Badge>
                        : <></>
                    }
                </>
            ) : (
                <></>
            )}
            {hasHome ? (
                <MaterialIcons
                    name="home"
                    size={iconSize}
                    onPress={() => navigation.popToTop()}
                />
            ) : (
                <></>
            )}
            {hasBack ? (
                <MaterialIcons
                    name="navigate-before"
                    size={iconSize}
                    onPress={() => navigation.pop()}
                />
            ) : (
                <></>
            )}
        </View>
    )

    const rightComponent = (
        <View style={{ flexDirection: 'row' }}>
            <MaterialIcons
                name="face"
                size={iconSize}
                onPress={() => navigation.goBack()}
            />
        </View>
    )

    return (
        <>
            <Header
                containerStyle={{
                    width: '100%',
                }}
                backgroundColor="none"
                backgroundImageStyle={{}}
                centerComponent={centerComponent}
                leftComponent={leftComponent}
                leftContainerStyle={{}}
                placement="center"
                rightComponent={rightComponent}
                rightContainerStyle={{}}
                statusBarProps={{}}
            />
        </>
    )
}
