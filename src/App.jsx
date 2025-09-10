import { Route, Routes } from 'react-router-dom'
import { AddJobPost, AllApplicantProfiles, CastingApplicationForm, CastingCallDetails, MyApplications, MySubscription, NewCastingCalls, PlanSubscription, PopularCastingCalls, PreviousJobPost, UpcomingProjects } from './components'
import ApplicantPhotoGallery from './components/producation/ApplicantPhotoGallery'
import ApplicantProfile from './components/producation/ApplicantProfile'
import ApplicationApplyDetails from './components/producation/ApplicationApplyDetails'
import ProductionCompleteProfile from './components/producation/ProductionCompleteProfile'
import { HomeLayout, ProductionLayout, UserLayout } from './layouts'
import { AboutUs, CastingCalls, Contact, Home, OurClients, Plans, ProductionForgotPassword, ProductionLogin, ProductionRegister, ProductionResetPassword, ProductionVerification, Profiles, ProjectDetails, Projects, Services, UserForgotPassword, UserLogin, UserRegister, UserResetPassword, UserVerification } from './pages'
import UserProfile from './pages/users/UserProfile'
import ProtectedRoute from './routes/ProtectedRoute'


export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>

        {/* Public Routes */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/verify" element={<UserVerification />} />
        <Route path="/user/forgot-password" element={<UserForgotPassword />} />
        <Route path="/user/reset-password" element={<UserResetPassword />} />

        <Route path="/production/login" element={<ProductionLogin />} />
        <Route path="/production/register" element={<ProductionRegister />} />
        <Route path="/production/verify" element={<ProductionVerification />} />
        <Route path="/production/forgot-password" element={<ProductionForgotPassword />} />
        <Route path="/production/reset-password" element={<ProductionResetPassword />} />

        {/*Home Routes */}
        <Route path="/" element={<HomeLayout><Home /></HomeLayout>} />
        <Route path="/about" element={<HomeLayout><AboutUs /></HomeLayout>} />
        <Route path="/services" element={<HomeLayout><Services /></HomeLayout>} />
        <Route path="/projects" element={<HomeLayout><Projects /></HomeLayout>} />
        <Route path="/profiles" element={<HomeLayout><Profiles /></HomeLayout>} />
        <Route path="/plans" element={<HomeLayout><Plans /></HomeLayout>} />
        <Route path="/contact" element={<HomeLayout><Contact /></HomeLayout>} />
        <Route path="/clients" element={<HomeLayout><OurClients /></HomeLayout>} />
        <Route path="/castingcalls" element={<HomeLayout><CastingCalls /></HomeLayout>} />

        <Route path="/project-details/:id" element={<HomeLayout><ProjectDetails /></HomeLayout>} />

{/* ======================= USER ROUTE START ====================================================================== */}
        <Route
          path="/user/popular-casting-calls"
          element={
            <ProtectedRoute role={["user"]}>
              <UserLayout>
                <PopularCastingCalls />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/my-application"
          element={
            <ProtectedRoute role={["user"]}>
              <UserLayout>
                <MyApplications />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/new-casting-calls"
          element={
            <ProtectedRoute role={["user"]}>
              <UserLayout>
                <NewCastingCalls />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/plans"
          element={
            <ProtectedRoute role={["user"]}>
              <UserLayout>
                <PlanSubscription />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/my-subscription"
          element={
            <ProtectedRoute role={["user"]}>
              <UserLayout>
                <MySubscription />
              </UserLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/complate-profile"
          element={
            <ProtectedRoute role={["user"]}>
                <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/castingapplicaton/:jobId/"
          element={
            <ProtectedRoute role={["user"]}>
              <UserLayout>
                <CastingApplicationForm />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/castingcalldetails/:jobId"
          element={
            <ProtectedRoute role={["user"]}>
              <UserLayout>
                <CastingCallDetails />
              </UserLayout>
            </ProtectedRoute>
          }
        />

        {/* ========================= Production Routes =============================================  */}

        <Route
          path="/production/complete-profile"
          element={
            <ProtectedRoute role={["production"]}>
                <ProductionCompleteProfile />
            </ProtectedRoute>

          }
        />

        <Route path="/production/add-job" element={
          <ProtectedRoute role={["production"]}>
            <ProductionLayout>
              <AddJobPost />
            </ProductionLayout>
          </ProtectedRoute>}
        />
        <Route path="/production/previous-job" element={
          <ProtectedRoute role={["production"]}>
            <ProductionLayout>
              <PreviousJobPost />
            </ProductionLayout>
          </ProtectedRoute>
        } />
        <Route path="/production/upcoming" element={
          <ProtectedRoute role={["production"]}>
            <ProductionLayout>
              <UpcomingProjects />
            </ProductionLayout>
          </ProtectedRoute>
        } />
        <Route path="/production/profiles" element={
          <ProtectedRoute role={["production"]}>
            <ProductionLayout>
              <AllApplicantProfiles />
            </ProductionLayout>
          </ProtectedRoute>
        } />

       <Route
  path="/production/applicant-profile/:userId"
  element={
    <ProtectedRoute role={["production"]}>
      <ProductionLayout>
        <ApplicantProfile />
      </ProductionLayout>
    </ProtectedRoute>
  }
/>

        <Route
          path="/production/applicant-profile-photos"
          element={
            // <ProtectedRoute role={["production"]}>
            <ProductionLayout>
              <ApplicantPhotoGallery />
            </ProductionLayout>
            // </ProtectedRoute>

          }
        />


        <Route
  path="/production/application-details/:id"
  element={
    <ProductionLayout>
      <ApplicationApplyDetails />
    </ProductionLayout>
  }
/>


      </Routes>
    </div>
  )
}
