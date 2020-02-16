import React from 'react'
import Tag from './Tag'


const TagsList = props => {

    return (
        <ul>
            {props.tags.map(tag => {
                return <Tag key={tag.id} id={tag.id} name={tag.name}/>
            })}
        </ul>
    ) 
}


export default TagsList