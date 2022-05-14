import { useSetRecoilState } from 'recoil'
import { modalOpenState } from 'states/modal'

import ModalPortal from './portal'
import Button from 'components/button'
import styles from './modal.module.scss'

interface ModalProps {
  text: string
  onConfirm: () => void
}

const Modal = ({ text, onConfirm }: ModalProps) => {
  const setIsModalOpen = useSetRecoilState(modalOpenState)

  return (
    <ModalPortal>
      <div className={styles.background}>
        <div className={styles.modalWrapper}>
          <div className={styles.text}>{text}</div>
          <div className={styles.buttonWrapper}>
            <Button value='확인' buttonStyle='primary' onClick={onConfirm} />
            <Button value='취소' buttonStyle='secondary' onClick={() => setIsModalOpen(false)} />
          </div>
        </div>
      </div>
    </ModalPortal>
  )
}

export default Modal
