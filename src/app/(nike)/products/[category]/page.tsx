import React from 'react'
import { productData } from '@/utils/product';
import Card from '@/components/card';

const ProdByCategory = () => {
 
  return (
    <div className='w-full md:px-20 p-3 py-10 flex flex-wrap md:gap-6 gap-4 justify-center'>
      <Card arr={productData} size='sm'/>
    </div>
  )
}

export default ProdByCategory