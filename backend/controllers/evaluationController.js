const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const Evaluation = require('../models/evaluation');
const User = require('../models/user');
const { find } = require('../models/evaluation');

exports.checkEvaluation = async (req, res, next) => {
	const active_evaluation = await Evaluation.findOne({ status: 'Active' });
	if (!active_evaluation) {
		return res.status(401).json({ success: false, message: 'No active evaluation for this term' })
	}

	res.status(200).json({
		success: true,
	})
}

exports.getEvaluation = async (req, res, next) => {
	const evaluation = await Evaluation.find();
	const active_evaluation = await Evaluation.find({ status: 'active' });
	let active = false

	if (!active_evaluation) {
		active = false
	} else {
		active = true
	}
	res.status(200).json({
		success: true,
		evaluation,
		active
	})
}

exports.createEvaluation = async (req, res, next) => {
	const check_evaluation = await Evaluation.findOne({ status: 'Active' });
	if (check_evaluation) {
		return res.status(401).json({ success: false, message: 'Evaluation is still on-going' })
		// return next(new ErrorHandler('Evaluation is still on-going', 404));
	}

	const evaluation = await Evaluation.create({
		school_year: req.body.school_year,
		status: 'Active',
		tr: 'Student',
		ia: true
	})

	res.status(200).json({
		success: true,
		evaluation
	});
};

exports.editEvaluation = async (req, res, next) => {
	const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, {
		school_year: req.body.school_year,
		status: 'Active',
		tr: 'Student',
		ia: true
	})

	res.status(200).json({
		success: true,
		evaluation
	});
};

