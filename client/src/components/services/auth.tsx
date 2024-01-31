// src/services/api.ts

export const apiLoginPost = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<{ token: string }> => {
  const response = await fetch('http://localhost:3001/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Erro ao efetuar login');
  }

  return response.json();
};

export const apiRegisterPost = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<{ token: string }> => {
  const response = await fetch('http://localhost:3001/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    // Aqui você pode querer personalizar o tratamento do erro
    // baseado no status da resposta ou na mensagem de erro retornada.
    throw new Error('Erro ao efetuar registro');
  }

  return response.json();
};
