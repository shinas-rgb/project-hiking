import { createPortal } from "react-dom"

export default function Overlay({ isOpen, onClose, children }) {
  if (!isOpen) return null
  return createPortal(
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.panel} onClick={(e) => e.stopPropagation()}> {children} </div>
    </div>,
    document.body
  )
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)", // dim everything
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  panel: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "300px",
  }
}
