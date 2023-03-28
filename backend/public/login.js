const socket = io();

const client = feathers();

client.configure(feathers.socketio(socket));

client.configure(feathers.authentication({
  storage: window.localStorage
}));

const login = async (user, pass) => {
  try {
    const reAuth = await client.reAuthenticate();
    console.log(reAuth);
    document.getElementById('app').innerHTML = `Token actif  = ${reAuth.accessToken}`;
    return reAuth;
  } catch (error) {
    const newAuth = await client.authenticate({
      strategy: 'local',
      email: user,
      password: pass
    });
    console.log(newAuth);
    document.getElementById('app').innerHTML = `Nouveau token  = ${newAuth.accessToken}`;
    return newAuth;
  }
};

const logout = async () => {
  await client.logout();
  document.getElementById('btnLogin').style = 'display:block;';
  document.getElementById('btnLogout').style = 'display:none;';
  document.getElementById('app').innerHTML = 'Utilisateur déconnecté!';
};

const callLogin = async () => {
  try {
    await login(document.getElementById('email').value, document.getElementById('password').value);
    document.getElementById('btnLogout').style = 'display:block;';
    document.getElementById('btnLogin').style = 'display:none;';
  } catch (error) {
    alert('Erreur dans les informations de login!');
  }
};
