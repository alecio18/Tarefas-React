import React, { Component } from 'react'
import axios from 'axios'

import TarefasConcluidas from './tarefasConcluidas'


const URL = 'http://ec2-54-94-166-33.sa-east-1.compute.amazonaws.com:4010/api/tarefas'

export default class Tarefas extends Component {
    
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
    
    adicionar() {
       const descricao = this.state.descricao
        axios.post(URL, { descricao })
            .then(resp => this.atualizar())
            .catch((e) => {
                if(e == 'Error: Network Error'){
                    console.log('Sem conexão com o Back')
                }else
                console.log( e )
            })
    }

    alterar(evento){
        //this.state.descricao = evento

        this.setState({ ...this.state, descricao: evento.target.value })
    } 

    remover(tarefa){
        axios.delete(`${URL}/${tarefa._id}`)
            .then(resp => this.atualizar(this.state.descricao))
            .catch((e) => {
                console.log('Operação NÃO realizada : ' + e )
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

    pesquisar(){
        this.atualizar(this.state.descricao)
    }

    limpar(){        
        this.atualizar()
    }

    render() {
        return ( 
                <div>           
                    <TarefasConcluidas lista = { this.state.lista }                                     
                                    pendente = { this.pendente }
                                    concluido = { this.concluido }                              
                    />
                </div>
        )
               
           
        
    }
}