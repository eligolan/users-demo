import './App.css';
import Table from './Components/UsersTable';
import ProfileCard from './Components/ProfileCard'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="App">
        <Table />
      </div>
    ),
  },
  {
    path: "about",
    element: <ProfileCard />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
