import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../../Layout/DashBoardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/AppointmentPage/Appointment/Appointment";
import Login from "../../Pages/AuthenticationPages/LoginPage/Login";
import Register from "../../Pages/AuthenticationPages/RegisterPage/Register";
import AddDoctor from "../../Pages/DashBoardPage/AddDoctor/AddDoctor";
import AllUsers from "../../Pages/DashBoardPage/AllUsers/AllUsers";
import ManageDoctors from "../../Pages/DashBoardPage/ManageDoctors/ManageDoctors";
import MyAppointments from "../../Pages/DashBoardPage/MyAppointments/MyAppointments";
import Payment from "../../Pages/DashBoardPage/Payment/Payment";
import Home from "../../Pages/HomePage/Home/Home";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage></ErrorPage>,
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: '/dashboard',
        errorElement: <ErrorPage></ErrorPage>,
        element: <PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointments></MyAppointments>
            },
            {
                path: '/dashboard/payment/:id',
                loader: ({ params }) => fetch(`https://doctors-portal-server-lyart-eight.vercel.app/booking/${params.id}`),
                element: <Payment></Payment>
            },
            {
                path: '/dashboard/users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/add-doctor',
                element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },
            {
                path: '/dashboard/manage-doctors',
                element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            },
        ]
    }
])