var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var Project = new keystone.List('Project');

Project.add({
	name: { type: Types.Text, required: true, index: true },
	charity: { type: Types.Relationship, ref: 'Charity' },
	offer: { type: Types.Relationship, ref: 'Offer' },
  shareMessage: { type: Types.Relationship, ref: 'ShareMessage' },
  active: { type: Types.Boolean, 'default': true },
	testing: { type: Types.Boolean, 'default': false },
	//openProject: { type: Types.Boolean, 'default': true },
	//userList: { type: Types.Relationship, ref: 'UserList', dependsOn: { openProject: false } }
});

Project.defaultColumns = 'name, active, openProject';
Project.relationship({ path: 'steps', ref: 'Step', refPath: 'project' });
Project.register();



/*
{
  title: 'Powerbeats',
  offer: {
    link: 'http://www.beatsbydre.com/earphones/powerbeats/beats-powerbeats.html',
    text: 'You’ve also earned<br>this exclusive offer<br>from Powerbeats <span>&gt;</span>',
    image: 'assets/images/powerbeats@2x.png',
    style: 'margin: 70px 0 0 115px; display:block; line-height:1.2; font-size: 16px;'
  },
  charityId: 0,
  charityName: 'SF-MARIN FOOD BANK',
  id: '0',
  image: 'assets/images/logos/sf-martin@2x.png',
  steps: [
    {
      type: 'video',
      copy: 'Powerbeats. Earbuds designed for athletes by LeBron James and Dr. Dre. Learn more below. Press play.',
      id: '7qraNrqA2pw'
    },
    {
      type: 'rating',
      text: '<span>MADE FOR ATHLETES.</span><br>Flexible earclips are designed to<br>secure Powerbeats earphones in<br>your ears no matter how rigorous<br>your workout.',
      options: [ 1, 2, 3, 4]
    },
    {
      type: 'rating',
      text: '<span>CLEARER SOUND. DEEPER BASS.</span><br>Powerbeats earphones are the<br>only Beats by Dr. Dre earbuds<br>that come with two speakers<br>inside each bud. That means you<br>get crystal clear highs and deep,<br>rumbling lows',
      options: [ 1, 2, 3, 4]
    },
    {
      type: 'rating',
      text: '<span>SAFETY FIRST.</span><br>Powerbeats earphones are<br>specially designed to pump<br>clear bass at any volume while<br>letting in ambient noise – making<br>sure athletes stay safe while<br>running on the road.',
      options: [ 1, 2, 3, 4]
    },
    {
      type: 'rating',
      text: '<span>REMOTE CONTROL CORD.</span><br>You can adjust your music to<br>find your power song right from<br>the cord. No need to fumble<br>with your MP3 player during<br>your workout.',
      options: [ 1, 2, 3, 4]
    }
  ]
}
*/
