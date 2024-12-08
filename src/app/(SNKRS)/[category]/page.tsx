import Card from "@/components/card";
import { productData } from "@/utils/product";

const FeedPage = () => {
  return (
    <div className='w-full px-20 py-10 flex flex-wrap gap-6 justify-center'>
      <Card arr={productData} size='lg' />
    </div>
  )
}

export default FeedPage