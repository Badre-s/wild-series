import type { RequestHandler } from "express";
import programRepository from "./programRepository";
import { programSchema } from "./programSchema";

// Browse: Récupérer et afficher la liste des programs
const browse: RequestHandler = async (req, res, next) => {
	try {
		const programs = await programRepository.readAll();
		res.json(programs);
	} catch (err) {
		next(err);
	}
};

// Read: Lire et afficher les détails d'un program spécifique
const read: RequestHandler = async (req, res, next) => {
	try {
		const programId = Number(req.params.id);
		const program = await programRepository.read(programId);
		if (program == null) {
			res.sendStatus(404);
		} else {
			res.json(program);
		}
	} catch (err) {
		next(err);
	}
};

const add: RequestHandler = async (req, res, next) => {
	try {
		const { error, value } = programSchema.validate(req.body);
		if (error) {
			res.status(400).json({ error: error.details[0].message });
			return;
		}
		const newProgram = value;
		const insertId = await programRepository.create(newProgram);
		res.status(201).json({ insertId });
	} catch (err) {
		next(err);
	}
};

// Edit: Modifier un program existant
const edit: RequestHandler = async (req, res, next) => {
	try {
		const { error, value } = programSchema.validate(req.body);
		if (error) {
			res.status(400).json({ error: error.details[0].message });
			return;
		}
		const updatedProgram = value;
		const programId = Number(req.params.id);
		const affectedRows = await programRepository.update(
			programId,
			updatedProgram,
		);
		if (affectedRows === 0) {
			res.sendStatus(404);
		} else {
			res.sendStatus(204);
		}
	} catch (err) {
		next(err);
	}
};

// Destroy: Supprimer un program existant
const destroy: RequestHandler = async (req, res, next) => {
	try {
		const programId = Number(req.params.id);
		const affectedRows = await programRepository.delete(programId);
		if (affectedRows === 0) {
			res.sendStatus(404);
		} else {
			res.sendStatus(204);
		}
	} catch (err) {
		next(err);
	}
};

export default { browse, read, add, edit, destroy };
