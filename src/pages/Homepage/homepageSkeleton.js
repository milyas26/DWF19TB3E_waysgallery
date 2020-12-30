import React from 'react'
import SkeletonThumbnail from '../../components/molecules/Thumbnail/skeletonThumbnail'

const homepageSkeleton = () => {
  return (
    <div className="container-homepageSkeleton">
      <div>
        <SkeletonThumbnail />
        <SkeletonThumbnail />
      </div>
      <div>
        <SkeletonThumbnail />
        <SkeletonThumbnail />
      </div>
      <div>
        <SkeletonThumbnail />
        <SkeletonThumbnail />
      </div>
      <div>
        <SkeletonThumbnail />
        <SkeletonThumbnail />
      </div>
    </div>
  )
}

export default homepageSkeleton
