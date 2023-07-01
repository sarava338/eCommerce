export function getUserWithoutPassword(user) {
  const { password, ...userWithoutPassword } = user._doc;
  return userWithoutPassword;
}

export function getAllUsersWithoutPasswords(users) {
  const usersWithoutPasswords = [];
  users.forEach((user) => {
    usersWithoutPasswords.push(getUserWithoutPassword(user));
  });
  return usersWithoutPasswords;
}

export function getUserDetails(user) {
  const { password, isBlocked, role, ...userDetails } = user._doc;
  return userDetails;
}

export function getUserId(user) {
  const { id, ...userDetailsWithoutId } = user._doc;
  return id;
}
