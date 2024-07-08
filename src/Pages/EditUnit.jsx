import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Label from "../components/Label";
import TextInput from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate, useParams } from "react-router-dom";

export default function AddUnit() {
	const [title, setTitle] = useState("");
	const [reading, setReading] = useState("");
	const [words, setWords] = useState([{ id: 1, word: "", meaning: "" }]);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		let units = JSON.parse(localStorage.getItem("localUnits"));

		let unit = units.find((item) => item.id == params.unit);

		if (unit) {
			setTitle(unit.title);
			setReading(unit.text);
			setWords(unit.words);
		} else {
			alert("404 error: unit not found");
		}
	}, []);

	function deleteWord(id) {
		let newWords = words.filter((word) => word.id != id);
		setWords(newWords);
	}

	function addWord() {
		let id = Math.floor(Math.random() * 10000);

		setWords((current) => [...current, { id: id, title: "", meaning: "" }]);
	}

	function changeHandler(e, id, type) {
		let newWords = words.map((word) => {
			if (word.id == id) {
				if (type == "word") {
					word.word = e.target.value;
					return word;
				} else {
					word.meaning = e.target.value;
					return word;
				}
			} else {
				return word;
			}
		});

		setWords(newWords);
	}

	function submit(e) {
		e.preventDefault();

		let id = Math.floor(Math.random() * 1000000);

		let unit = {
			id: id,
			title: title,
			text: reading,
			words: words,
		};

		try {
			let localUnits = localStorage.getItem("localUnits");

			localUnits = JSON.parse(localUnits);

			let newLocalUnits = localUnits.map((unit) => {
				if (unit.id != params.unit) return unit;

				unit.title = title;
				unit.text = reading;
				unit.words = words;

				return unit;
			});

			localStorage.setItem("localUnits", JSON.stringify(newLocalUnits));

			alert("Unit edited successfully");
			navigate(`/unit/${params.unit}`);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<Layout>
			<div className="p-6">
				<form onSubmit={submit} className="flex flex-col gap-4">
					<div>
						<Label>Unit Title</Label>
						<TextInput
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="mt-1 w-full block"
							required
						/>
					</div>

					<div>
						<Label>Reading</Label>
						<textarea
							required
							className="w-full text-slate-700 border border-slate-300 px-4 py-2 rounded-lg mt-1 shadow-sm"
							rows="10"
							onChange={(e) => setReading(e.target.value)}
							value={reading}
						/>
					</div>

					<div className="mt-2">
						<h3 className="text-slate-700">Vocabulary</h3>
						<div className="mt-2 space-y-6">
							{words.map((word) => (
								<div key={word.id} className="space-y-2">
									<TextInput
										onChange={(e) => changeHandler(e, word.id, "word")}
										value={word.word || ""}
										className="w-full"
										placeholder="word"
									/>
									<div className="flex gap-x-2">
										<TextInput
											onChange={(e) => changeHandler(e, word.id, "meaning")}
											dir="rtl"
											value={word.meaning || ""}
											className="w-full"
											placeholder="ترجمه"
										/>
										<button
											type="button"
											onClick={() => deleteWord(word.id)}
											className="w-12 flex items-center justify-center border border-slate-300 hover:bg-slate-100 rounded-lg"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="size-6 text-slate-600"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
												/>
											</svg>
										</button>
									</div>
								</div>
							))}
						</div>

						<div className="mt-2">
							<button
								type="button"
								onClick={addWord}
								className="underline text-teal-600"
							>
								Add Word
							</button>
						</div>
					</div>

					<div className="mt-2">
						<PrimaryButton type="submit" className="px-6 tracking-wider">
							Save
						</PrimaryButton>
					</div>
				</form>
			</div>
		</Layout>
	);
}
