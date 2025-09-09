const string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-!@#$%^&*({}[];:./>?<,\|';
export const generatePassword = () => {
  let password = '';
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * (string.length - 0) + 0);
    password += string[index];
  }
  return password;
};
