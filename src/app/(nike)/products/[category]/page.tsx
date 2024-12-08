import React from 'react'
import { productData } from '@/utils/product';
import Card from '@/components/card';

const ProdByCategory = () => {
 
  return (
    <div className='w-full px-20 py-10 flex flex-wrap gap-6 justify-center'>
      <Card arr={productData} size='sm'/>
    </div>
  )
}

export default ProdByCategory