exports.postEvaluation = async (req, res, next) => {
	console.log(req.body)

	const student = await User.findOne({ id_number: req.body.tuptId })
	if (!student) {
		return res.status(401).json({ success: false, message: 'No User Find by this ID' })
	} else {
		await User.findByIdAndUpdate(student._id, {
			status: 'active',
			course: req.body.course,
			section: req.body.section,
		})
	}
	const evaluation_active = await Evaluation.findOne({ status: 'Active' });
	let evaluation_data = {}

	if (req.body.yl == '1st Year') {
		Object.assign(evaluation_data, { 'yl.first_year': 1 })
	} else if (req.body.yl == '2nd Year') {
		Object.assign(evaluation_data, { 'yl.second_year': 1 })
	} else if (req.body.yl == '3rd Year') {
		Object.assign(evaluation_data, { 'yl.third_year': 1 })
	} else if (req.body.yl == '4th Year') {
		Object.assign(evaluation_data, { 'yl.fourth_year': 1 })
	} else {
		return res.status(401).json({ success: false, message: 'Wrong input on year level evaluation form' })
	}

	if (req.body.course == 'BSIT') {
		Object.assign(evaluation_data, { 'course.BSIT': 1 })
	}

	if (req.body.gender == 'Male') {
		Object.assign(evaluation_data, { 'gender.male': 1 })
	} else if (req.body.gender == 'Female') {
		Object.assign(evaluation_data, { 'gender.female': 1 })
	} else {
		return res.status(401).json({ success: false, message: 'Wrong input on gender evaluation form' })
	}

	//sra
	if (req.body.sra == '5') {
		Object.assign(evaluation_data, { 'sra.excellent': 1 })
	} else if (req.body.sra == '4') {
		Object.assign(evaluation_data, { 'sra.good': 1 })
	} else if (req.body.sra == '3') {
		Object.assign(evaluation_data, { 'sra.average': 1 })
	} else if (req.body.sra == '2') {
		Object.assign(evaluation_data, { 'sra.poor': 1 })
	} else if (req.body.sra == '1') {
		Object.assign(evaluation_data, { 'sra.very_poor': 1 })
	} else {
		return res.status(401).json({ success: false, message: 'Wrong input on sra evaluation form' })
	}

	//lav
	if (req.body.lav == '5') {
		Object.assign(evaluation_data, { 'lav.excellent': 1 })
	} else if (req.body.lav == '4') {
		Object.assign(evaluation_data, { 'lav.good': 1 })
	} else if (req.body.lav == '3') {
		Object.assign(evaluation_data, { 'lav.average': 1 })
	} else if (req.body.lav == '2') {
		Object.assign(evaluation_data, { 'lav.poor': 1 })
	} else if (req.body.lav == '1') {
		Object.assign(evaluation_data, { 'lav.very_poor': 1 })
	} else {
		return res.status(401).json({ success: false, message: 'Wrong input on lav evaluation form' })
	}

	//clean
	if (req.body.clean == '5') {
		Object.assign(evaluation_data, { 'clean.excellent': 1 })
	} else if (req.body.clean == '4') {
		Object.assign(evaluation_data, { 'clean.good': 1 })
	} else if (req.body.clean == '3') {
		Object.assign(evaluation_data, { 'clean.average': 1 })
	} else if (req.body.clean == '2') {
		Object.assign(evaluation_data, { 'clean.poor': 1 })
	} else if (req.body.clean == '1') {
		Object.assign(evaluation_data, { 'clean.very_poor': 1 })
	} else {
		return res.status(401).json({ success: false, message: 'Wrong input on clean evaluation form' })
	}
	//ho
	if (req.body.ho == '5') {
		Object.assign(evaluation_data, { 'ho.excellent': 1 })
	} else if (req.body.ho == '4') {
		Object.assign(evaluation_data, { 'ho.good': 1 })
	} else if (req.body.ho == '3') {
		Object.assign(evaluation_data, { 'ho.average': 1 })
	} else if (req.body.ho == '2') {
		Object.assign(evaluation_data, { 'ho.poor': 1 })
	} else if (req.body.ho == '1') {
		Object.assign(evaluation_data, { 'ho.very_poor': 1 })
	} else {
		return res.status(401).json({ success: false, message: 'Wrong input on ho evaluation form' })
	}
	//brb
	if (req.body.brb == '5') {
		Object.assign(evaluation_data, { 'brb.excellent': 1 })
	} else if (req.body.brb == '4') {
		Object.assign(evaluation_data, { 'brb.good': 1 })
	} else if (req.body.brb == '3') {
		Object.assign(evaluation_data, { 'brb.average': 1 })
	} else if (req.body.brb == '2') {
		Object.assign(evaluation_data, { 'brb.poor': 1 })
	} else if (req.body.brb == '1') {
		Object.assign(evaluation_data, { 'brb.very_poor': 1 })
	} else {
		return res.status(401).json({ success: false, message: 'Wrong input on brb evaluation form' })
	}
	//opac
	if (req.body.opac == '5') {
		Object.assign(evaluation_data, { 'opac.excellent': 1 })
	} else if (req.body.opac == '4') {
		Object.assign(evaluation_data, { 'opac.good': 1 })
	} else if (req.body.opac == '3') {
		Object.assign(evaluation_data, { 'opac.average': 1 })
	} else if (req.body.opac == '2') {
		Object.assign(evaluation_data, { 'opac.poor': 1 })
	} else if (req.body.opac == '1') {
		Object.assign(evaluation_data, { 'opac.very_poor': 1 })
	} else {
		return res.status(401).json({ success: false, message: 'Wrong input on opac evaluation form' })
	}
	//bc
	if (req.body.bc == '5') {
		Object.assign(evaluation_data, { 'bc.excellent': 1 })
	} else if (req.body.bc == '4') {
		Object.assign(evaluation_data, { 'bc.good': 1 })
	} else if (req.body.bc == '3') {
		Object.assign(evaluation_data, { 'bc.average': 1 })
	} else if (req.body.bc == '2') {
		Object.assign(evaluation_data, { 'bc.poor': 1 })
	} else if (req.body.bc == '1') {
		Object.assign(evaluation_data, { 'bc.very_poor': 1 })
	} else {
		return res.status(401).json({ success: false, message: 'Wrong input on bc evaluation form' })
	}
	//pc
	if (req.body.pc == '5') {
		Object.assign(evaluation_data, { 'pc.excellent': 1 })
	} else if (req.body.pc == '4') {
		Object.assign(evaluation_data, { 'pc.good': 1 })
	} else if (req.body.pc == '3') {
		Object.assign(evaluation_data, { 'pc.average': 1 })
	} else if (req.body.pc == '2') {
		Object.assign(evaluation_data, { 'pc.poor': 1 })
	} else if (req.body.pc == '1') {
		Object.assign(evaluation_data, { 'pc.very_poor': 1 })
	} else {
		return res.status(401).json({ success: false, message: 'Wrong input on pc evaluation form' })
	}
	//tps
	if (req.body.tps == '5') {
		Object.assign(evaluation_data, { 'tps.excellent': 1 })
	} else if (req.body.tps == '4') {
		Object.assign(evaluation_data, { 'tps.good': 1 })
	} else if (req.body.tps == '3') {
		Object.assign(evaluation_data, { 'tps.average': 1 })
	} else if (req.body.tps == '2') {
		Object.assign(evaluation_data, { 'tps.poor': 1 })
	} else if (req.body.tps == '1') {
		Object.assign(evaluation_data, { 'tps.very_poor': 1 })
	} else {
		return res.status(401).json({ success: false, message: 'Wrong input on tps evaluation form' })
	}
	//er
	if (req.body.er == '5') {
		Object.assign(evaluation_data, { 'er.excellent': 1 })
	} else if (req.body.er == '4') {
		Object.assign(evaluation_data, { 'er.good': 1 })
	} else if (req.body.er == '3') {
		Object.assign(evaluation_data, { 'er.average': 1 })
	} else if (req.body.er == '2') {
		Object.assign(evaluation_data, { 'er.poor': 1 })
	} else if (req.body.er == '1') {
		Object.assign(evaluation_data, { 'er.very_poor': 1 })
	} else {
		return res.status(401).json({ success: false, message: 'Wrong input on er evaluation form' })
	}
	//skaq
	if (req.body.skaq == '5') {
		Object.assign(evaluation_data, { 'skaq.excellent': 1 })
	} else if (req.body.skaq == '4') {
		Object.assign(evaluation_data, { 'skaq.good': 1 })
	} else if (req.body.skaq == '3') {
		Object.assign(evaluation_data, { 'skaq.average': 1 })
	} else if (req.body.skaq == '2') {
		Object.assign(evaluation_data, { 'skaq.poor': 1 })
	} else if (req.body.skaq == '1') {
		Object.assign(evaluation_data, { 'skaq.very_poor': 1 })
	} else {
		return res.status(401).json({ success: false, message: 'Wrong input on skaq evaluation form' })
	}
	//css
	if (req.body.css == '5') {
		Object.assign(evaluation_data, { 'css.excellent': 1 })
	} else if (req.body.css == '4') {
		Object.assign(evaluation_data, { 'css.good': 1 })
	} else if (req.body.css == '3') {
		Object.assign(evaluation_data, { 'css.average': 1 })
	} else if (req.body.css == '2') {
		Object.assign(evaluation_data, { 'css.poor': 1 })
	} else if (req.body.lav == '1') {
		Object.assign(evaluation_data, { 'css.very_poor': 1 })
	} else {
		return res.status(401).json({ success: false, message: 'Wrong input on css evaluation form' })
	}

	Object.assign(evaluation_data, { 'respondents': 1 })

	console.log(evaluation_data)

	const evaluation = await Evaluation.findOneAndUpdate({ _id: evaluation_active._id },
		{
			$inc: evaluation_data,
			$push: {
				comments: req.body.comments,
			}
		},
	)

	res.status(200).json({
		success: true,
		evaluation,
	});
};

exports.deleteEvaluation = async (req, res, next) => {

	const evaluation = await Evaluation.findById(req.params.id);
	if (!evaluation) {
		return next(new ErrorHandler('Evaluation not found', 404));
	}
	await evaluation.remove();
	res.status(200).json({
		success: true,
	})
}

exports.deactivateEvaluation = async (req, res, next) => {
	console.log(req.params.id)
	const evaluation = await Evaluation.findById(req.params.id);
	console.log(evaluation)
	if (!evaluation) {
		return next(new ErrorHandler('Evaluation not found', 404));
	}
	await Evaluation.findByIdAndUpdate(req.params.id, { status: "Not Active" });
	res.status(200).json({
		success: true,
	})
}

exports.getAllEvaluation = async (req, res, next) => {
	const evaluation = await Evaluation.findById(req.params.id)

	res.status(200).json({
		success: true,
		evaluation
	})
}