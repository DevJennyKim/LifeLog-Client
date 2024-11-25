const { default: axios } = require('axios');
const { createContext } = require('react');

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const login = async (inputs) => {
    const url = '/api/auth/login';
    const response = await axios.post(`${baseUrl}${url}`, inputs, {
      withCredentials: true,
    });
    console.log('user = ', response.data.user);
    setCurrentUser(response.data.user);
    document.cookie = `access_token=${response.data.token}; path=/; max-age=7200;`;
  };
  const logout = async () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    document.cookie = 'access_token=; path=/; max-age=0;';
  };
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
