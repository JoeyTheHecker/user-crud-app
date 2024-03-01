import {createBrowserRouter, Navigate} from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import Users from "./views/Users";
import NotFound from './views/NotFound';
import SkeletonUserForm from "./views/skeletons/SkeletonUserForm";
import { lazy,Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "./views/ErrorFallback"

const EditForm = lazy(() => import('./views/EditForm'))
const AddForm = lazy(() => import('./views/AddForm'))

const router = createBrowserRouter([
    
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/users"/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/users/new',
                element: 
                        <ErrorBoundary
                            FallbackComponent={ErrorFallback}
                            onReset={() => <Navigate to="/"/>}
                        >
                        <Suspense fallback={<SkeletonUserForm/>}>
                            <AddForm/>
                        </Suspense>
                        </ErrorBoundary>
            },
            {
                path: '/users/:id',
                element: 
                        <ErrorBoundary
                            FallbackComponent={ErrorFallback}
                            onReset={() => <Navigate to="/"/>}
                        >
                        <Suspense fallback={<SkeletonUserForm/>}>
                            <EditForm/>
                        </Suspense>
                        </ErrorBoundary>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])


export default router;