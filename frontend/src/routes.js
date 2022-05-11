import Landing from './views/Landing'
import Connection from './views/Connection'
import MainPage from './views/Main-page'
import Profile from './views/Profile'
import Users from './views/Users'

export default [
    {path: '/', component: Landing},
    {path: '/signup', component: Landing},
    {path: '/login', component: Connection},
    {path: '/fil', component: MainPage},
    {path: '/profile', component: Profile},
    {path: '/utilisateurs', component: Users}
]