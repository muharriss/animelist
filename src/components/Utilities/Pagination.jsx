import { useState } from "react"

const Pagination = ({ setPage, page, lastPage }) => {

    const [searchPageValue, setSearchPageValue] = useState("")

    const scrollTop = () => {
        scrollTo({
            behavior: "smooth",
            top: 0
        })
    }

    const handleNextPage = () => {
        if (page < lastPage) {
            setPage((previous) => previous + 1)
            scrollTop()
        }
    }

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((previous) => previous - 1)
            scrollTop()
        }
    }

    const handleSearchPage = (e) => {
        if (e.key === "Enter" || e.type === "click") {
            e.preventDefault();
            if (searchPageValue == NaN || searchPageValue < 1 || searchPageValue > lastPage || searchPageValue == page) {
                null
            } else {
                setPage(Number(searchPageValue))
                scrollTop()
                setTimeout(() => {
                    setSearchPageValue("")
                }, 2000)

            }
        }
    }

    return (
        <div>
            <div className="flex justify-center items-center p-4 gap-5 pb-8 flex-wrap">
                {page > 1
                    ? <button onClick={handlePrevPage}>Prev</button>
                    : null
                }

                <p className="text-nowrap">{`${page} of ${lastPage ? lastPage : "..."}`}</p>

                {page < lastPage
                    ? <button onClick={handleNextPage}>Next</button>
                    : null
                }
                <div className="flex gap-2">
                    <input type="number" min="1" onKeyDown={handleSearchPage} value={searchPageValue} placeholder={page} onChange={e => setSearchPageValue(e.target.value)} className="p-1 text-center w-16 rounded-md bg-gray-200 dark:bg-black " />
                    <button disabled={searchPageValue == NaN || searchPageValue < 1 || searchPageValue > lastPage ? true : false} onClick={handleSearchPage}>Go</button>
                </div>
            </div>
        </div >
    )
}

export default Pagination