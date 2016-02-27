'use strict';

(function() {
	// Salesmen Controller Spec
	describe('Salesmen Controller Tests', function() {
		// Initialize global variables
		var SalesmenController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Salesmen controller.
			SalesmenController = $controller('SalesmenController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Salesman object fetched from XHR', inject(function(Salesmen) {
			// Create sample Salesman using the Salesmen service
			var sampleSalesman = new Salesmen({
				name: 'New Salesman'
			});

			// Create a sample Salesmen array that includes the new Salesman
			var sampleSalesmen = [sampleSalesman];

			// Set GET response
			$httpBackend.expectGET('salesmen').respond(sampleSalesmen);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.salesmen).toEqualData(sampleSalesmen);
		}));

		it('$scope.findOne() should create an array with one Salesman object fetched from XHR using a salesmanId URL parameter', inject(function(Salesmen) {
			// Define a sample Salesman object
			var sampleSalesman = new Salesmen({
				name: 'New Salesman'
			});

			// Set the URL parameter
			$stateParams.salesmanId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/salesmen\/([0-9a-fA-F]{24})$/).respond(sampleSalesman);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.salesman).toEqualData(sampleSalesman);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Salesmen) {
			// Create a sample Salesman object
			var sampleSalesmanPostData = new Salesmen({
				name: 'New Salesman'
			});

			// Create a sample Salesman response
			var sampleSalesmanResponse = new Salesmen({
				_id: '525cf20451979dea2c000001',
				name: 'New Salesman'
			});

			// Fixture mock form input values
			scope.name = 'New Salesman';

			// Set POST response
			$httpBackend.expectPOST('salesmen', sampleSalesmanPostData).respond(sampleSalesmanResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Salesman was created
			expect($location.path()).toBe('/salesmen/' + sampleSalesmanResponse._id);
		}));

		it('$scope.update() should update a valid Salesman', inject(function(Salesmen) {
			// Define a sample Salesman put data
			var sampleSalesmanPutData = new Salesmen({
				_id: '525cf20451979dea2c000001',
				name: 'New Salesman'
			});

			// Mock Salesman in scope
			scope.salesman = sampleSalesmanPutData;

			// Set PUT response
			$httpBackend.expectPUT(/salesmen\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/salesmen/' + sampleSalesmanPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid salesmanId and remove the Salesman from the scope', inject(function(Salesmen) {
			// Create new Salesman object
			var sampleSalesman = new Salesmen({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Salesmen array and include the Salesman
			scope.salesmen = [sampleSalesman];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/salesmen\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSalesman);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.salesmen.length).toBe(0);
		}));
	});
}());