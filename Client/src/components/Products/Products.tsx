import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { GiCrossMark } from 'react-icons/gi'
import { IoMdFunnel } from 'react-icons/io';
import { BiChevronDown } from 'react-icons/bi';
import { BsGridFill } from 'react-icons/bs';
import { useGetCategoriesQuery, useGetProductsQuery } from '../../Redux/Api/Api';
import { ProductCard } from '../ProductCard/ProductCard';
import { useSearchParams } from 'react-router-dom';
import { filter } from '../../types';
import { GrNext, GrPrevious } from 'react-icons/gr'



function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export const Products = () => {

  const [searchparam, setSearchParam] = useSearchParams();



  const [filterState, setFilterState] = useState<filter>({
    page: 1,
    searchQuery: '',
    category: '',
    sortby: '',
    sortOrder: 'asc',
  })


  useEffect(() => {
    setFilterState({
      ...filterState, searchQuery: searchparam.get('search_param') || '',
      category: searchparam.get('category') || ''
    }
    );
  }, [searchparam])

  const { data } = useGetProductsQuery(filterState);
  const sortOptions = [
    { name: 'Best Rating', onclick: () => { setFilterState({ ...filterState, sortby: "rating", sortOrder: "asc" }) }, current: false, },
    { name: 'Price: Low to High', onclick: () => { setFilterState({ ...filterState, sortby: "price", sortOrder: "asc" }) }, current: false, },
    { name: 'Price: High to Low', onclick: () => { setFilterState({ ...filterState, sortby: "price", sortOrder: "desc" }) }, current: false, }
  ]

  const handleFilter = (name: string) => {
    // setFilterState({ ...filterState, category: name })
    setSearchParam({ category: name, search_params: filterState.searchQuery })
  }


  const { data: Categories } = useGetCategoriesQuery();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handlePrev = () => {
    if (filterState.page > 0) {
      setFilterState({ ...filterState, page: filterState.page - 1 })
    }
  }
  const handleNext = () => {
    if (filterState.page > 0) {
      setFilterState({ ...filterState, page: filterState.page + 1 })
    }
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <GiCrossMark className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {Categories?.map((category: any) => (
                        <li key={category.name}>
                          <button onClick={(e) => handleFilter(category.name)} className="block px-2 py-3">
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <BiChevronDown
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={option.onclick}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500 w-full',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <BsGridFill className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <IoMdFunnel className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {Categories?.map((category: any) => (
                    <li key={category.name}>
                      <button onClick={(e) => handleFilter(category.name)}>{category.name}</button>
                    </li>
                  ))}
                </ul>
                <div className='border-b border-gray-200 py-6'>
                  <h3 className='-my-3 flow-root pb-6 text-sm font-medium text-gray-900'>
                    Ratings
                  </h3>
                  {/* <div className='flex flex-col'>
                    <button onClick={(e) => handleFilterbyRating(5)} className='flex flex-row'>
                      <AiFillStar className='h-5 w-5 text-yellow-400' />
                      <AiFillStar className='h-5 w-5 text-yellow-400' />
                      <AiFillStar className='h-5 w-5 text-yellow-400' />
                      <AiFillStar className='h-5 w-5 text-yellow-400' />
                      <AiFillStar className='h-5 w-5 text-yellow-400' />
                    </button>
                    <button onClick={(e) => handleFilterbyRating(4)} className='flex flex-row'>
                      <AiFillStar className='h-5 w-5 text-yellow-400' />
                      <AiFillStar className='h-5 w-5 text-yellow-400' />
                      <AiFillStar className='h-5 w-5 text-yellow-400' />
                      <AiFillStar className='h-5 w-5 text-yellow-400' />
                      <AiOutlineStar className='h-5 w-5 text-yellow-400' />
                    </button>
                    <button onClick={(e) => handleFilterbyRating(3)} className='flex flex-row'>
                      <AiFillStar className='h-5 w-5 text-yellow-400' />
                      <AiFillStar className='h-5 w-5 text-yellow-400' />
                      <AiFillStar className='h-5 w-5 text-yellow-400' />
                      <AiOutlineStar className='h-5 w-5 text-yellow-400' />
                      <AiOutlineStar className='h-5 w-5 text-yellow-400' />
                    </button>
                    <button onClick={(e) => handleFilterbyRating(2)} className='flex flex-row'>
                      <AiFillStar className='h-5 w-5 text-yellow-400' />
                      <AiFillStar className='h-5 w-5 text-yellow-400' />
                      <AiOutlineStar className='h-5 w-5 text-yellow-400' />
                      <AiOutlineStar className='h-5 w-5 text-yellow-400' />
                      <AiOutlineStar className='h-5 w-5 text-yellow-400' />
                    </button>
                    <button onClick={(e) => handleFilterbyRating(1)} className='flex flex-row'>
                      <AiFillStar className='h-5 w-5 text-yellow-400' />
                      <AiOutlineStar className='h-5 w-5 text-yellow-400' />
                      <AiOutlineStar className='h-5 w-5 text-yellow-400' />
                      <AiOutlineStar className='h-5 w-5 text-yellow-400' />
                      <AiOutlineStar className='h-5 w-5 text-yellow-400' />
                    </button>


                  </div> */}
                </div>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {data &&
                    (data.map((product: any, key: number) => (
                      <ProductCard product={product} key={key} />
                    )))
                  }

                </div>

              </div>
            </div>

            {data && (
              <div className='flex flex-row justify-center mt-9'>
                {filterState.page >= 2 ? (
                  <button onClick={() => handlePrev()}>
                    <GrPrevious size={20} />
                  </button>
                ) : null
                }
                <h1>{filterState.page}</h1>
                <button onClick={() => handleNext()}>
                  <GrNext size={20} />
                </button>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
