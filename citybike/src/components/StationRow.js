import React from 'react'
import { useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import { GET_ALL_STATIONS } from '../queries/queries'
import { DELETE_STATION } from '../queries/StationMutations'
const StationRow = ({ station }) => {
    const [deleteStation] = useMutation(DELETE_STATION, {
        variables: { idd: station.id },
        refetchQueries: [{ query: GET_ALL_STATIONS }],
    })
    return (
        <tr>
            <td>
                <Link to={`/stations/${station.ID}`} className="page-link ">
                    {station.ID}
                </Link>
            </td>
            <td>
                <Link to={`/stations/${station.ID}`} className="page-link ">
                    {station.Name}
                </Link>
            </td>
            <td>
                <Link to={`/stations/${station.ID}`} className="page-link ">
                    {station.Osoite}
                </Link>
            </td>
            <td>
                <Link to={`/stations/${station.ID}`} className="page-link ">
                    {station.Kapasiteet}
                </Link>
            </td>

            <td>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={deleteStation}
                >
                    <FaTrashAlt />{' '}
                </button>
            </td>
        </tr>
    )
}

export default StationRow
