"use strict";

/**
 * Configuration file where you can store additionals codes for responses
 *
 * It's just a storage where you can define your custom API responses and their description.
 * You can call then in your action res.ok(data, sails.config.additionals.LINKED_ACCOUNT);
 */

module.exports = {
    additionals: {
        MISSING_DEPARTMENT: {
            code: 'E_MISSING_DEPARTMENT',
            message: 'Please provide a department',
            status: 500
        },
        DEPARTMENT_NOT_FOUND: {
            code: 'E_DEPARTMENT_NOT_FOUND',
            message: 'Department could not be found',
            status: 404
        },
        MISSING_BUILDING: {
            code: 'E_MISSING_BUILDING',
            message: 'Please provide a building',
            status: 500
        },
        BUILDING_NOT_FOUND: {
            code: 'E_BUILDING_NOT_FOUND',
            message: 'Building could not be found',
            status: 404
        },
        MISSING_ROOM: {
            code: 'E_MISSING_ROOM',
            message: 'Please provide a room',
            status: 500
        },
        ROOM_NOT_FOUND: {
            code: 'E_ROOM_NOT_FOUND',
            message: 'Room could not be found',
            status: 404
        },
        MISSING_ITEMTYPE: {
            code: 'E_MISSING_ITEMTYPE',
            message: 'Please provide an item type.',
            status: 500
        },
        ITEMTYPE_NOT_FOUND: {
            code: 'E_ITEMTYPE_NOT_FOUND',
            message: 'Item type could not be found.',
            status: 404
        },


        BAD_CREDENTIALS: {
            code: 'E_BAD_CREDENTIALS',
            message: 'Wrong login credentials',
            status: 401
        },
        USER_NOT_FOUND: {
            code: 'E_USER_NOT_FOUND',
            message: 'User with specified id is not found',
            status: 404
        },
        ITEMS_NOT_FOUND: {
            code: 'E_ITEMS_NOT_FOUND',
            message: 'Items not found for event and category',
            status: 404
        },
        ITEM_NOT_FOUND: {
            code: 'E_ITEM_NOT_FOUND',
            message: 'Item not found',
            status: 404
        },
        BID_NOT_FOUND: {
            code: 'E_BID_NOT_FOUND',
            message: 'Bids not found for item',
            status: 404
        },
        MISSING_AMOUNT: {
            code: 'E_MISSING_AMOUNT',
            message: 'Please provide an amount',
            status: 500
        },
        ITEM_NOT_CREATED: {
            code: 'E_ITEM_NOT_CREATED',
            message: 'Can\'t update current bid for item',
            status: 500
        },
        ROOM_NOT_FOUND: {
            code: 'E_ROOM_NOT_FOUND',
            message: 'Please supply a room name',
            status: 400
        },
        CANT_ADD_ROOM: {
            code: 'E_CANT_ADD_ROOM',
            message: "Can't add room to user",
            status: 500
        },
        CANT_REMOVE_ROOM: {
            code: 'E_CANT_REMOVE_ROOM',
            message: "Can't remove room from user",
            status: 500
        },
    }
};
