import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CandidatesPage from './pages/candidates/CandidatesPage';
import CandidateDetailPage from './pages/candidates/CandidateDetailPage';
import StudentsPage from './pages/StudentsPage';
import AdmissionListPage from './pages/AdmissionListPage';
import MatriculationPage from './pages/MatriculationPage';
import PaymentReportsPage from './pages/PaymentReportsPage';
import PostUtmePage from './pages/PostUtmePage';
import SetupPage from './pages/SetupPage';
import ViewPaymentStatusPage from './pages/ViewPaymentStatusPage';
import GSSRegistrationPage from './pages/GSSRegistrationPage';
import DepartmentAdminPage from './pages/DepartmentAdminPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'screening/candidates', element: <CandidatesPage /> },
      { path: 'screening/candidates/:id', element: <CandidateDetailPage /> },
      { path: 'students', element: <StudentsPage /> },
      { path: 'admission-list', element: <AdmissionListPage /> },
      { path: 'matriculation', element: <MatriculationPage /> },
      { path: 'payment-reports', element: <PaymentReportsPage /> },
      { path: 'post-utme', element: <PostUtmePage /> },
      { path: 'setup', element: <SetupPage /> },
      { path: 'payment-status', element: <ViewPaymentStatusPage /> },
      { path: 'gss-registration', element: <GSSRegistrationPage /> },
      { path: 'department-admin', element: <DepartmentAdminPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
