import React from 'react'
import Botao from '../template/botao'

import moment from 'moment'


export default props => {
    const linhas = () => {
        const lista = props.lista || []       
        
        const tarefasLista = lista.filter((tarefas)=> {
            return tarefas.tipo === ''
        })

        return tarefasLista.map(tarefa => (            
            <tr key={ tarefa._id }>
                <td className={tarefa.completo ? 'concluido' : '' }>{tarefa.descricao}</td>
                <td>{moment(tarefa.dataCriacao).format('DD/MM/YYYY')}</td>                
                <td>{moment(tarefa.dataCriacao).add(7, 'days') < moment()  ? <b><font color="#CD0000"> {moment(tarefa.dataCriacao).add(7, 'days').format('DD/MM/YYYY')} </font></b> : moment(tarefa.dataCriacao).add(7, 'days').format('DD/MM/YYYY') }</td>                
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
                    <th>Prazo</th>
                    <th className='acoesTabela'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {linhas()}
            </tbody>
        </table>
    )
}