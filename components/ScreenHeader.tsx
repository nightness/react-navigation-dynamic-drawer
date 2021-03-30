import React from 'react'
import { Badge } from 'react-native-paper'
import { View, Text } from 'react-native'
import { Header } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { DrawerNavigationProp } from '@react-navigation/drawer'

interface Props {
    navigation: DrawerNavigationProp<any>,
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
                        <Badge style={{ marginLeft: -5 }} size={16} visible={true}>{hamburgerBadgeText}</Badge>
                        : <></>
                    }
                </>
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
