export default function checkVisibility(authState, rule) {
   
    const isLoggedIn = authState.user === null ? false : authState.isLoggedIn

    if (rule === 'Always') return true;

    if (rule === 'Not logged in') return !isLoggedIn;

    if (rule === 'Users level') return isLoggedIn;
   
    return false;
  }