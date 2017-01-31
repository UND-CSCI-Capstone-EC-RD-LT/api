"use strict";

/**
 * Policy Mappings
 *
 * Policies are simple functions which run before your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 */

module.exports = {
  policies: {
    '*': ['isAuthenticated', 'checkDepartmentPermission', 'checkBuildingPermission'],

    AuthController: {
      '*': true
    },

    /*
    DepartmentController: {
    	'building' : ['isAuthenticated', 'checkDepartmentPermission'],
    	'buildings' : ['isAuthenticated', 'checkDepartmentPermission']
    },
    */

    ItemController: {
    	'search': ['isAuthenticated', 'checkDepartmentPermission', 'checkBuildingPermission', 'getDepartmentsAndBuildings']
    }
  }
};
