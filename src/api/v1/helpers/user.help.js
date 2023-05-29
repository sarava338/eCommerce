export function getUserWithoutPassword(user) {
  const { password, ...userWithoutPassword } = user._doc;
  return userWithoutPassword;
}
