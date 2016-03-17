const express = require('express');

module.exports = function(model) {
	let router = express.Router();

	router.get('/', (req, res) => {
		model.findAll()
			.then((data)=>{
				res.json(data);
			})
			.catch((error)=>{
				console.log(error);
				res.json(error);
			});
	});

	router.get('/:id', (req, res) => {
		model.findOne({where: {id: req.params.id}})
			.then((data)=>{
				res.json(data);
			})
			.catch((error)=>{
				res.status(500);
				res.json(error);
			});
	});

	router.post('/', (req, res) => {
		model.create(req.body)
			.then((data)=>{
				res.json(data);
			})
			.catch((error)=>{
				res.status(500);
				res.json(error);
			});
	});

	router.post('/:id', (req, res) => {
		model.update(req.body, {where: {id: req.params.id}})
			.then((updated)=>{
				res.json(updated);
			})
			.catch((error)=>{
				res.status(500);
				res.json(error);
			});
	});

	router.delete('/:id', (req, res) => {
		model.findOne({where: {id: req.params.id}})
			.then((data)=>{
				data.destroy()
					.then(()=>{
						res.json({});
					})
					.catch((error)=>{
						res.status(500);
						res.json(error);
					});
			})
			.catch((error)=>{
				res.status(500);
				res.json(error);
			});
	});

	return router;
}
