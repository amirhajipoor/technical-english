import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./Pages/Home"));
const Unit = lazy(() => import("./Pages/Unit"));
const AddUnit = lazy(() => import("./Pages/AddUnit"));

export default function App() {
	return (
		<div className="bg-slate-50 h-screen">
			<BrowserRouter>
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/unit/:unit" element={<Unit />} />
						<Route path="/unit/add" element={<AddUnit />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</div>
	);
}
