import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Tarefas from '../tarefas/tarefas'
import Concluidas from '../concluidas/concluidas'
import Sobre from '../sobre/sobre'
import Series from '../series/series'
import SeriesConcluidas from '../seriesConluidas/concluidas'
export default props => (
    <Router history={ hashHistory }>
        <Route path='/tarefas' component = { Tarefas } />
        <Route path='/concluidas' component = { Concluidas } />
        <Route path='/series' component = { Series } />
        <Route path='/seriesConcluidas' component = { SeriesConcluidas } />
        <Route path='/sobre' component = { Sobre } />
        <Redirect from='*' to='/tarefas' />
    </Router>
)