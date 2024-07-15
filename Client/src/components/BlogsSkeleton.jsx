import React from 'react'

const BlogsSkeleton = () => {
  return (
    <div className='w-[800px] m-auto'>
        <div role="status" class="max-w-sm p-4 animate-pulse md:p-6 dark:border-gray-700">
            <div class="flex items-center mt-4 mb-3">
            <svg class="w-8 h-8 me-3 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
            <div>
                <div class="h-2.5 bg-gray-200 rounded-full w-32 mb-2"></div>
            </div>
            </div>
            <div class="h-2 w-[450px] bg-gray-200 rounded-full mb-2.5"></div>
            <div class="h-2 w-[450px] bg-gray-200 rounded-full mb-2.5"></div>
            <div class="h-2 w-[450px] bg-gray-200 rounded-full"></div>
            <span class="sr-only">Loading...</span>
        </div>
        <hr className='w-[500px]' />
    </div>
  )
}

export default BlogsSkeleton