import React from 'react'
import { Badge, Header } from 'react-native-elements'
import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { DrawerNavigationProp } from '@react-navigation/drawer'

interface Props {
    navigation: DrawerNavigationProp<any>,
    title: string,
    hamburgerBadgeText?: string,
    hasDrawerNavigation?: boolean
}

export default ({
    navigation,
    title,
    hamburgerBadgeText,
    hasDrawerNavigation = true,
}: Props) => {

    const iconSize = 28

    const centerComponent = (
        <Text style={{ fontSize: 16, fontWeight: '500' }}>
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
                    <View style={{ paddingTop: 10 }}>
                        { hamburgerBadgeText ?
                            <Badge
                                value={hamburgerBadgeText}
                                onPress={navigation.openDrawer}
                            /> : <></>
                        }
                    </View>
                </>
            ) : (
                <></>
            )}
        </View>
    )

    const rightComponent = (
        <View style={{ flexDirection: 'row' }}>

        </View>
    )

    return (
        <Header
            containerStyle={{
                width: '100%',
            }}
            backgroundColor='silver'
            centerComponent={centerComponent}
            leftComponent={leftComponent}
            placement="center"
            rightComponent={rightComponent}
        />
    )
}
