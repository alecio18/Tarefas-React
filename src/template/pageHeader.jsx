import React from 'react'

export default props => (
    <div>   
        <header className='page-header'>        
            <div className='col-xs-8'> 
            <h2>{ props.nome } <small>{ props.small }</small> </h2>
            </div>
            <div className='col-xs-4'> 
                <h3> Total concluído : {props.total} </h3>
            </div>
        </header>
    </div>
)