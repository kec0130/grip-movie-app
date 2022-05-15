import { useRecoilValue, useSetRecoilState } from 'recoil'
import { modalOpenState } from 'states/modal'
import { selectedMovieState } from 'states/movie'

import ModalPortal from './portal'
import Button from 'components/button'
import styles from './modal.module.scss'

interface ModalProps {
  text: string
  onConfirm: () => void
}

const Modal = ({ text, onConfirm }: ModalProps) => {
  const setIsModalOpen = useSetRecoilState(modalOpenState)
  const selectedMovie = useRecoilValue(selectedMovieState)

  return (
    <ModalPortal>
      <div className={styles.background}>
        <div className={styles.modalWrapper}>
          <div className={styles.movieTitle}>{selectedMovie.Title}</div>
          <div className={styles.text}>{text}</div>
          <div>
            <Button value='확인' buttonStyle='primary' onClick={onConfirm} />
            <Button value='취소' buttonStyle='secondary' onClick={() => setIsModalOpen(false)} />
          </div>
        </div>
      </div>
    </ModalPortal>
  )
}

export default Modal
