import Landing from './views/Landing'
import Connection from './views/Connection'
import MainFeed from './views/Main-feed'

export default [
    {path: '/', component: Landing},
    {path: '/signup', component: Landing},
    {path: '/login', component: Connection},
    {path: '/fil', component: MainFeed}
]