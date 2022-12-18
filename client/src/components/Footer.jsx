import React from 'react'

const Footer = () => {
  return (
    
    <footer class="absolute bottom-0 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="https://cryptoblk.io/about-us" class="flex items-center mb-4 sm:mb-0">
                <img src="https://cryptoblk.io/wp-content/uploads/2022/05/CryptoBLK_header.svg" class="mr-3 h-8" alt="Cryptoblk Logo" />
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6 "></a>
                </li>
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6"></a>
                </li>
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6 "></a>
                </li>
                <li>
                    <a href="#" class="hover:underline">

                    </a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Made by rexan.eth
        </span>
    </footer>

  )
}

export default Footer