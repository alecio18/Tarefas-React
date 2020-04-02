import React from 'react'

import Cond from '../helper/condicional'

export default props => (

    <Cond teste={!props.hide}>
        <button className={'btn btn-' + props.style}
        onClick={props.onClick}>
            <i className={'fa fa-' + props.icon}></i>
        </button> 
    </Cond>

    
    /*
    if(props.hide) {
        null
    } else {
        return (
            <button className={'btn btn-' + props.style}
            onClick={props.onClick}>
                <i className={'fa fa-' + props.icon}></i>
            </button> 
        )
    }  
    */ 
    
    /*
    let x = 
    props.hide ? null : 
        <button className={'btn btn-' + props.style}
            onClick={props.onClick}>
                <i className={'fa fa-' + props.icon}></i>
        </button> 
    return x
    */
)