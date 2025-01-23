import Bestofairmax from '@/components/homepage/bestofairmax';
import Actionbuttons from '@/components/product/productdetails/actionbuttons';
import { GetProductById } from '@/sanity/sanity.query';
import { SessionProvider } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'

const PorductDetail = async ({ params }: { params: { prodid: string } }) => {
    const id = params.prodid;
    const prod = await GetProductById(id)

    const { _id, image, title, category, price, description, colors } = prod[0]
    if (prod)
        return (
            <div className='md:px-12 px-3 py-3'>
                <div className='w-full md:flex text-[#111]'>
                    <div className='flex-1 gap-5 flex flex-wrap'>
                        <div className='w-[46%]'>
                            <Image src={image.url} alt="" width={1300} height={700} className="w-full h-full object-cover" />
                        </div>
                        <div className='w-[46%]'>
                            <Image src={image.url} alt="" width={1300} height={700} className="w-full h-full object-cover" />
                        </div>
                        <div className='w-[46%]'>
                            <Image src={image.url} alt="" width={1300} height={700} className="w-full h-full object-cover" />
                        </div>
                        <div className='w-[46%]'>
                            <Image src={image.url} alt="" width={1300} height={700} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className='md:w-[500px] w-full'>
                        <h1 className='text-2xl font-medium md:mt-0 mt-5'>{title}</h1>
                        <div className='font-medium'>{category}</div>
                        <div className='font-medium text-sm mt-3 inline-block'>MRP: ${price.toLocaleString()}</div>
                        <div className='text-xs text-[#757575]'>inc. of taxes</div>
                        <div className='text-xs text-[#757575]'>(Also includes all applicable duties)</div>

                        <div className='py-12'>
                            <div className='flex justify-between items-center text-sm'>
                                <span className='font-medium'>Select Size</span>
                                <span className='text-[#757575]'>Size guide</span>
                            </div>
                            <div className='py-2 grid grid-cols-3 gap-1'>
                                {["UK 6 (EU 40)", "UK 6.5", "UK 7", "UK 7.5", "UK 9", "UK 10", "UK 11.5"]
                                    .map((data, index) => {
                                        return (
                                            <div key={index} className='col-span-1 border border-zinc-200 hover:border-zinc-500 flex justify-center items-center gap-2 rounded-md py-2'>
                                                <span className=''>{data}</span>
                                            </div>
                                        )
                                    })}
                            </div>
                            <SessionProvider>
                                <Actionbuttons id={_id} />
                            </SessionProvider>
                        </div>
                        <div>
                            <p className='pt-6 text-sm text-[#111] leading-7'>{description}</p>
                            <div className='p-8 text-[#111] '>
                                Colour Shown: Flat Pewter/Light<br /> {colors.map((clr: string) => "/" + clr)}
                                <div>Style: DV7421-001</div>
                            </div>
                            <span className='underline underline-offset-4 font-medium'>view Product details</span>
                        </div>
                    </div>
                </div>
                <Bestofairmax introTitle="You might also like" cardSize="lg" />
            </div>
        )
}

export default PorductDetail