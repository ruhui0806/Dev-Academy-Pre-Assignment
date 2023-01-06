/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
const Pagination = ({ lastPage, paginate, currentPage, handlePageClick }) => {
    const [currentValue, setCurrentValue] = useState('')
    return (
        <div>
            {/* nagivation part */}
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className="page-item" key={currentPage}>
                        <a
                            className="page-link"
                            href="#"
                            onClick={() => paginate(currentPage)}
                        >
                            <span>Current page: </span> {currentPage} /{' '}
                            {lastPage}
                        </a>
                    </li>
                    <li className="page-item" key="{jumptoThePage}">
                        <input
                            id="pagination"
                            className="form-control"
                            value={currentValue}
                            placeholder="Jump to the page: "
                            onChange={(e) => setCurrentValue(e.target.value)}
                        />
                    </li>
                    <li key="{buttonForjumptoThePage}">
                        <button
                            className="page-item page-link"
                            onClick={() => {
                                paginate(currentValue)
                                setCurrentValue('')
                            }}
                        >
                            {' '}
                            Go
                        </button>
                    </li>
                </ul>
            </nav>
            {/* react-pagination part: */}
            <div>
                <ReactPaginate
                    className="pagination justify-content-center"
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    forcePage={currentPage - 1}
                    onPageActive={() => paginate(currentPage - 1)}
                    pageRangeDisplayed={9}
                    marginPagesDisplayed={1}
                    pageCount={lastPage}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    activeLinkClassName="page-link"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    )
}

export default Pagination
