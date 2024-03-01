import Layout from './components/IU/Layout/Layout';
import { Route, Routes } from 'react-router-dom';

import AllPosts from './features/posts/AllPosts';
import RegisterUser from './features/users/RegisterUser';
import LoginUser from './features/users/LoginUser';
import FullPost from './features/posts/FullPost';
import NewPost from './features/posts/NewPost';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="*" element={<h2>Not found!</h2>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
