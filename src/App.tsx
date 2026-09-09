import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import SiteAtmosphere from "./components/SiteAtmosphere"
import { MiraeeLogo } from "./components/LegalFormKit"
import "./pages/V11AlternatingSections.css"

// v1/v1.1/v2/v3 are unrouted (source files kept in src/pages/, not deleted)
// in case they're needed again. "/" now serves v4.
const Support = lazy(() => import("./pages/Support"))
const Terms = lazy(() => import("./pages/Terms"))
const Privacy = lazy(() => import("./pages/Privacy"))
const ArbitrationOptOut = lazy(() => import("./pages/ArbitrationOptOut"))
const DisputeNotice = lazy(() => import("./pages/DisputeNotice"))
const BookDemo = lazy(() => import("./pages/BookDemo"))
const NotFound = lazy(() => import("./pages/NotFound"))

// v4 — the current build. Pages live in ./pages/v4/ because it is the only
// version with a parent/child hierarchy (Resources hub + children).
const V4Home = lazy(() => import("./pages/v4/Home"))
const V4Platform = lazy(() => import("./pages/v4/Platform"))
const V4Solutions = lazy(() => import("./pages/v4/Solutions"))
const V4Technology = lazy(() => import("./pages/v4/Technology"))
const V4WhyMiraee = lazy(() => import("./pages/v4/WhyMiraee"))
const V4Company = lazy(() => import("./pages/v4/Company"))
const V4Resources = lazy(() => import("./pages/v4/Resources"))
const V4Calculator = lazy(() => import("./pages/v4/Calculator"))
const V4HelpCenter = lazy(() => import("./pages/v4/HelpCenter"))
const V4ResourcesGuides = lazy(() => import("./pages/v4/ResourceStub").then(m => ({ default: m.V4ResourcesGuides })))
const V4ResourcesBlog = lazy(() => import("./pages/v4/ResourceStub").then(m => ({ default: m.V4ResourcesBlog })))
const V4ResourcesNews = lazy(() => import("./pages/v4/ResourceStub").then(m => ({ default: m.V4ResourcesNews })))
const V4ResourcesLife = lazy(() => import("./pages/v4/ResourceStub").then(m => ({ default: m.V4ResourcesLife })))
const V4Implementation = lazy(() => import("./pages/v4/Implementation"))
const V4Integrations = lazy(() => import("./pages/v4/Integrations"))
const V4AiAssistant = lazy(() => import("./pages/v4/AiAssistant"))
const V4SolutionEmployees = lazy(() => import("./pages/v4/solutions/Employees"))
const V4SolutionManagers = lazy(() => import("./pages/v4/solutions/Managers"))
const V4SolutionFinance = lazy(() => import("./pages/v4/solutions/Finance"))
const V4SolutionTravelLeads = lazy(() => import("./pages/v4/solutions/TravelLeads"))
const V4SolutionAdmins = lazy(() => import("./pages/v4/solutions/Admins"))
const V4SolutionChros = lazy(() => import("./pages/v4/solutions/Chros"))
const V4SolutionBusinessTravel = lazy(() => import("./pages/v4/solutions/BusinessTravel"))
const V4SolutionMeetingsEvents = lazy(() => import("./pages/v4/solutions/MeetingsEvents"))
const V4SolutionExecutiveTravel = lazy(() => import("./pages/v4/solutions/ExecutiveTravel"))
const V4SolutionGlobalMobility = lazy(() => import("./pages/v4/solutions/GlobalMobility"))
const V4SolutionEmergencyDisruption = lazy(() => import("./pages/v4/solutions/EmergencyDisruption"))

