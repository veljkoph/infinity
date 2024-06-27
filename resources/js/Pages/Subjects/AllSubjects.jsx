import React from 'react'
import { useTranslation } from 'react-i18next'

const AllSubjects = ({ subjects }) => {
    const { t } = useTranslation()
    return (
        <div>
            {subjects.map((subject) => <li key={subject.id}>{subject.name}</li>)}
        </div>
    )
}

export default AllSubjects
