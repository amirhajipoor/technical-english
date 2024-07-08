import { lazy } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./Pages/Home"));
const Unit = lazy(() => import("./Pages/Unit"));

export default function App() {
	return (
		<div className="bg-slate-50 h-screen">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/unit/:unit" element={<Unit />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
