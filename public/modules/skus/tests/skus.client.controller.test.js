'use strict';

(function() {
	// Skus Controller Spec
	describe('Skus Controller Tests', function() {
		// Initialize global variables
		var SkusController,
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

			// Initialize the Skus controller.
			SkusController = $controller('SkusController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Sku object fetched from XHR', inject(function(Skus) {
			// Create sample Sku using the Skus service
			var sampleSku = new Skus({
				name: 'New Sku'
			});

			// Create a sample Skus array that includes the new Sku
			var sampleSkus = [sampleSku];

			// Set GET response
			$httpBackend.expectGET('skus').respond(sampleSkus);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.skus).toEqualData(sampleSkus);
		}));

		it('$scope.findOne() should create an array with one Sku object fetched from XHR using a skuId URL parameter', inject(function(Skus) {
			// Define a sample Sku object
			var sampleSku = new Skus({
				name: 'New Sku'
			});

			// Set the URL parameter
			$stateParams.skuId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/skus\/([0-9a-fA-F]{24})$/).respond(sampleSku);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.sku).toEqualData(sampleSku);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Skus) {
			// Create a sample Sku object
			var sampleSkuPostData = new Skus({
				name: 'New Sku'
			});

			// Create a sample Sku response
			var sampleSkuResponse = new Skus({
				_id: '525cf20451979dea2c000001',
				name: 'New Sku'
			});

			// Fixture mock form input values
			scope.name = 'New Sku';

			// Set POST response
			$httpBackend.expectPOST('skus', sampleSkuPostData).respond(sampleSkuResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Sku was created
			expect($location.path()).toBe('/skus/' + sampleSkuResponse._id);
		}));

		it('$scope.update() should update a valid Sku', inject(function(Skus) {
			// Define a sample Sku put data
			var sampleSkuPutData = new Skus({
				_id: '525cf20451979dea2c000001',
				name: 'New Sku'
			});

			// Mock Sku in scope
			scope.sku = sampleSkuPutData;

			// Set PUT response
			$httpBackend.expectPUT(/skus\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/skus/' + sampleSkuPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid skuId and remove the Sku from the scope', inject(function(Skus) {
			// Create new Sku object
			var sampleSku = new Skus({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Skus array and include the Sku
			scope.skus = [sampleSku];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/skus\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSku);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.skus.length).toBe(0);
		}));
	});
}());