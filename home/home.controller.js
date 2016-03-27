(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', '$http'];
    function HomeController(UserService, $rootScope, $http) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
		vm.msg = null;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
			loadProduct('http://120.25.216.99:8080/CubicCapital/finaProduct/list/1/1');
			
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
		
		
		// for cubic capital

		
		
		
		function loadProduct(url){
			return $http.get(url).then(handleSuccess, handleError('Error getting product'));
		}
		
		function handleSuccess(res) {
			console.log(res);
			console.log(JSON.parse(res.data));
            vm.msg = JSON.parse(res.data);
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();