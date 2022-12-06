import Pagination from 'react-bootstrap/Pagination'

const PaginationButtons = ({ lastPage }) => {
    const pageNumers = []
    for (let i = 0; i < lastPage; i++) {
        pageNumers.push(i)
    }

    return (
        <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />
            {/* {pageNumers.map((number) => (
                <li key={number} className="page-item">
                    <Pagination.Item active>{number}</Pagination.Item>
                </li>
            ))} */}

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
        </Pagination>
    )
}

export default PaginationButtons
