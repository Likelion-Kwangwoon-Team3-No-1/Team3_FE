import './ListItem.css'

export function ListItem({ title, createdAt }) {
  return (
    <div className='list-item'>
      <div className='list-title'>{title}</div>
      <div className='list-date'>{new Date(createdAt).toLocaleString()}</div>
    </div>
  )
}
