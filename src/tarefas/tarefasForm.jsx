import React from 'react'
import Grid from '../template/grid'
import Botao from '../template/botao'

export default props => {
    /**
     * 
     * shift + enter = Pesquisar()
     * esc = limpar()
     * enter = adicionar()
     * 
     */
    const teclas = (e) => {
        if (e.key === 'Enter'){
            e.shiftKey ? props.pesquisar() : props.adicionar()
        } else if (e.key === 'Escape') {
            props.limpar()
        }
    }
    
    return (
        <div role='form' className='TarefasForm'>
            
            <Grid cols='12 9 10'>
            
                <input id='descricao' className='controle-form' 
                placeholder='Adicione uma tarefa' size='30'
                onChange={props.alterar}
                onKeyUp={teclas}
                value={props.descricao}></input>
           
            </Grid>
    
            <Grid cols='12 3 2'>
            
            {//<div className='col-xs-12 col-sm-3 col-md-2'>
            } 
                
                <Botao style='primary' icon='plus' onClick={props.adicionar} />
                <Botao style='info' icon='search'
                    onClick={props.pesquisar} />
    
                <Botao style='default' icon='close' 
                    onClick={props.limpar} />
                
                
                {/*<button className='btn btn-info'
                onClick={props.pesquisar}>
                    <i className='fa fa-search'></i>
                </button>
                */}         
                
            </Grid>        
    
        </div>
    )
}