const extractUsernameFromEmail = (email: string): string => {
  const regex = /^[^@]+/;
  const match = email.match(regex);
  return match ? match[0] : '';
};

export default extractUsernameFromEmail;
