import './LeftTopBar.css'

export default function LeftTopBar({ title }) {
  return (
    <div className='header'>
      <h1 className='title'>{title}</h1>
    </div>
  )
}
