import React from 'react'
import { Badge, Header } from 'react-native-elements'
import { View, Text, TouchableOpacity } from 'react-native'
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
                        <Badge
                            badgeStyle={{ marginTop: 10, marginLeft: -5, height: 20 }}
                            value={hamburgerBadgeText}
                            onPress={navigation.openDrawer}
                        /> : <></>
                    }
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