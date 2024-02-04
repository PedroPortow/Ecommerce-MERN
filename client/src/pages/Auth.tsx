import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { SyntheticEvent, useState } from 'react';
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [passwordConfirmation, setPasswordConfirmation] = useState<String>('');
  const [_, setCookies] = useCookies(["access_token"])

  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/user/login", {
        username, password
      })

      console.log({result})

      setCookies("access_token", result.data.token);
      localStorage.setItem("userID", result.data.userID);
      navigate("/shop")
    } catch(err: any) {
      // if(err.response.data.type === UserErrors.NO_USER_FOUND){
      //   alert("Usuário não encontrado!")
      // }

      console.error(err)
      // TODO: ADICIONAR RESTO DOS ALERTAS PARA O RESTO DOS ERROS E TAMBÉM MOSTRAR
      // A MENSAGEM COMO UM FEEDBACK ALERTA DO SHADCDN NÃO SÓ UM ALERTA JS NORMAL
    }
  };

  const handleRegister = async (event: SyntheticEvent) => {
    event.preventDefault();
    try{
      await axios.post("http://localhost:3001/user/register", {
        username, password
      })
    } catch(err: any){
      console.error(err)
    }
  };

  return (
    <div className=" flex items-center justify-center h-screen bg-slate-100">
      <Card className="w-[600px] p-8">
        <h1 className="text-2xl font-bold mb-8">{isLogin ? 'Login' : 'Register'}</h1>

        <form>
          <Input
            type="text"
            placeholder="Username..."
            className="block w-full p-2"
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            className="block w-full p-2 mt-2 mb-4"
            onChange={e => setPassword(e.target.value)}
          />
          {/* {!isLogin && (
            <Input
              type="password"
              placeholder="Password"
              className="block w-full p-2"
            />
            )
          } */}
          <Button
            className="w-full"
            onClick={isLogin ? handleLogin : handleRegister}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>

        <p
          onClick={toggleAuthMode}
          className="mt-4 text-sm text-blue-600 hover:underline cursor-pointer"
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </p>
      </Card>
    </div>
  );
};

export default Auth;
