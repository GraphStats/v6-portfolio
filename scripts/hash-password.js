const bcrypt = require("bcryptjs");

const password = process.argv[2];
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function (err, hash) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("\n--- NEW ADMIN ACCOUNT DETAILS ---\n");
  console.log("Bcypt Hash (for DB):", hash);
  console.log("\n--- SQL COMMAND ---\n");
  console.log(
    `UPDATE admins SET password = '${hash}' WHERE email = 'your-email@example.com';`,
  );
  console.log("\n----------------------------------\n");
});
