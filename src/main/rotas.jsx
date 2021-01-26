import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Tarefas from '../tarefas/tarefas'
import Concluidas from '../concluidas/concluidas'
import Sobre from '../sobre/sobre'
import Series from '../series/series'
import SeriesConcluidas from '../seriesConluidas/concluidas'
import Mangas from '../mangas/mangas'
import MangasConcluidos from '../mangasConcluidos/concluidas'
import Jogos from '../jogos/jogos'
import JogosConcluidos from '../jogosConcluidos/concluidos'


export default props => (
    <Router history={ hashHistory }>
        <Route path='/tarefas' component = { Tarefas } />
        <Route path='/concluidas' component = { Concluidas } />
        <Route path='/series' component = { Series } />
        <Route path='/seriesConcluidas' component = { SeriesConcluidas } />
        <Route path='/mangas' component = { Mangas } />
        <Route path='/mangasConcluidos' component = { MangasConcluidos } />
        
        <Route path='/jogos' component = { Jogos } />
        <Route path='/jogosConcluidos' component = { JogosConcluidos } />
        
        <Route path='/sobre' component = { Sobre } />
        <Redirect from='*' to='/tarefas' />
    </Router>
)