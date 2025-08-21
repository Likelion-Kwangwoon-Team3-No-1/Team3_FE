import styles from './App.module.css'
import { AppRouter } from './components/AppRouter'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <AppRouter />
      </div>
    </div>
  )
}

export default App
