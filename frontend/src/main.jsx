import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Routes,
    createRoutesFromElements,
} from 'react-router-dom'
// import {useNavigate} from 'react-router-dom'

import App from './App.jsx'
import Login from './components/Forms/Login.jsx'
import Register from './components/Forms/Register.jsx'
import Starter from './components/Starter.jsx'
import Starter2 from './components/Starter2.jsx'
import ReportCrime from './components/ReportCrime.jsx'
import Dashboard from './components/Dashboard.jsx'
import HomeSubmitTip from './components/HomeSubmitTip.jsx'
import HomeCareers from './components/HomeCareers.jsx'
import HomeNews from './components/HomeNews.jsx'
import WantedList from './components/WantedList.jsx'
import Wanted from './components/Wanted.jsx'
import About from './components/About.jsx'
import SubmitTip from './components/SubmitTip.jsx'
import Support from './components/Support.jsx'
import News from './components/Pages/news/News.jsx'
import Careers from './components/Pages/career/Careers.jsx'
import AddJob from './components/admin/AddJob.jsx'
import AddNews from './components/admin/AddNews.jsx'
import AdminAddCriminal from './components/admin/AdminAddCriminal.jsx'
import AdminDashboard from './components/admin/AdminDashboard.jsx'
import Footer from './components/Footer/Footer.jsx'
import AdminShowTip from './components/admin/AdminShowTip.jsx'
import AdminLogin from './components/Forms/AdminLogin.jsx'
import AdminShowReport from './components/admin/AdminShowReport.jsx'
import JobApplication from './components/admin/JobApplication.jsx'
import Element from './components/Element.jsx'
import Press from './components/video/Press.jsx'
import Room from './components/video/Room.jsx'
import ForgotPassword from './components/Forms/ForgotPassword.jsx'
import ResetPassword from './components/Forms/ResetPassword.jsx'
import Face from './components/Face.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route
                path="/"
                element={
                    <>
                        <Starter />
                        <Dashboard />
                        {/* <Element /> */}
                        <HomeSubmitTip />
                        <HomeCareers />
                        <WantedList />
                        <HomeNews />
                        <Footer />
                    </>
                }
            />
            <Route path="/para" element={<Starter2 />} />,
            <Route path="/login" element={<Login />} />,
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/reset" element={<ResetPassword />}></Route>
            <Route path="/news" element={<News />} />,
            <Route path="/face" element={<Face />} />,
            <Route path="/most-wanted" element={<Wanted />} />,
            <Route path="/submit-tip" element={<SubmitTip />} />,
            <Route path="/report-crime" element={<ReportCrime />} />,
            <Route path="/about" element={<About />} />,
            <Route path="/career" element={<Careers />} />
            <Route path="/support" element={<Support />} />
            <Route path="/press" element={<Press />} />
            <Route path="/room/:roomID" element={<Room />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-login" element={<AdminLogin />}></Route>
            <Route path="/admin/show-tips" element={<AdminShowTip />}></Route>
            <Route path="/admin/news" element={<AddNews />}></Route>
            <Route path="/admin/jobs" element={<AddJob />}></Route>
            <Route
                path="/admin/crime-reports"
                element={<AdminShowReport />}
            ></Route>
            <Route
                path="/admin/most-wanted"
                element={<AdminAddCriminal />}
            ></Route>
            <Route
                path="/admin/jobs/applications"
                element={<JobApplication />}
            ></Route>
        </Route>,
    ),
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
