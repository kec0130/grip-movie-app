import { useRef } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: JSX.Element
}

const ModalPortal = ({ children }: PortalProps) => {
  const modalRoot = useRef<HTMLDivElement>(document.querySelector('#modal'))
  return createPortal(children, modalRoot.current as HTMLDivElement)
}

export default ModalPortal
