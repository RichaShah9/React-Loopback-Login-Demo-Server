'use strict';
let path = require('path');
let senderAddress = "noreply@loopback.com";
let config = require('../../server/config.json');

module.exports = function(Member) {
  Member.afterRemote('create', function(context, member, next) {
    let options = {
      type: 'email',
      to: member.email,
      from: senderAddress,
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/verified',
      member: member,
    };
    member.verify(options);
  });

  Member.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">here</a> to reset your password';

    Member.app.models.Email.send({
      to: info.email,
      from: senderAddress,
      subject: 'Password reset',
      html: html,
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });
};
