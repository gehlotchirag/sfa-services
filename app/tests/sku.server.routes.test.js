'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Sku = mongoose.model('Sku'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, sku;

/**
 * Sku routes tests
 */
describe('Sku CRUD tests', function() {
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

		// Save a user to the test db and create new Sku
		user.save(function() {
			sku = {
				name: 'Sku Name'
			};

			done();
		});
	});

	it('should be able to save Sku instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sku
				agent.post('/skus')
					.send(sku)
					.expect(200)
					.end(function(skuSaveErr, skuSaveRes) {
						// Handle Sku save error
						if (skuSaveErr) done(skuSaveErr);

						// Get a list of Skus
						agent.get('/skus')
							.end(function(skusGetErr, skusGetRes) {
								// Handle Sku save error
								if (skusGetErr) done(skusGetErr);

								// Get Skus list
								var skus = skusGetRes.body;

								// Set assertions
								(skus[0].user._id).should.equal(userId);
								(skus[0].name).should.match('Sku Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Sku instance if not logged in', function(done) {
		agent.post('/skus')
			.send(sku)
			.expect(401)
			.end(function(skuSaveErr, skuSaveRes) {
				// Call the assertion callback
				done(skuSaveErr);
			});
	});

	it('should not be able to save Sku instance if no name is provided', function(done) {
		// Invalidate name field
		sku.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sku
				agent.post('/skus')
					.send(sku)
					.expect(400)
					.end(function(skuSaveErr, skuSaveRes) {
						// Set message assertion
						(skuSaveRes.body.message).should.match('Please fill Sku name');
						
						// Handle Sku save error
						done(skuSaveErr);
					});
			});
	});

	it('should be able to update Sku instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sku
				agent.post('/skus')
					.send(sku)
					.expect(200)
					.end(function(skuSaveErr, skuSaveRes) {
						// Handle Sku save error
						if (skuSaveErr) done(skuSaveErr);

						// Update Sku name
						sku.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Sku
						agent.put('/skus/' + skuSaveRes.body._id)
							.send(sku)
							.expect(200)
							.end(function(skuUpdateErr, skuUpdateRes) {
								// Handle Sku update error
								if (skuUpdateErr) done(skuUpdateErr);

								// Set assertions
								(skuUpdateRes.body._id).should.equal(skuSaveRes.body._id);
								(skuUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Skus if not signed in', function(done) {
		// Create new Sku model instance
		var skuObj = new Sku(sku);

		// Save the Sku
		skuObj.save(function() {
			// Request Skus
			request(app).get('/skus')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Sku if not signed in', function(done) {
		// Create new Sku model instance
		var skuObj = new Sku(sku);

		// Save the Sku
		skuObj.save(function() {
			request(app).get('/skus/' + skuObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', sku.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Sku instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sku
				agent.post('/skus')
					.send(sku)
					.expect(200)
					.end(function(skuSaveErr, skuSaveRes) {
						// Handle Sku save error
						if (skuSaveErr) done(skuSaveErr);

						// Delete existing Sku
						agent.delete('/skus/' + skuSaveRes.body._id)
							.send(sku)
							.expect(200)
							.end(function(skuDeleteErr, skuDeleteRes) {
								// Handle Sku error error
								if (skuDeleteErr) done(skuDeleteErr);

								// Set assertions
								(skuDeleteRes.body._id).should.equal(skuSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Sku instance if not signed in', function(done) {
		// Set Sku user 
		sku.user = user;

		// Create new Sku model instance
		var skuObj = new Sku(sku);

		// Save the Sku
		skuObj.save(function() {
			// Try deleting Sku
			request(app).delete('/skus/' + skuObj._id)
			.expect(401)
			.end(function(skuDeleteErr, skuDeleteRes) {
				// Set message assertion
				(skuDeleteRes.body.message).should.match('User is not logged in');

				// Handle Sku error error
				done(skuDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Sku.remove().exec();
		done();
	});
});