'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Salesman = mongoose.model('Salesman'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, salesman;

/**
 * Salesman routes tests
 */
describe('Salesman CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Salesman
		user.save(function() {
			salesman = {
				name: 'Salesman Name'
			};

			done();
		});
	});

	it('should be able to save Salesman instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Salesman
				agent.post('/salesmen')
					.send(salesman)
					.expect(200)
					.end(function(salesmanSaveErr, salesmanSaveRes) {
						// Handle Salesman save error
						if (salesmanSaveErr) done(salesmanSaveErr);

						// Get a list of Salesmen
						agent.get('/salesmen')
							.end(function(salesmenGetErr, salesmenGetRes) {
								// Handle Salesman save error
								if (salesmenGetErr) done(salesmenGetErr);

								// Get Salesmen list
								var salesmen = salesmenGetRes.body;

								// Set assertions
								(salesmen[0].user._id).should.equal(userId);
								(salesmen[0].name).should.match('Salesman Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Salesman instance if not logged in', function(done) {
		agent.post('/salesmen')
			.send(salesman)
			.expect(401)
			.end(function(salesmanSaveErr, salesmanSaveRes) {
				// Call the assertion callback
				done(salesmanSaveErr);
			});
	});

	it('should not be able to save Salesman instance if no name is provided', function(done) {
		// Invalidate name field
		salesman.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Salesman
				agent.post('/salesmen')
					.send(salesman)
					.expect(400)
					.end(function(salesmanSaveErr, salesmanSaveRes) {
						// Set message assertion
						(salesmanSaveRes.body.message).should.match('Please fill Salesman name');
						
						// Handle Salesman save error
						done(salesmanSaveErr);
					});
			});
	});

	it('should be able to update Salesman instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Salesman
				agent.post('/salesmen')
					.send(salesman)
					.expect(200)
					.end(function(salesmanSaveErr, salesmanSaveRes) {
						// Handle Salesman save error
						if (salesmanSaveErr) done(salesmanSaveErr);

						// Update Salesman name
						salesman.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Salesman
						agent.put('/salesmen/' + salesmanSaveRes.body._id)
							.send(salesman)
							.expect(200)
							.end(function(salesmanUpdateErr, salesmanUpdateRes) {
								// Handle Salesman update error
								if (salesmanUpdateErr) done(salesmanUpdateErr);

								// Set assertions
								(salesmanUpdateRes.body._id).should.equal(salesmanSaveRes.body._id);
								(salesmanUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Salesmen if not signed in', function(done) {
		// Create new Salesman model instance
		var salesmanObj = new Salesman(salesman);

		// Save the Salesman
		salesmanObj.save(function() {
			// Request Salesmen
			request(app).get('/salesmen')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Salesman if not signed in', function(done) {
		// Create new Salesman model instance
		var salesmanObj = new Salesman(salesman);

		// Save the Salesman
		salesmanObj.save(function() {
			request(app).get('/salesmen/' + salesmanObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', salesman.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Salesman instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Salesman
				agent.post('/salesmen')
					.send(salesman)
					.expect(200)
					.end(function(salesmanSaveErr, salesmanSaveRes) {
						// Handle Salesman save error
						if (salesmanSaveErr) done(salesmanSaveErr);

						// Delete existing Salesman
						agent.delete('/salesmen/' + salesmanSaveRes.body._id)
							.send(salesman)
							.expect(200)
							.end(function(salesmanDeleteErr, salesmanDeleteRes) {
								// Handle Salesman error error
								if (salesmanDeleteErr) done(salesmanDeleteErr);

								// Set assertions
								(salesmanDeleteRes.body._id).should.equal(salesmanSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Salesman instance if not signed in', function(done) {
		// Set Salesman user 
		salesman.user = user;

		// Create new Salesman model instance
		var salesmanObj = new Salesman(salesman);

		// Save the Salesman
		salesmanObj.save(function() {
			// Try deleting Salesman
			request(app).delete('/salesmen/' + salesmanObj._id)
			.expect(401)
			.end(function(salesmanDeleteErr, salesmanDeleteRes) {
				// Set message assertion
				(salesmanDeleteRes.body.message).should.match('User is not logged in');

				// Handle Salesman error error
				done(salesmanDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Salesman.remove().exec();
		done();
	});
});