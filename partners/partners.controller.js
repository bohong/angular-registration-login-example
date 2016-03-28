(function () {
    'use strict';

    angular
        .module('app')
        .controller('PartnersController', PartnersController);

    PartnersController.$inject = ['UserService', '$rootScope', '$http'];
    function PartnersController(UserService, $rootScope, $http) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
		vm.finan = null;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
			loadFinan('http://120.25.216.99:8080/CubicCapital/finaProduct/list/1/3');
			
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

				
		function loadFinan(url){
			return $http.get(url).then(
			function handleSuccess(res){
				vm.finan = JSON.parse(res.data);
			}, handleError('Error getting product'));
		}
		
		//function handleSuccess(res) {
		//	console.log(res);
		//	console.log(JSON.parse(res.data));
        //    vm.msg = JSON.parse(res.data);
        //}

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();