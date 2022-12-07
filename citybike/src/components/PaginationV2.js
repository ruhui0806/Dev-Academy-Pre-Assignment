/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const PaginationV2 = ({ lastPage, paginate }) => {
    const pageNumers = []
    for (let i = 1; i <= lastPage; i++) {
        pageNumers.push(i)
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {pageNumers.map((number) => (
                    <li className="page-item" key={number}>
                        <a
                            className="page-link active"
                            href="#"
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default PaginationV2
