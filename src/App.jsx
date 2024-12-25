import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import Teams from './components/Teams';
import Comilla from './components/Comilla';
import Barishal from './components/Barishal';
import Chattogram from './components/Chattogram';
import Highlights from './components/Highlights';
import Pointstable from './components/PointsTable';
import Quiz from './components/Quiz';
import Live from './components/Live';
import Forgetpassword from './components/Forgetpassword';
import Otp from './components/Otp';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import PointTable from './components/PointsTable';
import Matches from './components/Matches';
import Tickets from './components/Tickets';
import Prediction from './components/Prediction';
import Fantasy from './components/Fantasy';
import Stats from './components/Stats';
import Fantasylanding from './components/Fantasylanding';
import Fantasyadmin from './components/Fantasyadmin';
import Adminquiz from './components/Adminquiz';
import Teamdetails from './components/Teamdetails';
import Dhaka from './components/Dhaka';
import Sylhet from './components/Sylhet';
import Rangpur from './components/Rangpur';
import Community from './components/Community';




function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/comilla" element={<Comilla />} />
          <Route path="/dhaka" element={<Dhaka />} />
          <Route path="/sylhet" element={<Sylhet />} />
          <Route path="/rangpur" element={<Rangpur />} />
          <Route path="/community" element={<Community />} />
          <Route path="/barishal" element={<Barishal />} />
          <Route path="/chattogram" element={<Chattogram />} />
          <Route path="/highlights" element={<Highlights />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/pointstable" element={<Pointstable />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/live" element={<Live />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pointtable" element={<PointTable />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/fantasy" element={<Fantasy />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/fantasylanding" element={<Fantasylanding />} />
          <Route path="/fantasyadmin" element={<Fantasyadmin />} />
          <Route path="/adminquiz" element={<Adminquiz />} />
          <Route path="/teamdetails" element={<Teamdetails />} />
          
          

        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App