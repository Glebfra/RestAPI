import React from "react";

function WordsTable() {
    return (
        <table className='text-center justify-content-center'>
            <thead>
            <tr>
                <th className='m-2 p-2'>
                    Russian
                </th>
                <th className='m-2 p-2'>
                    English
                </th>
                <th className='m-2 p-2'>
                    Japanese
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    200
                </td>
                <td>
                    200
                </td>
            </tr>
            </tbody>
        </table>
    )
}

export default WordsTable