import React from 'react'

const AllSubjects = ({ subjects }) => {
    return (
        <div>
            {subjects.map((subject) => <li>{subject.name}</li>)}
        </div>
    )
}

export default AllSubjects
