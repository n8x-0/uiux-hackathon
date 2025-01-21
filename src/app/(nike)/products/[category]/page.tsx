import React from 'react';
import Card from '@/components/card';
import { GetProductByCategory } from '@/sanity/sanity.query';

const ProdByCategory = async ({params}: {params: { category: string }}) => {

 const filteredItems = await GetProductByCategory(params.category)
  if(!filteredItems){
    return "loading"
  }
  return (
    <div className='w-full min-h-[50vh] md:px-20 p-3 py-10 flex flex-wrap md:gap-6 gap-4 justify-center'>
      {filteredItems.length <= 0 ? 
        <h1 className='text-4xl text-[#111] font-thin my-auto animate-bounce'>This page currently has no items</h1>
        :
        <Card arr={filteredItems} size='sm' />
      }
    </div>
  )
}

export default ProdByCategory