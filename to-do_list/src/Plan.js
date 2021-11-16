import React from 'react'

export default function Plan(props) {
    return (
        <>
            <li className="shadow p-2 my-3 col-sm-9 ">{props.value}</li>
            <button onClick={() => { props.deletdata(props.id) }} className="btn btn-warning mx-2 px-4" type="button">X</button>
        </>
    )
}
