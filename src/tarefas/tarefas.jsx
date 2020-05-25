import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TarefasForm from './tarefasForm'
import TarefasLista from './tarefasLista'


const URL = 'http://ec2-54-94-166-33.sa-east-1.compute.amazonaws.com:4010/api/tarefas'

export default class Tarefas extends Component {
    
    //amarrando this para o componente

    constructor(props) {
        super(props)
        this.state = { descricao: '', lista: [] }
        
        this.adicionar = this.adicionar.bind(this)
        this.alterar = this.alterar.bind(this)
        this.remover = this.remover.bind(this)
        this.concluido = this.concluido.bind(this)
        this.pendente = this.pendente.bind(this)

        this.pesquisar = this.pesquisar.bind(this)
        this.limpar = this.limpar.bind(this)        

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

    concluidosTotal(){        

         /* tarefas concluidas percentagem */

         let contConcluidas = 0
         let contTotal = 0

         Object.entries(this.state.lista).forEach(([, valor]) => {
             if(valor.completo === true && valor.tipo === ''){
                 contConcluidas += 1                 
             }
             if(valor.tipo === ''){
                 contTotal += 1
             }
         })        
         
         const totalConcluido = ((contConcluidas * 100)/contTotal)
         
         /** final da porcentagem */ 

        return (
            totalConcluido.toFixed(2) + ' % '
        )

    }

    listaNaoConcluida(){
        
        const lista = []
        
        Object.entries(this.state.lista).forEach(([, valor]) => {
            if(valor.completo === false){
                lista.push(valor)
            }
        })
        return lista       
        
    }
 

    render() {
        return ( 
                <div>                           
                    
                    <PageHeader nome='Tarefas' small ='Cadastro' total={this.concluidosTotal()}/>
                    
                    <div className='col-xs-12'>
                    <br />
                        <TarefasForm descricao = {this.state.descricao}
                            adicionar={this.adicionar}
                            alterar={this.alterar} 
                            pesquisar = { this.pesquisar }
                            limpar = { this.limpar }   
                        />
                    </div>                    
                    <TarefasLista lista = { this.listaNaoConcluida() }
                                    remover = { this.remover } 
                                    pendente = { this.pendente }
                                    concluido = { this.concluido }                              
                    />
                </div>
        )
               
           
        
    }
}