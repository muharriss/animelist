const Skeleton = ({listSkeleton=true}) => {
    return (
        <div className="mb-4">
            <div className={`flex gap-6 ml-3 mt-2 mb-2 ${!listSkeleton && "hidden"}`}>
                <div className="h-3 w-24 mr-3 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700" />
                <div className="h-3 w-16 mr-1 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700 hidden sm:block" />
                <div className="h-3 w-24 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700 hidden sm:block" />
                <div className="h-3 w-20 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700 hidden sm:block" />

            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center  pb-0 p-3 overflow-hidden">
                <div className="flex flex-col justify-center items-center">
                    <div className=" w-full aspect-[3/4] bg-gray-300 rounded-md animate-pulse dark:bg-gray-700" />
                    <div className="h-3 w-32 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700 mt-3" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className=" w-full aspect-[3/4] bg-gray-300 rounded-md animate-pulse dark:bg-gray-700" />
                    <div className="h-3 w-32 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700 mt-3" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className=" w-full aspect-[3/4] bg-gray-300 rounded-md animate-pulse dark:bg-gray-700" />
                    <div className="h-3 w-32 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700 mt-3" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className=" w-full aspect-[3/4] bg-gray-300 rounded-md animate-pulse dark:bg-gray-700" />
                    <div className="h-3 w-32 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700 mt-3" />
                </div>
            </div>
        </div>
    )
}

export default Skeleton