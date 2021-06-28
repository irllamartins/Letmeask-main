import { useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.scss';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import toast, { Toaster } from 'react-hot-toast';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('') ;

//!!!!Parte do codigo que cria salas !!!
  async function handleCreateRoom() {
    if (!user) {
      //await só vai permitir se o retorno for sucesso
      await signInWithGoogle()
      //obs: o signInWithPoup() permiter abrir um pop para o usuario escolher a conta Google e logar
    }
    //só vai permitir exercutar a linha abaixo se await for verdadeiro(logado) e ser redimencionado para digitar o nome da sala
    history.push('/rooms/new');
    
  }

  //!!!!Parte do codigo que entra em salas já criadas!!!
  async function handleJoinRoom(event: FormEvent){ 
    event.preventDefault();
    //o trim tira os espaços do codigo da sala criada(newRoom). Caso positivo,retorna nada
    if(roomCode.trim()===''){
      return;
    }
    //o get vai procurar se existe  
    const roomRef = await database.ref(`rooms/${roomCode}`).get();


    //caso não exista a sala
    if(!roomRef.exists()){
      toast.error('A sala não existe');
      return;
    }
    //sala encerrada
    if (roomRef.val().endedAt) {
      toast.error('A sala foi encerrada');
      return;
    }
    
    //vai definir se o usuario é admin ou não
    if(user?.id===roomRef.val().authorId){
      return history.push(`/admin/rooms/${roomCode}`)
    }
    
    history.push(`/rooms/${roomCode}`);
  }
  return (
    <div id="page-auth">
      <Toaster position="top-right" reverseOrder={false}/>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}