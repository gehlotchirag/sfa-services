'use strict';

// Doctors controller
angular.module('doctors').controller('DoctorsController', ['$scope', '$http' ,'$stateParams', '$location', 'Authentication', 'Doctors','Appointments','Users', 'uiCalendarConfig', '$compile',
	function($scope, $http, $stateParams, $location, Authentication, Doctors, Appointments, Users, uiCalendarConfig ,$compile) {
    $scope.place;
    $scope.newEvents = [];
    $scope.authentication = Authentication;
    $scope.name = $scope.authentication.user.displayName;
    $scope.email = $scope.authentication.user.email;
    $scope.profilePic ="https://cdn0.iconfinder.com/data/icons/customicondesign-office6-shadow/256/doctor.png";

    //TimeZone Calculation
    $scope.timeZoneArray = {
      '(GMT-12:00) International Date Line West' : 'Pacific/Wake',
      '(GMT-11:00) Midway Island' : 'Pacific/Apia',
      '(GMT-11:00) Samoa' : 'Pacific/Apia',
      '(GMT-10:00) Hawaii' : 'Pacific/Honolulu',
      '(GMT-09:00) Alaska' : 'America/Anchorage',
      '(GMT-08:00) Pacific Time (US &amp; Canada); Tijuana' : 'America/Los_Angeles',
      '(GMT-07:00) Arizona' : 'America/Phoenix',
      '(GMT-07:00) Chihuahua' : 'America/Chihuahua',
      '(GMT-07:00) La Paz' : 'America/Chihuahua',
      '(GMT-07:00) Mazatlan' : 'America/Chihuahua',
      '(GMT-07:00) Mountain Time (US &amp; Canada)' : 'America/Denver',
      '(GMT-06:00) Central America' : 'America/Managua',
      '(GMT-06:00) Central Time (US &amp; Canada)' : 'America/Chicago',
      '(GMT-06:00) Guadalajara' : 'America/Mexico_City',
      '(GMT-06:00) Mexico City' : 'America/Mexico_City',
      '(GMT-06:00) Monterrey' : 'America/Mexico_City',
      '(GMT-06:00) Saskatchewan' : 'America/Regina',
      '(GMT-05:00) Bogota' : 'America/Bogota',
      '(GMT-05:00) Eastern Time (US &amp; Canada)' : 'America/New_York',
      '(GMT-05:00) Indiana (East)' : 'America/Indiana/Indianapolis',
      '(GMT-05:00) Lima' : 'America/Bogota',
      '(GMT-05:00) Quito' : 'America/Bogota',
      '(GMT-04:00) Atlantic Time (Canada)' : 'America/Halifax',
      '(GMT-04:00) Caracas' : 'America/Caracas',
      '(GMT-04:00) La Paz' : 'America/Caracas',
      '(GMT-04:00) Santiago' : 'America/Santiago',
      '(GMT-03:30) Newfoundland' : 'America/St_Johns',
      '(GMT-03:00) Brasilia' : 'America/Sao_Paulo',
      '(GMT-03:00) Buenos Aires' : 'America/Argentina/Buenos_Aires',
      '(GMT-03:00) Georgetown' : 'America/Argentina/Buenos_Aires',
      '(GMT-03:00) Greenland' : 'America/Godthab',
      '(GMT-02:00) Mid-Atlantic' : 'America/Noronha',
      '(GMT-01:00) Azores' : 'Atlantic/Azores',
      '(GMT-01:00) Cape Verde Is.' : 'Atlantic/Cape_Verde',
      '(GMT) Casablanca' : 'Africa/Casablanca',
      '(GMT) Edinburgh' : 'Europe/London',
      '(GMT) Greenwich Mean Time : Dublin' : 'Europe/London',
      '(GMT) Lisbon' : 'Europe/London',
      '(GMT) London' : 'Europe/London',
      '(GMT) Monrovia' : 'Africa/Casablanca',
      '(GMT+01:00) Amsterdam' : 'Europe/Berlin',
      '(GMT+01:00) Belgrade' : 'Europe/Belgrade',
      '(GMT+01:00) Berlin' : 'Europe/Berlin',
      '(GMT+01:00) Bern' : 'Europe/Berlin',
      '(GMT+01:00) Bratislava' : 'Europe/Belgrade',
      '(GMT+01:00) Brussels' : 'Europe/Paris',
      '(GMT+01:00) Budapest' : 'Europe/Belgrade',
      '(GMT+01:00) Copenhagen' : 'Europe/Paris',
      '(GMT+01:00) Ljubljana' : 'Europe/Belgrade',
      '(GMT+01:00) Madrid' : 'Europe/Paris',
      '(GMT+01:00) Paris' : 'Europe/Paris',
      '(GMT+01:00) Prague' : 'Europe/Belgrade',
      '(GMT+01:00) Rome' : 'Europe/Berlin',
      '(GMT+01:00) Sarajevo' : 'Europe/Sarajevo',
      '(GMT+01:00) Skopje' : 'Europe/Sarajevo',
      '(GMT+01:00) Stockholm' : 'Europe/Berlin',
      '(GMT+01:00) Vienna' : 'Europe/Berlin',
      '(GMT+01:00) Warsaw' : 'Europe/Sarajevo',
      '(GMT+01:00) West Central Africa' : 'Africa/Lagos',
      '(GMT+01:00) Zagreb' : 'Europe/Sarajevo',
      '(GMT+02:00) Athens' : 'Europe/Istanbul',
      '(GMT+02:00) Bucharest' : 'Europe/Bucharest',
      '(GMT+02:00) Cairo' : 'Africa/Cairo',
      '(GMT+02:00) Harare' : 'Africa/Johannesburg',
      '(GMT+02:00) Helsinki' : 'Europe/Helsinki',
      '(GMT+02:00) Istanbul' : 'Europe/Istanbul',
      '(GMT+02:00) Jerusalem' : 'Asia/Jerusalem',
      '(GMT+02:00) Kyiv' : 'Europe/Helsinki',
      '(GMT+02:00) Minsk' : 'Europe/Istanbul',
      '(GMT+02:00) Pretoria' : 'Africa/Johannesburg',
      '(GMT+02:00) Riga' : 'Europe/Helsinki',
      '(GMT+02:00) Sofia' : 'Europe/Helsinki',
      '(GMT+02:00) Tallinn' : 'Europe/Helsinki',
      '(GMT+02:00) Vilnius' : 'Europe/Helsinki',
      '(GMT+03:00) Baghdad' : 'Asia/Baghdad',
      '(GMT+03:00) Kuwait' : 'Asia/Riyadh',
      '(GMT+03:00) Moscow' : 'Europe/Moscow',
      '(GMT+03:00) Nairobi' : 'Africa/Nairobi',
      '(GMT+03:00) Riyadh' : 'Asia/Riyadh',
      '(GMT+03:00) St. Petersburg' : 'Europe/Moscow',
      '(GMT+03:00) Volgograd' : 'Europe/Moscow',
      '(GMT+03:30) Tehran' : 'Asia/Tehran',
      '(GMT+04:00) Abu Dhabi' : 'Asia/Muscat',
      '(GMT+04:00) Baku' : 'Asia/Tbilisi',
      '(GMT+04:00) Muscat' : 'Asia/Muscat',
      '(GMT+04:00) Tbilisi' : 'Asia/Tbilisi',
      '(GMT+04:00) Yerevan' : 'Asia/Tbilisi',
      '(GMT+04:30) Kabul' : 'Asia/Kabul',
      '(GMT+05:00) Ekaterinburg' : 'Asia/Yekaterinburg',
      '(GMT+05:00) Islamabad' : 'Asia/Karachi',
      '(GMT+05:00) Karachi' : 'Asia/Karachi',
      '(GMT+05:00) Tashkent' : 'Asia/Karachi',
      '(GMT+05:30) Chennai' : 'Asia/Calcutta',
      '(GMT+05:30) Kolkata' : 'Asia/Calcutta',
      '(GMT+05:30) Mumbai' : 'Asia/Calcutta',
      '(GMT+05:30) New Delhi' : 'Asia/Calcutta',
      '(GMT+05:45) Kathmandu' : 'Asia/Katmandu',
      '(GMT+06:00) Almaty' : 'Asia/Novosibirsk',
      '(GMT+06:00) Astana' : 'Asia/Dhaka',
      '(GMT+06:00) Dhaka' : 'Asia/Dhaka',
      '(GMT+06:00) Novosibirsk' : 'Asia/Novosibirsk',
      '(GMT+06:00) Sri Jayawardenepura' : 'Asia/Colombo',
      '(GMT+06:30) Rangoon' : 'Asia/Rangoon',
      '(GMT+07:00) Bangkok' : 'Asia/Bangkok',
      '(GMT+07:00) Hanoi' : 'Asia/Bangkok',
      '(GMT+07:00) Jakarta' : 'Asia/Bangkok',
      '(GMT+07:00) Krasnoyarsk' : 'Asia/Krasnoyarsk',
      '(GMT+08:00) Beijing' : 'Asia/Hong_Kong',
      '(GMT+08:00) Chongqing' : 'Asia/Hong_Kong',
      '(GMT+08:00) Hong Kong' : 'Asia/Hong_Kong',
      '(GMT+08:00) Irkutsk' : 'Asia/Irkutsk',
      '(GMT+08:00) Kuala Lumpur' : 'Asia/Singapore',
      '(GMT+08:00) Perth' : 'Australia/Perth',
      '(GMT+08:00) Singapore' : 'Asia/Singapore',
      '(GMT+08:00) Taipei' : 'Asia/Taipei',
      '(GMT+08:00) Ulaan Bataar' : 'Asia/Irkutsk',
      '(GMT+08:00) Urumqi' : 'Asia/Hong_Kong',
      '(GMT+09:00) Osaka' : 'Asia/Tokyo',
      '(GMT+09:00) Sapporo' : 'Asia/Tokyo',
      '(GMT+09:00) Seoul' : 'Asia/Seoul',
      '(GMT+09:00) Tokyo' : 'Asia/Tokyo',
      '(GMT+09:00) Yakutsk' : 'Asia/Yakutsk',
      '(GMT+09:30) Adelaide' : 'Australia/Adelaide',
      '(GMT+09:30) Darwin' : 'Australia/Darwin',
      '(GMT+10:00) Brisbane' : 'Australia/Brisbane',
      '(GMT+10:00) Canberra' : 'Australia/Sydney',
      '(GMT+10:00) Guam' : 'Pacific/Guam',
      '(GMT+10:00) Hobart' : 'Australia/Hobart',
      '(GMT+10:00) Melbourne' : 'Australia/Sydney',
      '(GMT+10:00) Port Moresby' : 'Pacific/Guam',
      '(GMT+10:00) Sydney' : 'Australia/Sydney',
      '(GMT+10:00) Vladivostok' : 'Asia/Vladivostok',
      '(GMT+11:00) Magadan' : 'Asia/Magadan',
      '(GMT+11:00) New Caledonia' : 'Asia/Magadan',
      '(GMT+11:00) Solomon Is.' : 'Asia/Magadan',
      '(GMT+12:00) Auckland' : 'Pacific/Auckland',
      '(GMT+12:00) Fiji' : 'Pacific/Fiji',
      '(GMT+12:00) Kamchatka' : 'Pacific/Fiji',
      '(GMT+12:00) Marshall Is.' : 'Pacific/Fiji',
      '(GMT+12:00) Wellington' : 'Pacific/Auckland',
      '(GMT+13:00) Nuku\'alofa' : 'Pacific/Tongatapu'
    };

    $scope.getDefaultTimeZone = function () {
      var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
      var hours = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
      console.log(hours,offset)
      angular.forEach($scope.timeZoneArray, function (value, key) {
        if(key.indexOf(hours) > 0) {
          $scope.defaultTimeZone = value;
          return;
        }
      });
    }
    $scope.getDefaultTimeZone();
    $scope.timeZone = $scope.defaultTimeZone;

    //Upload ProfilePic
    /*
    $scope.$watch('files', function () {
      $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
      console.log($scope.authentication.user._id)
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          Upload.upload({
            url: 'api/upload',
            data:  $scope.authentication.user._id,
            fields: {'user': $scope.authentication.user._id},
            file: file
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.profilePic='http://cookingonions.com/wp-content/plugins/recipe-card/images/loading.gif'
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {
            $scope.profilePic='/uploads/'+data;
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
          });
        }
      }
    };
*/
    // Create new Doctor
    $scope.userProfileFlagUpdate = function(urs) {
      $scope.success = $scope.error = null;
    var user = new Users(urs);
    user.$update(function(response) {
      $scope.success = true;
      Authentication.user = response;
    }, function(response) {
      $scope.error = response.data.message;
    });
  };

		// Create new Doctor
		$scope.create = function() {
			// Create new Doctor object
      if (this.homeVisit) {
        this.location = [];
        this.location.push($scope.place.geometry.location.lng());
        this.location.push($scope.place.geometry.location.lat());
        var doctor = new Doctors({
          name: this.name,
          email: this.email,
          profilePic: this.profilePic,
          qualification: this.qualification,
          speciality: this.speciality,
          description: this.description,
          homeVisit: this.homeVisit,
          location: this.location,
          timeZone: this.timeZone
        });
        console.log(doctor);
      }
      else{
        var doctor = new Doctors({
          name: this.name,
          email: this.email,
          profilePic: this.profilePic,
          qualification: this.qualification,
          speciality: this.speciality,
          description: this.description,
          homeVisit: this.homeVisit,
          timeZone: this.timeZone
        });
        console.log(doctor);
      }

			// Redirect after save
			doctor.$save(function(response) {
        // Upade user compleProfile Flag
        var temp_user = $scope.authentication.user;
        console.log(temp_user);
        temp_user.completeProfile = true;
        console.log(temp_user);
        $scope.userProfileFlagUpdate(temp_user);

        $location.path('doctors');
        // Clear form fields
        $scope.name = '';
        $scope.email = '';
        $scope.profilePic = '';
        $scope.qualification = '';
        $scope.speciality = '';
        $scope.description = '';
        $scope.timeZone = '';
        $scope.location = [];
        $scope.homeVisit = false;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Doctor
		$scope.remove = function(doctor) {
			if ( doctor ) { 
				doctor.$remove();

				for (var i in $scope.doctors) {
					if ($scope.doctors [i] === doctor) {
						$scope.doctors.splice(i, 1);
					}
				}
			} else {
				$scope.doctor.$remove(function() {
					$location.path('doctors');
				});
			}
		};

		// Update existing Doctor
		$scope.update = function() {
			var doctor = $scope.doctor;

			doctor.$update(function() {
				$location.path('doctors/' + doctor._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Doctors
		$scope.find = function() {
			$scope.doctors = Doctors.query();
		};

		// Find existing Doctor

		/*$scope.findOne = function() {
			$scope.doctor = Doctors.get({ 
				doctorId: $stateParams.doctorId
			});
		};
    */

    //create appointment
    $scope.createAppointment = function() {
      // Create new Appointment object
      var today = new Date();
      var appointment = new Appointments ({
        title: this.title,
        start:today,
        end: today
      });
      // Redirect after save
      appointment.$save(function(response) {
        $location.path('appointments/' + response._id);
        // Clear form fields
        $scope.name = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find existing Doctor
    $scope.findOne = function() {
      $scope.doctor = Doctors.get({
        doctorId: $stateParams.doctorId
      });
      console.log($scope.doctor);
      $scope.appointments = Appointments.query({user:$stateParams.doctorId});
      $scope.appointments.$promise.then(function (results) {
        console.log(results);
        angular.forEach(results, function (task, index) {
          $scope.newEvents.push(task)
        });
      });
      $scope.eventSources = [$scope.newEvents];
    };

    //calender code
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
      $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
      $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
      $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.goToDate = function(calendar, date) {
      uiCalendarConfig.calendars[calendar].fullCalendar('gotoDate', date );
    };

    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
    /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
      element.attr({'tooltip': event.title,
        'tooltip-append-to-body': true});
      $compile(element)($scope);
    };

    $scope.eventSources = [$scope.newEvents];

    $scope.sendEmail = function (to, appointmentId) {
      if(to) {
        console.log("sending to " + to);
        var data = ({
          to: to,
          subject: 'TechWiss - Video Consulting Initiation Link',
          html: "<b>Hello world</b>" // html body

          //html: "<h1> TechWiss - Video Consulting invite</h1><p>Hello</p><p>Your TechWiss Video Consulting Link is <a href = 'window.location.host+'/appointments/' + appointmentId'> window.location.host+'/appointments/' + appointmentId </p>"
        });

        $http.post('/appointment-email', data).
            then(function (response) {
              // this callback will be called asynchronously
              // when the response is available
              console.log(response);
            }, function (response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
      }
    };

    $scope.uiConfig = {
      calendar:{
        editable: true,
        businessHours:true,
        header:{
          left: 'month,agendaWeek,agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        selectable: true,
        selectHelper: true,
        select: function(start, end) {
          window.meetingtime =start;
          $scope.goToDate('myCalendar1',start)
          $scope.changeView('agendaDay', 'myCalendar1')
          if (this.name == 'agendaDay') {
            var description = prompt('Kindly mention the description or symptoms of your Health Issues:');
            if (description) {
              //$scope.$apply(function(start, end){
              var host = $scope.doctor;
              delete host.user;

              var appointment = new Appointments ({
                title: 'Video-consulting',
                from: $scope.doctor._id,
                description: description,
                start: start,
                end: end
              });

              // Redirect after save
              appointment.$save(function(response) {
                $scope.sendEmail($scope.authentication.user.email,response._id);
                $scope.sendEmail($scope.doctor.email,response._id);
                //$location.path('appointments/' + response._id);
                // Clear form fields
                $scope.title = '';
                $scope.from = '';
                $scope.description = '';
                $scope.start = '';
                $scope.end = '';
                $scope.className = '';
                alert("invitation sent on Email !");
              }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
              });

              //$scope.events.push({
              //  title: title,
              //  start: start,
              //  end: end,
              //  allDay: allDay
              //});
              //});
            }

          }
          // should call 'unselect' method here
        }
      }
    };


    $scope.rate = 3;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
      {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
      {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
      {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
      {stateOn: 'glyphicon-heart'},
      {stateOff: 'glyphicon-off'}
    ];

  }
]);
