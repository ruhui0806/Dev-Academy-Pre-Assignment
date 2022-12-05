import Pagination from 'react-bootstrap/Pagination'

function PaginationButtons() {
    return (
        <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item onClick={() => console.log('item 1 is clicked')}>
                {1}
            </Pagination.Item>
            <Pagination.Ellipsis />

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
