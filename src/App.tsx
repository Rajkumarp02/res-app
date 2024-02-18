import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './Components/RootLayout';
import { OidcProvider, useOidc } from '@axa-fr/react-oidc';
import Profile from './pages/profile/Profile';
import RowCount from './pages/Total/RowCount';
import Student from './pages/Student';
import Dashboard from './pages/Dashboard/Dashboard';





const configuration = {
  client_id: 'interactive.public.short',
  redirect_uri: window.location.origin + '/authentication/callback',
  silent_redirect_uri: window.location.origin + '/authentication/silent-callback', 
  scope: 'openid profile email api offline_access',
  authority: 'https://demo.duendesoftware.com',
  //service_worker_relative_url:'/OidcServiceWorker.js',
  service_worker_only: true,
};

function App() {
  //const { login, logout, isAuthenticated } = useOidc();
  return (
    <OidcProvider configuration={configuration} >
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard/>}/>
            <Route path="studentlist" element={<Student/>} />
            <Route path='/profile-page' element={<Profile/>}/>
            <Route path='/totalcount' element={<RowCount/>}/>
          </Route>
        </Routes>
      </Router>
    </OidcProvider>
  )
}

export default App;
