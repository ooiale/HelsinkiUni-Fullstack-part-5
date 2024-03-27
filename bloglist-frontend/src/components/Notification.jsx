const Notification = ({ message, color }) => {
  return (
    <div
      style={{ border: `4px solid ${color}`, padding: '4px' }}
    >
      <p style={{ color:`${color}` }}> {message}</p>
    </div>
  )
}

export default Notification