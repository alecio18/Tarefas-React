import React, { Component } from 'react'
import axios from 'axios'

import SeriesConcluidas from './seriesConcluidas'


//const URL = 'http://ec2-54-94-166-33.sa-east-1.compute.amazonaws.com:4010/api/tarefas'
const URL = 'http://localhost:4010/api/tarefas'

export default class Series extends Component {
    
    //amarrando this para o componente

    constructor(props) {
        super(props)
        this.state = { descricao: '', lista: [] } 

        this.concluido = this.concluido.bind(this)
        this.pendente = this.pendente.bind(this)       

        this.atualizar()        
    }

    atualizar(descricao = '') {

        //NodeRestFull

        const pesquisa = descricao ? `&descricao__regex=/${descricao}/` : ''

        axios.get(`${URL}?sort=-createdAt${pesquisa}`)
        .then(resp => this.setState({ ...this.state, descricao, lista: resp.data}))
        .catch((e) => {
            if(e == 'Error: Network Error'){
            console.log('Sem conexão')
            } else {
                console.log(e)
            }
        })
    }    
    
    pendente(tarefa){
        axios.put(`${URL}/${tarefa._id}`, { ...tarefa, completo: false})
            .then(resp => this.atualizar(this.state.descricao))

    }

    concluido(tarefa){
        axios.put(`${URL}/${tarefa._id}`, { ...tarefa, completo: true})
            .then(resp => this.atualizar(this.state.descricao))
        
    }

    render() {
        return ( 
                <div>           
                    <SeriesConcluidas lista = { this.state.lista }                                     
                                    pendente = { this.pendente }
                                    concluido = { this.concluido }                              
                    />
                </div>
        )
               
           
        
    }
}