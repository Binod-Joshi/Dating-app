// const User = require('./models/User');
// const Interaction = require('./models/Interaction');
// const Match = require('./models/Match');

// async function swipe(userId, targetUserId, type) {
//   if (!['like', 'dislike'].includes(type)) {
//     throw new Error('Invalid swipe type');
//   }

//   // Find or create the interaction document for the user
//   let interaction = await Interaction.findOne({ user: userId });
//   if (!interaction) {
//     interaction = new Interaction({ user: userId });
//   }

//   // Add the target user to the appropriate array
//   if (type === 'like') {
//     if (!interaction.likedUsers.includes(targetUserId)) {
//       interaction.likedUsers.push(targetUserId);
//     }
//   } else if (type === 'dislike') {
//     if (!interaction.dislikedUsers.includes(targetUserId)) {
//       interaction.dislikedUsers.push(targetUserId);
//     }
//   }

//   // Save the interaction document
//   await interaction.save();

//   // Check for a reciprocal like
//   if (type === 'like') {
//     const reciprocalInteraction = await Interaction.findOne({ 
//       user: targetUserId, 
//       likedUsers: { $elemMatch: { $eq: userId } }
//     });

//     if (reciprocalInteraction) {
//       console.log(`Match found between user ${userId} and user ${targetUserId}`);

//       // Create a match document
//       const match = new Match({
//         users: [userId, targetUserId]
//       });

//       await match.save();
//     }
//   }
// }

// module.exports = swipe;
