import Skeleton from 'react-loading-skeleton'
import styles from './page.module.css'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
  return (
    <div className={styles.loader}>
      <Skeleton
        count={20}
        baseColor="#1f252d"
        highlightColor="#383838"
        height={80}
      />
    </div>
  )
}
