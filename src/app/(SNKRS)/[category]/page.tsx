import Card from "@/components/card";
import { GetProductData } from "@/sanity/sanity.query";

const FeedPage = async () => {
  const productData = await GetProductData()
  return (
    <div className='w-full md:px-20 p-3 py-10 flex flex-wrap sm:gap-6 gap-4 justify-center'>
      <Card arr={productData} size='lg' />
    </div>
  )
}

export default FeedPage