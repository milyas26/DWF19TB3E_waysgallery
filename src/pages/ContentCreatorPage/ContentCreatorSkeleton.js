import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import SkeletonThumbnail from '../../components/molecules/Thumbnail/skeletonThumbnail'
import './ContentCreator.css'

const ContentCreatorSkeleton = () => {
  return (
    <div className="skeleton">
      <SkeletonTheme color="#202020" highlightColor="#444">
        <p>
          <Skeleton height={200} />
        </p>

        <div className="profile-skeleton">
          <p className="skeleton-1">
            <Skeleton height={100} width={200} />
          </p>
          <p className="skeleton-2">
            <Skeleton height={50} width={150} />
          </p>
        </div>

        <p>
          <Skeleton height={2} />
        </p>

        <div className="skeleton-thumbnail d-flex">
          <SkeletonThumbnail />
          <SkeletonThumbnail />
          <SkeletonThumbnail />
          <SkeletonThumbnail />
        </div>
      </SkeletonTheme>
      ;
    </div>
  )
}

export default ContentCreatorSkeleton
