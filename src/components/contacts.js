// var Owlbot = require('owlbot-js')

// var token = process.env.TOKEN;
// var owl = Owlbot(token)

// owl.define('owl').then(function(result) {
//     console.log(result);
// });

// export function defineWord(word) {
//     return owl.define(word).then
// }

// src/components/contacts.js

import React from 'react'

const Contacts = ({ contacts }) => {
    return (
    <div>
        <center><h1>Contact List</h1></center>
        {contacts.map((contact) => (
        <div class="card">
            <div class="card-body">
            <h5 class="card-title">{contact.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{contact.email}</h6>
            <p class="card-text">{contact.company.catchPhrase}</p>
            </div>
        </div>
        ))}
    </div>
    )
};

export default Contacts