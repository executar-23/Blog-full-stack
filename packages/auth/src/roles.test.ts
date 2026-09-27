import { hasEditorialRole, isEditorialRole } from './roles';

describe('editorial roles', () => {
  it('recognises only admin, editor and author', () => {
    expect(isEditorialRole('editor')).toBe(true);
    expect(isEditorialRole('reader')).toBe(false);
    expect(isEditorialRole(null)).toBe(false);
  });

  it('applies the admin > editor > author hierarchy', () => {
    expect(hasEditorialRole('admin', 'editor')).toBe(true);
    expect(hasEditorialRole('editor', 'editor')).toBe(true);
    expect(hasEditorialRole('author', 'editor')).toBe(false);
    expect(hasEditorialRole(undefined, 'author')).toBe(false);
  });
});