function PageFallback() {
    return (
        <div className="page-preloader min-h-screen flex flex-col gap-5 items-center justify-center bg-page" aria-label="Loading Miraee">
            <MiraeeLogo fill="#E55602" height={38} />
            <div className="page-preloader__line" aria-hidden="true"><span /></div>
        </div>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <SiteAtmosphere />
            <Suspense fallback={<PageFallback />}>
                <Routes>
                    <Route path="/" element={<V4Home />} />
                    <Route path="/v4" element={<V4Home />} />
                    <Route path="/platform" element={<V4Platform />} />
                    <Route path="/v4/platform" element={<V4Platform />} />
                    <Route path="/solutions" element={<V4Solutions />} />
                    <Route path="/v4/solutions" element={<V4Solutions />} />
                    <Route path="/technology" element={<V4Technology />} />
                    <Route path="/v4/technology" element={<V4Technology />} />
                    <Route path="/why-miraee" element={<V4WhyMiraee />} />
                    <Route path="/v4/why-miraee" element={<V4WhyMiraee />} />
                    <Route path="/company" element={<V4Company />} />
                    <Route path="/v4/company" element={<V4Company />} />
                    <Route path="/resources" element={<V4Resources />} />
                    <Route path="/v4/resources" element={<V4Resources />} />
                    <Route path="/resources/guides" element={<V4ResourcesGuides />} />
                    <Route path="/v4/resources/guides" element={<V4ResourcesGuides />} />
                    <Route path="/resources/life-at-miraee" element={<V4ResourcesLife />} />
                    <Route path="/v4/resources/life-at-miraee" element={<V4ResourcesLife />} />
                    <Route path="/resources/blog" element={<V4ResourcesBlog />} />
                    <Route path="/v4/resources/blog" element={<V4ResourcesBlog />} />
                    <Route path="/resources/news" element={<V4ResourcesNews />} />
                    <Route path="/v4/resources/news" element={<V4ResourcesNews />} />
                    <Route path="/resources/calculator" element={<V4Calculator />} />
                    <Route path="/v4/resources/calculator" element={<V4Calculator />} />
                    <Route path="/resources/help-center" element={<V4HelpCenter />} />
                    <Route path="/v4/resources/help-center" element={<V4HelpCenter />} />
                    <Route path="/implementation" element={<V4Implementation />} />
                    <Route path="/v4/implementation" element={<V4Implementation />} />
                    <Route path="/integrations" element={<V4Integrations />} />
                    <Route path="/v4/integrations" element={<V4Integrations />} />
                    <Route path="/ai-assistant" element={<V4AiAssistant />} />
                    <Route path="/v4/ai-assistant" element={<V4AiAssistant />} />
                    <Route path="/solutions/employees" element={<V4SolutionEmployees />} />
                    <Route path="/v4/solutions/employees" element={<V4SolutionEmployees />} />
                    <Route path="/solutions/managers" element={<V4SolutionManagers />} />
                    <Route path="/v4/solutions/managers" element={<V4SolutionManagers />} />
                    <Route path="/solutions/finance" element={<V4SolutionFinance />} />
                    <Route path="/v4/solutions/finance" element={<V4SolutionFinance />} />
                    <Route path="/solutions/travel-leads" element={<V4SolutionTravelLeads />} />
                    <Route path="/v4/solutions/travel-leads" element={<V4SolutionTravelLeads />} />
                    <Route path="/solutions/admins" element={<V4SolutionAdmins />} />
                    <Route path="/v4/solutions/admins" element={<V4SolutionAdmins />} />
                    <Route path="/solutions/chros" element={<V4SolutionChros />} />
                    <Route path="/v4/solutions/chros" element={<V4SolutionChros />} />
                    <Route path="/solutions/business-travel" element={<V4SolutionBusinessTravel />} />
                    <Route path="/v4/solutions/business-travel" element={<V4SolutionBusinessTravel />} />
                    <Route path="/solutions/meetings-events" element={<V4SolutionMeetingsEvents />} />
                    <Route path="/v4/solutions/meetings-events" element={<V4SolutionMeetingsEvents />} />
                    <Route path="/solutions/executive-travel" element={<V4SolutionExecutiveTravel />} />
                    <Route path="/v4/solutions/executive-travel" element={<V4SolutionExecutiveTravel />} />
                    <Route path="/solutions/global-mobility" element={<V4SolutionGlobalMobility />} />
                    <Route path="/v4/solutions/global-mobility" element={<V4SolutionGlobalMobility />} />
                    <Route path="/solutions/emergency-disruption" element={<V4SolutionEmergencyDisruption />} />
                    <Route path="/v4/solutions/emergency-disruption" element={<V4SolutionEmergencyDisruption />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/arbitration-opt-out" element={<ArbitrationOptOut />} />
                    <Route path="/dispute-notice" element={<DisputeNotice />} />
                    <Route path="/book-a-demo" element={<BookDemo />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
