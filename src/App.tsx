import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        
        <Switch /*ele faz com que só uma das rotas seja utilizada*/>
          <Route path="/" exact component={Home} 
          /*exact faz com que só permita que o caminho seja exato,pois sem ela vai permitir tudo com que comece com /*/
          />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/admin/rooms/:id" component={AdminRoom}/>
          <Route path="/rooms/:id" component={Room}/> 
        </Switch>     
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;