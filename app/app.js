var app = angular.module("healthtracker", []);
var config = {
  apiKey: "AIzaSyD_TH1WmJYs3aJ1uI98RVqb68sJlT6hZhM",
  authDomain: "healthtracker-53809.firebaseapp.com",
  databaseURL: "https://healthtracker-53809.firebaseio.com",
  projectId: "healthtracker-53809",
  storageBucket: "healthtracker-53809.appspot.com",
  messagingSenderId: "511733594200"
};
firebase.initializeApp(config);
app.controller("mainController", function($scope) {
  firebase.database().ref('Patients').once('value').then(function(snapshot) {
    console.log("got data");
    var result = snapshot.val();
    $scope.patients =  Object.keys(result).map(e=>result[e]);
    //$scope.patients = [1,2,3,4,5];
    console.log($scope.patients);
    $scope.$apply();
  });

  $scope.addPatient =  function()  {
    console.log("add patient");
    window.location.href = 'newpatient.html';
  }
});
app.controller("newpatientController", function($scope) {


  $scope.addPatientToDb =  function()  {
    console.log("add patient");
    firebase.database().ref('Patients/' + $scope.patient.iin).set({
      fName: $scope.patient.fName,
      lName: $scope.patient.lName,
      patronymic: $scope.patient.patronymic,
      iin : $scope.patient.iin,
      phone: $scope.patient.phone,
      birth: '11.10.1987'
    }).then(function(){
      console.log("finished");
      window.location.href = 'index.html';
    });
  }
});
