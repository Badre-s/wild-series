import { useState, useEffect } from "react";

interface Program {
	id: number;
	title: string;
}

const Programs = () => {
	const [programs, setPrograms] = useState<Program[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPrograms = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/programs`,
				);
				if (!response.ok) {
					throw new Error("no ok");
				}
				const result = await response.json();
				setPrograms(result);
			} catch (error) {
				setError((error as Error).message);
			} finally {
				setLoading(false);
			}
		};

		fetchPrograms();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<ul>
				{programs.map((program) => (
					<li key={program.id}>
						<h2>{program.title}</h2>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Programs;
