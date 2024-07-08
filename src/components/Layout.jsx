import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useParams } from "react-router-dom";
import units from "../Utils/units";
import Logo from "../assets/logo.png";

export default function Layout({ children }) {
	const [open, setOpen] = useState(false);

	const params = useParams();

	const toggle = () => setOpen((current) => !current);

	return (
		<main>
			<header className="bg-white shadow-sm border-b border-slate-300 px-6 py-4 md:px-10 md:py-6 lg:px-16">
				<div className="flex justify-between items-center">
					<div className="flex items-center justify-center gap-2 lg:gap-3">
						<img loading="lazy" className="w-10" src={Logo} alt="technical english dictionary" />
						<h1 className="font-bold text-slate-800 text-lg">
							Technical English
						</h1>
					</div>
					<button onClick={toggle} className="flex items-end">
						<div>
							{open ? (
								<motion.svg
									key="close"
									initial={{ opacity: 0, rotate: -90 }}
									animate={{ opacity: 1, rotate: 0 }}
									transition={{ duration: 0.3 }}
									// exit={{ opacity: 0 }}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									fill="none"
									stroke="currentColor"
									className="size-7 md:size-8 text-slate-700 hover:text-slate-900"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18 18 6M6 6l12 12"
									/>
								</motion.svg>
							) : (
								<motion.svg
									key="open"
									initial={{ opacity: 0, rotate: -90 }}
									animate={{ opacity: 1, rotate: 0 }}
									transition={{ duration: 0.3 }}
									// exit={{ opacity: 0 }}
									xmlns="http://www.w3.org/2000/svg"
									className="size-7 md:size-8 text-slate-700 hover:text-slate-900"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="4" x2="20" y1="12" y2="12" />
									<line x1="4" x2="20" y1="6" y2="6" />
									<line x1="4" x2="20" y1="18" y2="18" />
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</motion.svg>
							)}
						</div>
					</button>
				</div>

				<AnimatePresence wait>
					{open && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="mt-4"
						>
							<ul className="text-slate-700 leading-8">
								{units.map((unit) => (
									<li key={unit.id}>
										<NavLink
											className={({ isActive }) =>
												isActive ? "active-nav" : ""
											}
											to={`/unit/${unit.id}`}
										>
											{unit.title}
										</NavLink>
									</li>
								))}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</header>
			<div className="mt-6 px-4 md:px-10 lg:px-16 flex gap-x-8">
				<div className="w-96 rounded-lg bg-white border-slate-300 border p-4 hidden lg:block">
					<ul className="text-slate-700 leading-7">
						{units.map((unit) => (
							<NavLink
								className={({ isActive }) =>
									isActive ? "active-nav font-bold" : ""
								}
								to={`/unit/${unit.id}`}
								key={unit.id}
							>
								<li className="block hover:bg-slate-100 duration-150 px-4 py-2 rounded-md">
									{unit.title}
								</li>
							</NavLink>
						))}
					</ul>
				</div>
				<div className="rounded-lg bg-white border-slate-300 border w-full">
					{children}
				</div>
			</div>
		</main>
	);
}
