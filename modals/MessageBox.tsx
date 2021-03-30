import React from 'react'
import { Text, Button, View } from 'react-native'
import Modal from '../components/Modal'

interface Props {
    title: string,
    message: string,
    shown: boolean,
    askYesNo?: boolean,
    confirm?: () => void,
    dismiss: () => void
}

export const MessageBoxModal = ({ title, message, shown, confirm, askYesNo, dismiss }: Props) => {
    return (
        <Modal visible={shown} onTouchOutside={() => dismiss && dismiss()}>
            <Text style={{ fontWeight: '700', fontSize: 20, alignSelf: 'center' }}>{title}</Text>
            <View>
                <Text>{message}</Text>
                {confirm ?
                    <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
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
                    </View>
                    :
                    <Button
                        title='Ok'
                        onPress={dismiss}
                    />
                }
            </View>
        </Modal>
    )
}
