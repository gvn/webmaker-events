angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'ngSanitize',
  'ui.bootstrap',
  'localization',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.when('/add', {
      templateUrl: 'views/add-update.html',
      controller: 'addUpdateController'
    });

    $routeProvider.when('/events', {
      templateUrl: 'views/list.html',
      controller: 'eventListController'
    });

    $routeProvider.when('/events/:id', {
      templateUrl: 'views/detail.html',
      controller: 'eventDetailController'
    });

    $routeProvider.when('/edit/:id', {
      templateUrl: 'views/add-update.html',
      controller: 'addUpdateController'
    });

    $routeProvider.when('/event-guides', {
      templateUrl: 'views/event-guides.html'
    });

    $routeProvider.when('/user/:id', {
      templateUrl: 'views/user.html',
      controller: 'userController'
    });

    $routeProvider.when('/confirm/:type/:token', {
      templateUrl: 'views/confirm.html',
      controller: 'confirmController'
    });

    $routeProvider.when('/error/:code', {
      templateUrl: 'views/error.html',
      controller: 'errorController'
    });

    $routeProvider.when('/', {
      templateUrl: 'views/home.html',
      controller: 'homeController'
    });

    $routeProvider.otherwise({
      redirectTo: '/error/404'
    });
  }
]).
run(['$http', '$rootScope',
  function ($http, $rootScope) {
    // Jump to top of viewport when new views load
    $rootScope.$on('$locationChangeSuccess', function (event) {
      window.scrollTo(0, 0);
    });

    // Forward old non-hash-bang URLS to hash-bang equivalents
    // eg:
    //  #/events -> #!/events
    //  #events -> #!/events
    if (window.location.hash.match(/^#[\/a-zA-Z]/)) {
      window.location.hash = window.location.hash.replace('#', '#!');
    }
  }
]);
