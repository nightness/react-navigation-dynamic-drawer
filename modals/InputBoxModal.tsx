import React, { useState } from 'react'
import { Text, Button, View } from 'react-native'
import { Input } from 'react-native-elements'
import Modal from '../components/Modal'

interface Props {
    title: string,
    message: string,
    value: string,
    initialValue?: string,
    shown: boolean,
    askYesNo?: boolean,
    confirm: () => void,
    dismiss: () => void,
    onChangeText: (text: string) => void
}

export const InputBoxModal = ({ value, title, message, shown, confirm, askYesNo, dismiss, onChangeText }: Props) => {
    return (
        <Modal visible={shown} onTouchOutside={() => dismiss && dismiss()}>
            <Text style={{ fontWeight: '700', fontSize: 20, alignSelf: 'center' }}>{title}</Text>
            <View>
                <Text>{message}</Text>
                <Input value={value} onChangeText={onChangeText} />
                <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                    <>
                        <View style={{ margin: 5 }}>
                            <Button
                                title={askYesNo ? 'Yes' : 'Ok'}
                                onPress={confirm}
                            />
                        </View>
                        <View style={{ margin: 5 }}>
                            <Button
                                title={askYesNo ? 'No' : 'Cancel'}
                                onPress={dismiss}
                            />
                        </View>
                    </>
                </View>
            </View>
        </Modal>
    )
}
