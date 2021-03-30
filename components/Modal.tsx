import React, { useContext } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Modal, { ModalContent } from 'react-native-modals'

interface Props {
    children: JSX.Element | JSX.Element[]
    style?: StyleProp<ViewStyle>
    visible: boolean
    onTouchOutside?: () => void
}

export default ({
    children,
    style,
    onTouchOutside,
    visible = false,
    ...restProps
}: Props) => {

    return (
        <Modal visible={visible} onTouchOutside={onTouchOutside} {...restProps}>
            <ModalContent style={style}>
                {children}
            </ModalContent>
        </Modal>
    )
}
