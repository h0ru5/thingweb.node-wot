/********************************************************************************
 * Copyright (c) 2018 Contributors to the Eclipse Foundation
 * 
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 * 
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the W3C Software Notice and
 * Document License (2015-05-13) which is available at
 * https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document.
 * 
 * SPDX-License-Identifier: EPL-2.0 OR W3C-20150513
 ********************************************************************************/

const NAME_PROPERTY_COUNT = "count";
const NAME_ACTION_INCREMENT = "increment";
const NAME_ACTION_DECREMENT = "decrement";
const NAME_ACTION_RESET = "reset";

let thing = WoT.produce({
    name: "counter"
});

console.log("Created thing " + thing.name);

thing.addProperty({
	name : NAME_PROPERTY_COUNT,
	schema : '{ "type": "number"}',
	value : 0,
	observable : true,
	writeable : true
})

thing.addAction({
    name : NAME_ACTION_INCREMENT
})

thing.addAction({
    name : NAME_ACTION_DECREMENT
})

thing.addAction({
    name : NAME_ACTION_RESET
})

thing.setActionHandler( 
	NAME_ACTION_RESET,
	(parameters) => {
		console.log("Resetting");
		thing.writeProperty(NAME_PROPERTY_COUNT, 0);
	}
);

thing.setActionHandler(
	NAME_ACTION_INCREMENT,
	(parameters) => {
		console.log("Incrementing");
		return thing.readProperty(NAME_PROPERTY_COUNT).then(function(count){
			let value = count + 1;
			thing.writeProperty(NAME_PROPERTY_COUNT, value);
		});
	}
);

thing.setActionHandler(
	NAME_ACTION_DECREMENT,
	(parameters) => {
		console.log("Decrementing");
		return thing.readProperty(NAME_PROPERTY_COUNT).then(function(count){
			let value = count - 1;
			thing.writeProperty(NAME_PROPERTY_COUNT, value);
		});
	}
);

thing.start();