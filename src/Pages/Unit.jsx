import React, { useEffect, useId, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function Unit() {
	const params = useParams();
	const [content, setContent] = useState({ text: "", words: [] });
	const [searchParams, setSearchParams] = useSearchParams({ tab: "reading" });

	useEffect(() => {
		async function fetchData() {
			let data;

			try {
				data = await import(`../Contents/unit${params.unit}.json`);
				setContent(data);
			} catch (error) {
				console.error("Error loading JSON data:", error);
			}
		}

		fetchData();

		setSearchParams({ tab: "reading" });
	}, [params.unit]);

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
