import React from 'react'
import Botao from '../template/botao'

import moment from 'moment'


export default props => {
    const linhas = () => {
        const lista = props.lista || [] 

        const seriesFiltradas = lista.filter((series) => {
            return series.tipo === 'serie'
        })
        
        return seriesFiltradas.map(tarefa => (            
            <tr key={ tarefa._id }>
                <td className={tarefa.completo ? 'concluido' : '' }>{tarefa.descricao}</td>
                <td>{moment(tarefa.dataCriacao).format('DD/MM/YYYY')}</td>
                <td>

                   
                    <Botao style='success' icon='check' hide={tarefa.completo}
                        onClick={() => props.concluido(tarefa)} />
                   
                    <Botao style='warning' icon='undo' hide={!tarefa.completo}
                        onClick={() => props.pendente(tarefa)} />
                    
                    <Botao style='danger' icon='trash-o'
                        onClick={() => props.remover(tarefa)} />
                </td>
            </tr>
        ))
    }

    return (         
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Data</th>
                    <th className='acoesTabela'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {linhas()}
            </tbody>
        </table>
    )
}