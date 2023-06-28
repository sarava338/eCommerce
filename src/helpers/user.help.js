export function getUserWithoutPassword(user) {
  const { password, ...userWithoutPassword } = user._doc;
  return userWithoutPassword;
}

export function getUserId(user) {
  const { id, ...userDetailsWithoutId } = user._doc;
  return id;
}
