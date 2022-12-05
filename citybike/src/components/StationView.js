import React from 'react'

export default function StationView({ station }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Journey start from this stations</th>
                        <th>Journey end at this stations</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{station.Name}</td>
                        <td>{station.ID}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
