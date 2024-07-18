export const useGenCode = () => {
  class GenTokenClass {
    public genTokenMethod(email: string, code: string) {
      // return btoa(`${email}:${code}`);
      return btoa(unescape(encodeURIComponent(`${email}:${code}`)));
    }

    public encryptCode(code: string) {
      let chars: string[] = code.split("");
      const firstChars: string[] = chars.slice(0, 3);
      const endChars: string[] = chars.slice(chars.length - 3, chars.length);
      const rest: string[] = chars.slice(3, chars.length - 3).map((_) => "*");

      return firstChars.concat(rest, endChars).join("");
    }
  }

  return { genTokenObj: new GenTokenClass() };
};
