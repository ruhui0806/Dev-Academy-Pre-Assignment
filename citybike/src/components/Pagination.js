/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

const Pagination = ({ lastPage, paginate, currentPage }) => {
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <a
                        className="page-link active"
                        href="#"
                        aria-label="Previous"
                        onClick={
                            currentPage === 1
                                ? paginate(currentPage)
                                : () => paginate(currentPage - 1)
                        }
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>

                <li className="page-item" key={currentPage}>
                    <a
                        className="page-link active"
                        href="#"
                        onClick={() => paginate(currentPage)}
                    >
                        {currentPage}
                    </a>
                </li>

                <li className="page-item">
                    <a
                        className="page-link active"
                        href="#"
                        aria-label="Next"
                        onClick={
                            currentPage === lastPage
                                ? paginate(currentPage)
                                : () => paginate(currentPage + 1)
                        }
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination