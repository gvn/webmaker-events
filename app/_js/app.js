angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'ngSanitize',
  'ui.bootstrap',
  'wmMakeApiAngular',
  'localization',
  'begriffs.paginate-anything',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    // Prevent Angular from losing its mind
    if (window.location.href !== decodeURI(window.location.href)) {
      window.location.href = decodeURI(window.location.href);
    }

    $locationProvider.html5Mode(true);

    $routeProvider.when('/add', {
      templateUrl: '_views/add-update.html',
      controller: 'addUpdateController'
    });

    $routeProvider.when('/events', {
      templateUrl: '_views/list.html',
      controller: 'eventListController'
    });

    $routeProvider.when('/events/tag/:id', {
      templateUrl: '_views/tag-list.html',
      controller: 'tagListController'
    });

    $routeProvider.when('/events/:id', {
      templateUrl: '_views/detail.html',
      controller: 'eventDetailController'
    });

    $routeProvider.when('/edit/:id', {
      templateUrl: '_views/add-update.html',
      controller: 'addUpdateController'
    });

    $routeProvider.when('/event-guides', {
      templateUrl: '_views/event-guides.html'
    });

    $routeProvider.when('/user/:id', {
      templateUrl: '_views/user.html',
      controller: 'userController'
    });

    $routeProvider.when('/confirm/:type/:token', {
      templateUrl: '_views/confirm.html',
      controller: 'confirmController'
    });

    $routeProvider.when('/error/:code', {
      templateUrl: '_views/error.html',
      controller: 'errorController'
    });

    $routeProvider.when('/check-in/:id', {
      templateUrl: '_views/check-in.html',
      controller: 'checkInController'
    });

    $routeProvider.when('/', {
      templateUrl: '_views/home.html',
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
