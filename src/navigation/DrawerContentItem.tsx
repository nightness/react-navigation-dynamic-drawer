import React from 'react'
import { StyleProp, TextStyle, ViewStyle, View, Text } from 'react-native'
import { DrawerItem } from '@react-navigation/drawer'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import Icon from '../components/Icon'
import Badge from '../components/Badge'

declare type Props = {
    /**
     * The label text of the item.
     */
    labelText: string;
    badgeText?: string;
    /**
     * Icons to display for the `DrawerItem`.
     */
    iconGroup?: string;
    iconName: string;
    focusedIconName?: string;
    /**
     * URL to use for the link to the tab.
     */
    to?: string;
    /**
     * Whether to highlight the drawer item as active.
     */
    focused?: boolean;
    /**
     * Function to execute on press.
     */
    onPress: () => void;
    /**
     * Color for the icon and label when the item is active.
     */
    activeTintColor?: string;
    /**
     * Color for the icon and label when the item is inactive.
     */
    inactiveTintColor?: string;
    /**
     * Background color for item when its active.
     */
    activeBackgroundColor?: string;
    /**
     * Background color for item when its inactive.
     */
    inactiveBackgroundColor?: string;
    /**
     * Color of the touchable effect on press.
     * Only supported on Android.
     *
     * @platform android
     */
    pressColor?: string;
    /**
     * Opacity of the touchable effect on press.
     * Only supported on iOS.
     *
     * @platform ios
     */
    pressOpacity?: string;
    /**
     * Style object for the icon's view element.
     */
    iconContainerStyle?: StyleProp<ViewStyle>;
     /**
     * Style object for the label element.
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Style object for the wrapper element.
     */
    style?: StyleProp<ViewStyle>;
    /**
     * navigation prop
     */
    navigation: DrawerNavigationHelpers
}

export default ({
    focusedIconName,
    iconGroup,
    iconName,
    focused,
    labelStyle,
    labelText,
    badgeText,
    style,
    onPress,
    iconContainerStyle,
    ...restProps
}: Props) => {
    return (
        <DrawerItem
            pressOpacity='90%'
            focused={focused}
            label={({ focused, color }) => (
                <View style={[{ flex: 1, marginLeft: -15, flexDirection: 'row' }, style]}>
                    <Text style={[{ flex: 3, fontWeight: '600', color }, labelStyle]}>{labelText}</Text>
                    { badgeText ?
                        <Badge fontSize={16} value={badgeText} onPress={onPress} />
                        : <React.Fragment />
                    }
                </View>
            )}
            icon={({ focused, color, size }) => {
                return (
                    <View style={iconContainerStyle}>
                        <Icon                        
                            onPress={onPress}
                            color={color}
                            size={size}
                            name={focused && focusedIconName ? focusedIconName : iconName}
                            //@ts-ignore
                            type={iconGroup}
                        />
                    </View>
                )
            }}
            onPress={onPress}
            {...restProps}
        />
    )
}
