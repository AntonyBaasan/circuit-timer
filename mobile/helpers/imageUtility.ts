export function getBase64TypePrefix(extension: string | undefined) {
    if (extension) {
      return `data:image/${extension};base64,`;
    }
    return 'data:image/png;base64,';
  }