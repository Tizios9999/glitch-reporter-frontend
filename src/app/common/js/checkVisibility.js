/**

Function that returns a boolean that indicates if a menu item should be visible
or not, based on specific rules for each menu item.

Rules:
- Always: shown regardless of user.
- Not logged in: shown only to not logged in users
- Users level: shown only to logged users
- Admin only: shown only if the user is an Admin.

*/

export default function checkVisibility(authState, rule) {
  const isLoggedIn = authState.user === null ? false : authState.isLoggedIn;

  if (rule === "Always") return true;

  if (rule === "Not logged in") return !isLoggedIn;

  if (rule === "Users level") return isLoggedIn;

  if (rule === "Admin only") {
    const userIsAdmin =
      isLoggedIn && authState.user.roles.includes("ROLE_ADMIN") ? true : false;

    return userIsAdmin;
  }

  return false;
}
