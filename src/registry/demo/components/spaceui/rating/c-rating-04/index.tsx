'use client'

import { useState } from 'react'
import { Rating } from '@/registry/components/spaceui/rating'
import { toast } from 'sonner'

export default function Demo() {
  const [productRating, setProductRating] = useState(0)

  const handleRatingChange = (rating: number) => {
    setProductRating(rating)

    toast.success('Rated {rating} out of 5', {
      description: `Rated ${rating} out of 5`,
    })
  }

  return (
    <div className="space-y-8">
      <Rating rating={productRating} editable={true} onRatingChange={handleRatingChange} showValue={true} />
    </div>
  )
}
