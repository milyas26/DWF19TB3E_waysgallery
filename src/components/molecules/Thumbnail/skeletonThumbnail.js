import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import './skeletonThumbnail.css'

const skeletonThumbnail = () => {
  return (
    <div className="skeleton">
      <SkeletonTheme color="#202020" highlightColor="#444">
        <div className="thumbnail-skeleton">
          <div className="skeleton-item skeleton-item-image">
            <Skeleton width={230} height={120} />
          </div>
          <div className="skeleton-item">
            <Skeleton width={230} height={20} />
          </div>
          <div className="skeleton-item">
            <Skeleton width={230} height={20} />
          </div>
          <div className="skeleton-item">
            <Skeleton width={230} height={20} />
          </div>
        </div>
      </SkeletonTheme>
    </div>
  )
}

export default skeletonThumbnail
