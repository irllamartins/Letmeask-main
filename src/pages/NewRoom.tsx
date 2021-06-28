import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState}from 'react';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
// import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
  const {user} = useAuth()
  const history = useHistory()
  //começa com o estado do mesmo tipo da variavel
  const [newRoom,setNewRoom] = useState('')

  //vai impedir de redimencionar a pagina ao criar a sala
  // utiliza o ":"" para tipar a variavel
  async function handleCreateRoom(event: FormEvent){
    event.preventDefault()

    //o trim tira os espaços do codigo da sala criada(newRoom). Caso positivo,retorna nada
    if(newRoom.trim()===''){
      return;
    }
    //ref referencia a linha do banco de dados
    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })
    //insere o caminho com o id da sala
    history.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}