import Layout from './components/IU/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Posts from './features/posts/Posts';
import RegisterUser from './features/users/RegisterUser';
import LoginUser from './features/users/LoginUser';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="*" element={<h2>Not found!</h2>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
