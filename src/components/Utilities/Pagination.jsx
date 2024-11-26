const Pagination = ({ setPage, page, lastPage }) => {

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

    return (
        <div>
            <div className="flex justify-center items-center p-4 gap-5 pb-8 ">
                {page > 1
                    ? <button onClick={handlePrevPage}>Prev</button>
                    : null
                }

                <p>{`${page} of ${lastPage ? lastPage : "..."}`}</p>

                {page < lastPage
                    ? <button onClick={handleNextPage}>Next</button>
                    : null
                }
            </div>
        </div >
    )
}

export default Pagination