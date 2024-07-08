import React, { useEffect, useId, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function Unit() {
	const params = useParams();
	const [content, setContent] = useState({ text: "", words: [] });
	const [searchParams, setSearchParams] = useSearchParams({ tab: "reading" });
	const [shouldRedirect, setShouldRedirect] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			let data = { text: "", words: [] };

			try {
				if (params.unit > 5) {
					let localUnits = JSON.parse(localStorage.getItem("localUnits"));

					data = localUnits.find((unit) => unit.id == params.unit);

					if (!data) {
						setShouldRedirect(true);
						return;
					}
				} else {
					data = await import(`../Contents/unit${params.unit}.json`);
				}

				setContent(data);
			} catch (error) {
				console.error("Error loading JSON data:", error);
			}
		}

		fetchData();

		setSearchParams({ tab: "reading" });
	}, [params.unit]);

	useEffect(() => {
		if (shouldRedirect) {
			navigate("/");
		}
	}, [shouldRedirect]);

	function deleteLocalUnit() {
		if (confirm("Are you sure to delete this unit?")) {
			let localUnits = JSON.parse(localStorage.getItem("localUnits"));

			let newLocalUnits = localUnits.filter((unit) => unit.id != params.unit);
			localStorage.setItem("localUnits", JSON.stringify(newLocalUnits));

			alert("Unit deleted successfully");
			window.location.reload();
		}
	}

	return (
		<Layout>
			<div className="px-6 border-b border-slate-300 flex gap-x-4 text-slate-800">
				<div
					onClick={() => setSearchParams({ tab: "reading" })}
					className={`hover:cursor-pointer py-3 ${
						searchParams.get("tab") === "reading"
							? "font-bold text-teal-600 border-b-2 border-teal-600"
							: ""
					}`}
				>
					Reading
				</div>
				<div
					onClick={() => setSearchParams({ tab: "vocabulary" })}
					className={`hover:cursor-pointer py-3 ${
						searchParams.get("tab") === "vocabulary"
							? "font-bold text-teal-600 border-b-2 border-teal-600"
							: ""
					}`}
				>
					Vocabulary
				</div>
			</div>
			<div className="p-6 text-slate-700 leading-7 whitespace-pre-wrap">
				{searchParams.get("tab") === "reading" ? (
					content.text
				) : (
					<Words data={content.words} />
				)}

				{params.unit > 5 && (
					<div className="mt-6">
						<button
							type="button"
							onClick={deleteLocalUnit}
							className="bg-red-600 text-white tracking-wider hover:bg-red-700 rounded-lg px-4 py-2 shadow-sm flex gap-x-2 items-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-5 text-white"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
								/>
							</svg>
							Delete
						</button>
					</div>
				)}
			</div>
		</Layout>
	);
}

export function Words({ data }) {
	return (
		<ul className="list-disc p-4 pt-0">
			{data.map((word) => {
				let key = useId();

				return (
					<li key={key}>
						{word.word} {word.meaning}
					</li>
				);
			})}
		</ul>
	);
}
