import { DrawerNavigationProp } from '@react-navigation/drawer'
import React, { useContext, useState } from 'react'
import { View, Button } from 'react-native'
import { DrawerContext } from '../navigation/DrawerContext'
import { Dynamic } from '../screens/Dynamic'
import { MessageBoxModal } from '../modals/MessageBoxModal'
import { InputBoxModal } from '../modals/InputBoxModal'
import { NavigationElement } from '../navigation/NavigationTypes'

interface Props {
    style?: object,
    navigation: DrawerNavigationProp<any>,
}

interface MessageBoxState {
    title: string,
    message: string,
    askYesNo: boolean,
    confirm?: () => void
}

interface InputBoxState extends MessageBoxState {
    value: string
}

export default ({ style, navigation }: Props) => {
    const { screens, screenIndex, screensManager } = useContext(DrawerContext)
    const [showInputBoxModal, setShowInputBoxModal] = useState(false)
    const [inputBoxState, setInputBoxState] = useState<InputBoxState>({
        title: '',
        message: '',
        value: '',
        askYesNo: false,
    })
    const [showMessageBoxModal, setShowMessageBoxModal] = useState(false)
    const [messageBoxState, setMessageBoxState] = useState<MessageBoxState>({
        title: '',
        message: '',
        askYesNo: false,
    })

    const getScreenConfig = () => {
        return (
            {
                // Names here needs to be unique for routing to work
                label: 'Dynamic',
                routeName: `Dynamic ${(Math.floor(Math.random() * 10000))}`,
                component: Dynamic,
                initialParams: {
                    activeTintColor: '#123',
                    inactiveTintColor: '#000',
                    iconGroup: 'antdesign',
                    iconName: 'paperclip',
                    focusedIconName: 'bug-outline'
                }
            } as NavigationElement
        )
    }

    const showMessageBox = (title: string, message: string, askYesNo: boolean = false, confirm?: () => void) => {
        setMessageBoxState({ title, message, askYesNo, confirm })
        setShowMessageBoxModal(true)
    }

    const showInputBox = (title: string, message: string, value: string, askYesNo: boolean = false, confirm: () => void) => {
        setInputBoxState({ title, message, askYesNo, value, confirm })
        setShowInputBoxModal(true)
    }

    return (
        <>
            <MessageBoxModal
                title={messageBoxState.title}
                message={messageBoxState.message}
                shown={showMessageBoxModal}
                askYesNo={messageBoxState.askYesNo}
                confirm={messageBoxState.confirm}
                dismiss={() => setShowMessageBoxModal(false)}
            />
            <InputBoxModal
                title={inputBoxState.title}
                message={inputBoxState.message}
                value={inputBoxState.value}
                shown={showInputBoxModal}
                askYesNo={inputBoxState.askYesNo}
                onChangeText={(text) => {
                    inputBoxState.value = text
                    setInputBoxState({...inputBoxState})
                }}
                confirm={() => {
                    console.log(inputBoxState.value)
                    inputBoxState.confirm?.()
                    setShowInputBoxModal(false)
                }}
                dismiss={() => setShowInputBoxModal(false)}
            />
            <View style={style}>
                <View style={{ margin: 5 }}>
                    <Button
                        title='Open Drawer'
                        onPress={(d) => {
                            navigation.openDrawer()
                        }}
                    />
                </View>
                <View style={{ margin: 5 }}>
                    <Button
                        title='Back'
                        onPress={(d) => {
                            if (navigation.canGoBack())
                                navigation.goBack()
                            else
                                showMessageBox('Failed', 'There is no history to go back to!')
                        }}
                    />
                </View>
                <View style={{ margin: 5 }}>
                    <Button
                        title='Delete the Playground Screen'
                        onPress={() => {
                            let found = false
                            screens.forEach((screen, index) => {
                                if (screensManager && screen.routeName === 'Playground') {
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
                </View>
                <View style={{ margin: 5 }}>
                    <Button
                        title='Delete this Screen'
                        onPress={() => {
                            if (screensManager && typeof screenIndex === 'number' && screenIndex >= 0) {
                                const name = screens[screenIndex].routeName
                                showMessageBox(
                                    'Confirmation',
                                    `Are you sure you want to remove ${name}?`,
                                    true, () => screensManager('remove', screenIndex)
                                )
                            }
                        }}
                    />
                </View>
                <View style={{ margin: 5 }}>
                    <Button
                        title='Add a Dynamic'
                        onPress={() => {
                            const screenConfig = getScreenConfig()
                            if (screensManager) {
                                screensManager('append', 0, screenConfig)
                                showMessageBox('Completed', `Added a new dynamic screen called '${screenConfig.label}' with a routeName of '${screenConfig.routeName}'`)
                            }
                        }}
                    />
                </View>
                <View style={{ margin: 5 }}>
                    <Button
                        title='Show InputBox'
                        onPress={() => {
                            showInputBox('Title', 'Message', '', false, () => {

                            })
                        }}
                    />
                </View>
            </View>
        </>
    )
}
