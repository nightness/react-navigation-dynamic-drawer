import { DrawerNavigationProp } from '@react-navigation/drawer'
import React, { useContext, useState } from 'react'
import { View, Button } from 'react-native'
import { DrawerContext } from '../navigation/DrawerContext'
import { Dynamic } from '../screens/Dynamic'
import { MessageBoxModal } from '../modals/MessageBox'

interface Props {
    style?: object,
    navigation: DrawerNavigationProp<any>,
}

type MessageBoxState = {
    title: string,
    message: string,
    askYesNo: boolean,
    confirm?: () => void
}

export default ({ style, navigation }: Props) => {
    const { screens, screenIndex, screensManager } = useContext(DrawerContext)
    const [showMessageBoxModal, setShowLogoutModal] = useState(false)
    const [messageBoxState, setMessageBoxState] = useState<MessageBoxState>({
        title: '',
        message: '',
        askYesNo: false,
    })

    const getScreenConfig = () => {
        return (
            {
                // Names here needs to be unique for routing to work
                name: `Dynamic ${(Math.floor(Math.random() * 10000))}`,
                component: Dynamic,
                initialParams: {
                    activeTintColor: '#123',
                    inactiveTintColor: '#000',
                    iconGroup: 'antdesign',
                    iconName: 'paperclip',
                    focusedIconName: 'bug-outline'
                }
            }
        )
    }

    const showMessageBox = (title: string, message: string, askYesNo: boolean = false, confirm?: () => void) => {
        setMessageBoxState({ title, message, askYesNo, confirm })
        setShowLogoutModal(true)
    }

    return (
        <>
            <MessageBoxModal
                title={messageBoxState.title}
                message={messageBoxState.message}
                shown={showMessageBoxModal}
                askYesNo={messageBoxState.askYesNo}
                confirm={messageBoxState.confirm}
                dismiss={() => setShowLogoutModal(false)}
            />
            <View style={[{ flex: 1 }, style]}>
                <Button
                    title='Open Drawer'
                    onPress={(d) => {
                        navigation.openDrawer()
                    }}
                />
                <Button
                    title='Back'
                    onPress={(d) => {
                        if (navigation.canGoBack())
                            navigation.goBack()
                        else
                            showMessageBox('Failed', 'There is no history to go back to!')
                    }}
                />
                <Button
                    title='Delete the Playground Screen'
                    onPress={() => {
                        let found = false
                        screens.forEach((screen, index) => {
                            if (screensManager && screen.name === 'Playground') {
                                found = true
                                screensManager('remove', index)
                                showMessageBox('Completed', 'Removed playground screen')
                            }
                        })
                        if (!found) {
                            showMessageBox('Failed', 'There is no playground screen')
                        }
                    }}
                />
                <Button
                    title='Delete this Screen'
                    onPress={() => {
                        if (screensManager && typeof screenIndex === 'number' && screenIndex >= 0) {
                            const name = screens[screenIndex].name
                            showMessageBox(
                                'Confirmation',
                                `Are you sure you want to remove ${name}?`,
                                true, () => screensManager('remove', screenIndex)
                            )
                        }
                    }}
                />
                <Button
                    title='Add a Dynamic'
                    onPress={() => {
                        const screenConfig = getScreenConfig()
                        if (screensManager) {
                            screensManager('append', 0, screenConfig)
                            showMessageBox('Completed', `Added a new dynamic screen called '${screenConfig.name}'`)
                        }
                    }}
                />
            </View>
        </>
    )
}
